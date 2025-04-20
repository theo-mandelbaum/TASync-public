var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable valid-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-param */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-returns */
import { Component, Property, Complex, Collection, EventHandler, L10n, Droppable, remove, isBlazor, Fetch } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Browser, Event } from '@syncfusion/ej2-base';
import { CanvasRenderer } from './rendering/canvas-renderer';
import { SvgRenderer } from './rendering/svg-renderer';
import { DiagramRenderer } from './rendering/renderer';
import { PageSettings, ScrollSettings } from './diagram/page-settings';
import { ServiceLocator } from './objects/service';
import { Container } from './core/containers/container';
import { Node, BpmnShape, SwimLane, UmlClassMethod, UmlEnumerationMember, UmlClassAttribute, Lane } from './objects/node';
import { cloneBlazorObject, cloneSelectedObjects, findObjectIndex, getConnectorArrowType, selectionHasConnector } from './utility/diagram-util';
import { checkBrowserInfo } from './utility/diagram-util';
import { updateDefaultValues } from './utility/diagram-util';
import { flipConnector, updatePortEdges, alignElement, setConnectorDefaults, getPreviewSize } from './utility/diagram-util';
import { Connector } from './objects/connector';
import { SnapSettings } from './diagram/grid-lines';
import { RulerSettings } from './diagram/ruler-settings';
import { removeRulerElements, updateRuler, getRulerSize } from './ruler/ruler';
import { renderRuler, renderOverlapElement } from './ruler/ruler';
import { Size } from './primitives/size';
import { Keys, KeyModifiers, DiagramTools, AnnotationConstraints, NodeConstraints, ScrollActions, ConnectorConstraints } from './enum/enum';
import { RendererAction } from './enum/enum';
import { BlazorAction } from './enum/enum';
import { DiagramConstraints, SelectorConstraints, PortVisibility, DiagramEvent } from './enum/enum';
import { DiagramAction, ThumbsConstraints } from './enum/enum';
import { RealAction, ElementAction, FlipDirection, PortConstraints } from './enum/enum';
import { PathElement } from './core/elements/path-element';
import { TextElement } from './core/elements/text-element';
import { updateStyle, removeItem, updateConnector, updateShape, setUMLActivityDefaults, findNodeByName } from './utility/diagram-util';
import { setSwimLaneDefaults } from './utility/diagram-util';
import { checkPortRestriction, serialize, deserialize, updateHyperlink, getObjectType, removeGradient, getChild } from './utility/diagram-util';
import { Rect } from './primitives/rect';
import { getPortShape } from './objects/dictionary/common';
import { ShapeAnnotation, PathAnnotation } from './objects/annotation';
import { Canvas } from './core/containers/canvas';
import { GridPanel, ColumnDefinition } from './core/containers/grid';
import { DataSource } from './diagram/data-source';
import { Layout } from './layout/layout-base';
import { Selector, Text } from './objects/node';
import { DiagramEventHandler } from './interaction/event-handlers';
import { CommandHandler } from './interaction/command-manager';
import { DiagramScroller } from './interaction/scroller';
import { contains, isSelected } from './interaction/actions';
import { SpatialSearch } from './interaction/spatial-search/spatial-search';
import { setAttributeSvg, setAttributeHtml, measureHtmlText, removeElement, createMeasureElements, getDomIndex } from './utility/dom-util';
import { getDiagramElement, getScrollerWidth, getHTMLLayer, createUserHandleTemplates } from './utility/dom-util';
import { getBackgroundLayer, createHtmlElement, createSvgElement, getNativeLayerSvg, getUserHandleLayer } from './utility/dom-util';
import { getPortLayerSvg, getDiagramLayerSvg, applyStyleAgainstCsp } from './utility/dom-util';
import { getAdornerLayerSvg, getSelectorElement, getGridLayerSvg, getBackgroundLayerSvg } from './utility/dom-util';
import { CommandManager, ContextMenuSettings } from './diagram/keyboard-commands';
import { canDelete, canInConnect, canOutConnect, canRotate, canVitualize, canDrawThumbs } from './utility/constraints-util';
import { canPortInConnect, canPortOutConnect } from './utility/constraints-util';
import { canResize, canSingleSelect, canZoomPan, canZoomTextEdit, canMultiSelect } from './utility/constraints-util';
import { canDragSourceEnd, canDragTargetEnd, canDragSegmentThumb, enableReadOnly, canMove } from './utility/constraints-util';
import { findAnnotation, arrangeChild, getInOutConnectPorts, removeChildNodes, canMeasureDecoratorPath } from './utility/diagram-util';
import { randomId, cloneObject, extendObject, getFunction, getBounds } from './utility/base-util';
import { DiagramTooltip, initTooltip } from './objects/tooltip';
import { PointPort, PathPort } from './objects/port';
import { canShadow } from './utility/constraints-util';
import { Layer } from './diagram/layer';
import { DiagramNativeElement } from './core/elements/native-element';
import { DiagramHtmlElement } from './core/elements/html-element';
import { canAllowDrop } from './utility/constraints-util';
import { checkParentAsContainer, addChildToContainer, updateLaneBoundsAfterAddChild } from './interaction/container-interaction';
import { getConnectors, updateConnectorsProperties, phaseDefine, findLane } from './utility/swim-lane-util';
import { swimLaneMeasureAndArrange } from './utility/swim-lane-util';
import { arrangeChildNodesInSwimLane, updateHeaderMaxWidth, updatePhaseMaxWidth } from './utility/swim-lane-util';
import { addLane, addPhase } from './utility/swim-lane-util';
import { SerializationSettings } from './diagram/serialization-settings';
import { removeSwimLane, removeLane, removePhase, removeLaneChildNode } from './utility/swim-lane-util';
import { RowDefinition } from './core/containers/grid';
import { CustomCursorAction } from './diagram/custom-cursor';
import { LineRouting } from './interaction/line-routing';
import { DiagramSettings } from '../diagram/diagram-settings';
import { StackPanel } from './core/containers/stack-panel';
import { ConnectorFixedUserHandle, NodeFixedUserHandle } from './objects/fixed-user-handle';
import { Point } from './primitives/point';
import { getClassAttributesChild, getClassMembersChild, getClassNodesChild } from './utility/uml-util';
import { getIntersectionPoints, getPortDirection } from './utility/connector';
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
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    /**
     * Constructor for creating the widget
     */
    function Diagram(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.version = 17.1;
        /** @private */
        _this.checkMenu = false;
        /** @private */
        _this.isServerUpdate = false;
        /** @private */
        _this.oldNodeObjects = [];
        /** @private */
        _this.oldDiagramObject = {};
        /** @private */
        _this.oldConnectorObjects = [];
        /** @private */
        _this.canEnableBlazorObject = false;
        /** @private */
        _this.connectorTable = {};
        /** @private */
        _this.groupTable = {};
        /** @private */
        _this.scrollActions = ScrollActions.None;
        /** @private */
        _this.blazorActions = BlazorAction.Default;
        /** @private */
        _this.activeLabel = { id: '', parentId: '', isGroup: false, text: undefined };
        /** @private */
        _this.textEditing = false;
        /** @private */
        _this.isTriggerEvent = false;
        /** @private */
        _this.preventNodesUpdate = false;
        /** @private */
        _this.preventConnectorsUpdate = false;
        /** @private */
        _this.callBlazorModel = true;
        /** @private */
        _this.selectionConnectorsList = [];
        /** @private */
        _this.deleteVirtualObject = false;
        _this.canLayout = true;
        _this.cancelPositionChange = false;
        _this.isRefreshed = false;
        /** @private */
        _this.swimlaneChildTable = {};
        /** @private */
        _this.swimlaneZIndexTable = {};
        /** @private */
        _this.canExpand = false;
        _this.changedConnectorCollection = [];
        _this.changedNodesCollection = [];
        _this.previousNodeCollection = [];
        _this.previousConnectorCollection = [];
        _this.crudDeleteNodes = [];
        _this.previousSelectedObjects = [];
        // Group update to server when BlazorAction is isGroupAction;
        _this.blazorAddorRemoveCollection = [];
        _this.blazorRemoveIndexCollection = [];
        _this.diagramid = 88123;
        _this.portCenterPoint = [];
        /** @private */
        _this.selectedObject = { helperObject: undefined, actualObject: undefined };
        /** @private */
        _this.deleteDependentConnector = true;
        /** @private */
        _this.scaleValue = 1;
        _this.routedConnectors = [];
        /** @private */
        _this.pathDataStorage = new Map();
        // To check current action is undo or redo
        _this.isUndo = false;
        _this.mermaidNodeBaseCollection = [];
        _this.bangShape = 'M0 0 a15.470625686645507,15.470625686645507 1 0,0 25.78437614440918,-3.7200001525878905 a15.470625686645507,15.470625686645507 1 0,0 25.78437614440918,0 a15.470625686645507,15.470625686645507 1 0,0 25.78437614440918,0 a15.470625686645507,15.470625686645507 1 0,0 25.78437614440918,3.7200001525878905 a15.470625686645507,15.470625686645507 1 0,0 15.470625686645507,12.276000503540038 a12.376500549316406,12.376500549316406 1 0,0 0,12.648000518798828 a15.470625686645507,15.470625686645507 1 0,0 -15.470625686645507,12.276000503540038 a15.470625686645507,15.470625686645507 1 0,0 -25.78437614440918,5.580000228881835 a15.470625686645507,15.470625686645507 1 0,0 -25.78437614440918,0 a15.470625686645507,15.470625686645507 1 0,0 -25.78437614440918,0 a15.470625686645507,15.470625686645507 1 0,0 -25.78437614440918,-5.580000228881835 a15.470625686645507,15.470625686645507 1 0,0 -10.313750457763673,-12.276000503540038 a12.376500549316406,12.376500549316406 1 0,0 0,-12.648000518798828 a15.470625686645507,15.470625686645507 1 0,0 10.313750457763673,-12.276000503540038 H0 V0 Z';
        _this.cloudShape = 'M0 0 a16.18875045776367,16.18875045776367 0 0,1 26.981250762939453,-10.792500305175782 a37.77375106811523,37.77375106811523 1 0,1 43.17000122070313,-10.792500305175782 a26.981250762939453,26.981250762939453 1 0,1 37.77375106811523,21.585000610351564 a16.18875045776367,16.18875045776367 1 0,1 16.18875045776367,13.020000534057615 a21.585000610351564,21.585000610351564 1 0,1 -16.18875045776367,24.180000991821288 a26.981250762939453,16.18875045776367 1 0,1 -26.981250762939453,16.18875045776367 a37.77375106811523,37.77375106811523 1 0,1 -53.962501525878906,0 a16.18875045776367,16.18875045776367 1 0,1 -26.981250762939453,-16.18875045776367 a16.18875045776367,16.18875045776367 1 0,1 -10.792500305175782,-13.020000534057615 a21.585000610351564,21.585000610351564 1 0,1 10.792500305175782,-24.180000991821288 H0 V0 Z';
        _this.renderTimer = null;
        var child;
        var node;
        //Removed isBlazor code
        _this.ignoreCollectionWatch = true;
        for (var i = 0; options && options.nodes && i < options.nodes.length; i++) {
            child = options.nodes[parseInt(i.toString(), 10)];
            node = _this.nodes[parseInt(i.toString(), 10)];
            if (child.children && child.children.length > 0) {
                if (!child.style || !child.style.fill) {
                    node.style.fill = 'transparent';
                }
                if (!child.style || !child.style.strokeColor) {
                    node.style.strokeColor = 'transparent';
                }
            }
            if (child.shape && child.shape.type === 'UmlActivity') {
                setUMLActivityDefaults(child, node);
            }
            if (child.shape && child.shape.type === 'SwimLane') {
                setSwimLaneDefaults(child, node);
            }
            // Removed isBlazor code
            if (_this.nodeDefaults) {
                updateDefaultValues(node, child, _this.nodeDefaults);
            }
            _this.updateAnnotationText(node.annotations);
        }
        if (options && options.connectors) {
            for (var i = 0; options && options.connectors && i < options.connectors.length; i++) {
                child = options.connectors[parseInt(i.toString(), 10)];
                node = _this.connectors[parseInt(i.toString(), 10)];
                //Removed isBlazor code
                if (_this.connectorDefaults) {
                    updateDefaultValues(node, child, _this.connectorDefaults);
                }
                _this.updateAnnotationText(node.annotations);
            }
        }
        for (var i = 0; options && options.connectors && i < options.connectors.length; i++) {
            var defaultConnector = options.connectors[parseInt(i.toString(), 10)];
            var connector = _this.connectors[parseInt(i.toString(), 10)];
            if (defaultConnector.shape && defaultConnector.shape.type !== 'None') {
                setConnectorDefaults(defaultConnector, connector);
            }
            //Removed isBlazor code
        }
        return _this;
    }
    Diagram.prototype.updateAnnotationText = function (annotations) {
        //Removed isBlazor code
    };
    Diagram.prototype.clearCollection = function (isConnector) {
        var collection = [];
        var obj;
        for (var _i = 0, _a = Object.keys(this.nameTable); _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this.nameTable["" + key];
            if (obj && ((isConnector && obj instanceof Connector) || (!isConnector && obj instanceof Node))) {
                collection.push(obj);
            }
        }
        this.clearObjects(collection);
    };
    /**
     * Updates the diagram control when the objects are changed by comparing new and old property values.
     *
     * @param {DiagramModel} newProp - A object that lists the new values of the changed properties.
     * @param {DiagramModel} oldProp - A object that lists the old values of the changed properties.
     */
    /* tslint:disable */
    Diagram.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        // Model Changed
        // Bug 842506: After multiple group node rotations, the undo functionality is not working.
        // Below condition is used to restrict onPropertyChange when we rotate group node using button at runtime.
        if (!this.rotateUsingButton) {
            var newValue = void 0;
            var oldValue = void 0;
            var isPropertyChanged = true;
            var refreshLayout = false;
            var refereshColelction = false;
            var bpmnAnnotationConnector = void 0;
            if (this.diagramActions & DiagramAction.Render) {
                for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    switch (prop) {
                        case 'width':
                        case 'height':
                            this.element.style.width = this.getSizeValue(this.width);
                            this.element.style.height = this.getSizeValue(this.height);
                            this.eventHandler.updateViewPortSize(this.element);
                            for (var _b = 0, _c = this.views; _b < _c.length; _b++) {
                                var view = _c[_b];
                                var temp = this.views["" + view];
                                if (!(temp instanceof Diagram)) {
                                    temp.updateView(temp);
                                }
                            }
                            break;
                        case 'nodes':
                            if (newProp.nodes.length > 0 && oldProp.nodes.length === 0) {
                                this.clearCollection();
                                refereshColelction = true;
                            }
                            else {
                                for (var _d = 0, _e = Object.keys(newProp.nodes); _d < _e.length; _d++) {
                                    var key = _e[_d];
                                    var index = Number(key);
                                    var actualObject = this.nodes[parseInt(index.toString(), 10)];
                                    var changedProp = newProp.nodes[parseInt(index.toString(), 10)];
                                    if (newProp.nodes[parseInt(index.toString(), 10)].style
                                        && newProp.nodes[parseInt(index.toString(), 10)].style.gradient) {
                                        this.updateGradient(newProp.nodes[parseInt(index.toString(), 10)], oldProp.nodes[parseInt(index.toString(), 10)], this.nodes[parseInt(index.toString(), 10)]);
                                        this.nodes[parseInt(index.toString(), 10)].oldGradientValue
                                            = cloneObject(newProp.nodes[parseInt(index.toString(), 10)].style.gradient);
                                    }
                                    refreshLayout = refreshLayout || changedProp.excludeFromLayout !== undefined;
                                    /* eslint-disable */
                                    if (newProp.nodes[index] && newProp.nodes[index].shape
                                        && newProp.nodes[index].shape.textAnnotation
                                        && newProp.nodes[index].shape.textAnnotation.textAnnotationTarget !== '') {
                                        bpmnAnnotationConnector = cloneObject(this.nameTable[actualObject.inEdges[0]]);
                                    }
                                    /* eslint-enable */
                                    this.nodePropertyChange(actualObject, oldProp.nodes[parseInt(index.toString(), 10)], changedProp, undefined, true, true);
                                    var args = {
                                        element: cloneBlazorObject(actualObject), cause: this.diagramActions,
                                        diagramAction: this.getDiagramAction(this.diagramActions),
                                        oldValue: cloneBlazorObject(oldProp.nodes[parseInt(index.toString(), 10)]),
                                        newValue: cloneBlazorObject(newProp.nodes[parseInt(index.toString(), 10)])
                                    };
                                    // Removed isBlazor code
                                    this.triggerEvent(DiagramEvent.propertyChange, args);
                                    if (isPropertyChanged) {
                                        isPropertyChanged = false;
                                    }
                                }
                                if (this.mode === 'Canvas') {
                                    this.refreshDiagramLayer();
                                }
                            }
                            break;
                        case 'connectors':
                            // eslint-disable-next-line no-case-declarations
                            var oldObject = void 0;
                            if (newProp.connectors.length > 0 && oldProp.connectors.length === 0) {
                                this.clearCollection(true);
                                refereshColelction = true;
                            }
                            else {
                                for (var _f = 0, _g = Object.keys(newProp.connectors); _f < _g.length; _f++) {
                                    var key = _g[_f];
                                    var index = Number(key);
                                    var actualObject = this.connectors[parseInt(index.toString(), 10)];
                                    var changedProp = newProp.connectors[parseInt(index.toString(), 10)];
                                    // 927220: Improper Connector State After Undo When Connecting via Button
                                    var changedPoints = {
                                        sourcePoint: { x: actualObject.sourcePoint.x, y: actualObject.sourcePoint.y },
                                        targetPoint: { x: actualObject.targetPoint.x, y: actualObject.targetPoint.y }
                                    };
                                    if (changedProp && (changedProp.sourceDecorator || changedProp.targetDecorator)) {
                                        this.diagramActions |= DiagramAction.DecoratorPropertyChange;
                                    }
                                    this.connectorPropertyChange(actualObject, oldProp.connectors[parseInt(index.toString(), 10)], changedProp, true, true);
                                    // 927220: Improper Connector State After Undo When Connecting via Button
                                    if (newProp.connectors[parseInt(index.toString(), 10)].sourceID &&
                                        !newProp.connectors[parseInt(index.toString(), 10)].sourcePoint) {
                                        oldProp.connectors[parseInt(index.toString(), 10)].sourcePoint = {
                                            x: changedPoints.sourcePoint.x,
                                            y: changedPoints.sourcePoint.y
                                        };
                                        newProp.connectors[parseInt(index.toString(), 10)].sourcePoint = {
                                            x: actualObject.sourcePoint.x,
                                            y: actualObject.sourcePoint.y
                                        };
                                    }
                                    if (newProp.connectors[parseInt(index.toString(), 10)].targetID &&
                                        !newProp.connectors[parseInt(index.toString(), 10)].targetPoint) {
                                        oldProp.connectors[parseInt(index.toString(), 10)].targetPoint = {
                                            x: changedPoints.targetPoint.x,
                                            y: changedPoints.targetPoint.y
                                        };
                                        newProp.connectors[parseInt(index.toString(), 10)].targetPoint = {
                                            x: actualObject.targetPoint.x,
                                            y: actualObject.targetPoint.y
                                        };
                                    }
                                    if (changedProp && (changedProp.sourceDecorator || changedProp.targetDecorator)) {
                                        this.diagramActions = this.diagramActions & ~DiagramAction.DecoratorPropertyChange;
                                    }
                                    var args = {
                                        element: cloneBlazorObject(actualObject), cause: this.diagramActions,
                                        diagramAction: this.getDiagramAction(this.diagramActions),
                                        oldValue: cloneBlazorObject(oldProp.connectors[parseInt(index.toString(), 10)]),
                                        newValue: cloneBlazorObject(newProp.connectors[parseInt(index.toString(), 10)])
                                    };
                                    // Removed isBlazor code
                                    this.triggerEvent(DiagramEvent.propertyChange, args);
                                    if (actualObject && actualObject.parentId && this.nameTable[actualObject.parentId].shape.type === 'UmlClassifier') {
                                        this.updateConnectorEdges(this.nameTable[actualObject.parentId] || actualObject);
                                    }
                                    if (isPropertyChanged) {
                                        isPropertyChanged = false;
                                    }
                                }
                                this.updateBridging();
                                if (this.mode === 'Canvas') {
                                    this.refreshDiagramLayer();
                                }
                            }
                            break;
                        case 'bridgeDirection':
                            this.updateBridging();
                            if (this.mode === 'Canvas') {
                                this.refreshDiagramLayer();
                            }
                            break;
                        case 'backgroundColor':
                            this.intOffPageBackground();
                            break;
                        case 'pageSettings':
                            this.validatePageSize();
                            this.updatePage();
                            break;
                        case 'selectedItems':
                            if (newProp.selectedItems.userHandles && this.selectedItems.wrapper && this.selectedItems.userHandles) {
                                if (this.selectedItems.userHandles.length > 0) {
                                    this.renderSelector(true);
                                    break;
                                }
                            }
                            if (newProp.selectedItems.constraints) {
                                this.renderSelector(true);
                                break;
                            }
                            break;
                        case 'snapSettings':
                            this.updateSnapSettings(newProp);
                            break;
                        case 'commandManager':
                            this.initCommands();
                            break;
                        case 'layout':
                            refreshLayout = true;
                            break;
                        case 'segmentThumbShape':
                            this.updateSelector();
                            break;
                        case 'dataSourceSettings':
                            this.clear();
                            if (this.layout.type === 'None') {
                                refereshColelction = true;
                            }
                            else {
                                //EJ2-837322- Duplicate nodes and connectors are created after reset for layout type 'None'
                                this.initObjects();
                                refreshLayout = true;
                            }
                            break;
                        case 'tooltip':
                            initTooltip(this);
                            break;
                        case 'rulerSettings':
                            this.updateRulerSettings(newProp);
                            break;
                        case 'layers':
                            this.updateLayer(newProp);
                            break;
                        case 'scrollSettings':
                            this.scrollActions |= ScrollActions.PropertyChange;
                            this.updateScrollSettings(newProp);
                            this.scrollActions &= ~ScrollActions.PropertyChange;
                            this.scrollSettings.horizontalOffset = -this.scroller.horizontalOffset || 0;
                            this.scrollSettings.verticalOffset = -this.scroller.verticalOffset || 0;
                            break;
                        case 'locale':
                            if (newProp.locale !== oldProp.locale) {
                                // 927339: Diagram Layout Rendering correctly When Locale is Set by removing the line
                                _super.prototype.refresh.call(this);
                            }
                            break;
                        case 'contextMenuSettings':
                            if (newProp.contextMenuSettings.showCustomMenuOnly !== undefined) {
                                this.contextMenuSettings.showCustomMenuOnly = newProp.contextMenuSettings.showCustomMenuOnly;
                            }
                            if (newProp.contextMenuSettings.show !== undefined) {
                                this.contextMenuSettings.show = newProp.contextMenuSettings.show;
                            }
                            if (newProp.contextMenuSettings.items) {
                                var items = newProp.contextMenuSettings.items;
                                for (var _h = 0, _j = Object.keys(items); _h < _j.length; _h++) {
                                    var key = _j[_h];
                                    var index = Number(key);
                                    this.contextMenuSettings.items[parseInt(index.toString(), 10)] = items[parseInt(index.toString(), 10)];
                                }
                                if (this.contextMenuModule) {
                                    this.contextMenuModule.refreshItems();
                                }
                                else {
                                    console.warn('[WARNING] :: Module "DiagramContextMenu" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
                                }
                            }
                            break;
                        case 'serializationSettings':
                            if (newProp.serializationSettings.preventDefaults !== undefined) {
                                this.serializationSettings.preventDefaults = newProp.serializationSettings.preventDefaults;
                            }
                            break;
                        case 'tool':
                            // 912436: Mouse cursor flickers when entering the diagram canvas after the tool is changed at runtime
                            this.eventHandler.updateTool();
                            break;
                    }
                }
                if (refreshLayout && !refereshColelction) {
                    if (oldProp.layout && oldProp.layout.connectionPointOrigin === 'DifferentPoint' && newProp.layout.connectionPointOrigin === 'SamePoint'
                        || (oldProp.layout && newProp.layout && !newProp.layout.enableRouting && oldProp.layout.enableRouting)) {
                        for (var i = 0; i < this.nodes.length; i++) {
                            var node = this.nodes[parseInt(i.toString(), 10)];
                            if ((node.ports && node.ports.length > 0)) {
                                var ports = [];
                                for (var j = node.ports.length - 1; j >= 0; j--) {
                                    if (node.ports[parseInt(j.toString(), 10)].id.split('_')[1] === 'LineDistribution') {
                                        ports.push(node.ports[parseInt(j.toString(), 10)]);
                                    }
                                }
                                this.removePorts(node, ports);
                            }
                        }
                        for (var j = 0; j < this.connectors.length; j++) {
                            var connector = this.connectors[parseInt(j.toString(), 10)];
                            var sourcePortid = connector.sourcePortID;
                            var targetPortId = connector.targetPortID;
                            //const oldSegment: OrthogonalSegmentModel = (connector.segments as OrthogonalSegmentModel);
                            connector.sourcePortID = '';
                            connector.targetPortID = '';
                            connector.sourcePortWrapper = undefined;
                            connector.targetPortWrapper = undefined;
                            connector.segments = [];
                            this.connectorPropertyChange(connector, {
                                sourcePortID: sourcePortid, targetPortID: targetPortId
                            }, { sourcePortID: '', targetPortID: '' });
                        }
                    }
                    this.doLayout();
                    this.renderReactTemplates();
                }
                if (isPropertyChanged && this.propertyChange) {
                    var args = {
                        element: cloneBlazorObject(this), cause: this.diagramActions,
                        diagramAction: this.getDiagramAction(this.diagramActions),
                        oldValue: cloneBlazorObject(oldProp), newValue: cloneBlazorObject(newProp)
                    };
                    // Removed isBlazor code
                    this.triggerEvent(DiagramEvent.propertyChange, args);
                }
                /**Feature(EJ2-60228): Need to add Object ID in the history change event argument*/
                if (!refereshColelction && (this.canLogChange()) && (this.modelChanged(newProp, oldProp))) {
                    var propertyObjects = [];
                    var nodeObjects = [];
                    var connObjects = [];
                    var nodeIndex = void 0;
                    if (newProp.nodes && Object.keys(newProp.nodes).length > 0) {
                        for (var _k = 0, _l = Object.keys(newProp.nodes); _k < _l.length; _k++) {
                            var key = _l[_k];
                            nodeIndex = parseInt(key, 10);
                            nodeObjects.push(this.nodes[parseInt(nodeIndex.toString(), 10)].id);
                        }
                    }
                    if (newProp.connectors && Object.keys(newProp.connectors).length > 0) {
                        for (var _m = 0, _o = Object.keys(newProp.connectors); _m < _o.length; _m++) {
                            var key = _o[_m];
                            var connIndex = parseInt(key, 10);
                            connObjects.push(this.connectors[parseInt(connIndex.toString(), 10)].id);
                        }
                    }
                    propertyObjects = nodeObjects.concat(connObjects);
                    //To prevent history entry for text annotation connector while dragging node.
                    var textCon = connObjects.filter(function (id) { return _this.nameTable["" + id].isBpmnAnnotationConnector; });
                    /* eslint-disable */
                    if (textCon.length === 0) {
                        //historyEntry to store BPMNtextAnnotation connector positionchange.
                        if (newProp.nodes && newProp.nodes[nodeIndex] && newProp.nodes[nodeIndex].shape
                            && newProp.nodes[nodeIndex].shape.textAnnotation
                            && newProp.nodes[nodeIndex].shape.textAnnotation.textAnnotationTarget !== '') {
                            var obj = this.nameTable[this.nodes[parseInt(nodeIndex.toString(), 10)].inEdges[0]];
                            this.startGroupAction();
                            var connectorEntry = { type: 'ConnectionChanged', undoObject: bpmnAnnotationConnector, redoObject: cloneObject(obj), category: 'Internal' };
                            var entry = { type: 'PropertyChanged', undoObject: oldProp, redoObject: newProp, category: 'Internal' };
                            if (this.historyManager) {
                                this.addHistoryEntry(connectorEntry);
                                this.addHistoryEntry(entry, propertyObjects);
                            }
                            this.endGroupAction();
                        }
                        else {
                            var entry = { type: 'PropertyChanged', undoObject: oldProp, redoObject: newProp, category: 'Internal' };
                            if (this.historyManager) {
                                this.addHistoryEntry(entry, propertyObjects);
                            }
                        }
                    }
                }
                this.resetDiagramActions();
                if (refereshColelction) {
                    this.initObjects(true);
                    this.refreshDiagramLayer();
                    if (refreshLayout) {
                        this.doLayout();
                    }
                }
                var scrollAlone = ((Object.keys(newProp).length === 1) && newProp.scrollSettings !== undefined);
                if (!refereshColelction) {
                    for (var _p = 0, _q = this.views; _p < _q.length; _p++) {
                        var temp = _q[_p];
                        var view = this.views["" + temp];
                        if (!(view instanceof Diagram)) {
                            if (newProp.scrollSettings && newProp.scrollSettings.currentZoom !== oldProp.scrollSettings.currentZoom) {
                                //view.updateHtmlLayer(view);
                            }
                            if (!scrollAlone) {
                                this.refreshCanvasDiagramLayer(view);
                            }
                        }
                    }
                }
            }
        }
        else {
            this.rotateUsingButton = false;
        }
    };
    /* tslint:enable */
    Diagram.prototype.updateSnapSettings = function (newProp) {
        if (newProp.snapSettings.constraints !== undefined || newProp.snapSettings.horizontalGridlines ||
            newProp.snapSettings.verticalGridlines || newProp.snapSettings.gridType) {
            this.diagramRenderer.updateGrid(this.snapSettings, getGridLayerSvg(this.element.id), this.scroller.transform, this.rulerSettings, this.hRuler, this.vRuler);
        }
    };
    // This private method has been specially provided to update only the node old gradient value in oldProperty.
    // This issue belong to core team but we fixed in our end.
    // https://syncfusion.atlassian.net/browse/EJ2-49232
    Diagram.prototype.updateGradient = function (newProp, oldProp, nodeObj) {
        if (nodeObj.oldGradientValue) {
            var linearNode = nodeObj;
            var radialNode = nodeObj;
            var linearProp = oldProp.style.gradient;
            var radialProp = oldProp.style.gradient;
            for (var _i = 0, _a = Object.keys(newProp.style.gradient); _i < _a.length; _i++) {
                var key = _a[_i];
                switch (key) {
                    case 'type':
                        if (linearNode.type) {
                            linearProp.type = linearNode.type;
                        }
                        break;
                    case 'x1':
                        if (linearNode.x1) {
                            linearProp.x1 = linearNode.x1;
                        }
                        break;
                    case 'x2':
                        if (linearNode.x2) {
                            linearProp.x2 = linearNode.x2;
                        }
                        break;
                    case 'y1':
                        if (linearNode.y1) {
                            linearProp.y1 = linearNode.y1;
                        }
                        break;
                    case 'y2':
                        if (linearNode.y2) {
                            linearProp.y2 = linearNode.y2;
                        }
                        break;
                    case 'cx':
                        if (radialNode.cx) {
                            radialProp.cx = radialNode.cx;
                        }
                        break;
                    case 'cy':
                        if (radialNode.cy) {
                            radialProp.cy = radialNode.cy;
                        }
                        break;
                    case 'fx':
                        if (radialNode.fx) {
                            radialProp.fx = radialNode.fx;
                        }
                        break;
                    case 'fy':
                        if (radialNode.fy) {
                            radialProp.fy = radialNode.fy;
                        }
                        break;
                    case 'r':
                        if (radialNode.r) {
                            radialProp.r = radialNode.r;
                        }
                        break;
                    case 'stops':
                        if (nodeObj.oldGradientValue.stops) {
                            var stops = (Object.values(cloneObject(nodeObj.oldGradientValue.stops)));
                            stops.pop();
                            oldProp.style.gradient.stops = stops;
                        }
                        break;
                }
            }
        }
    };
    Diagram.prototype.updateRulerSettings = function (newProp) {
        if (newProp.rulerSettings.dynamicGrid !== undefined) {
            this.diagramRenderer.updateGrid(this.snapSettings, getGridLayerSvg(this.element.id), this.scroller.transform, this.rulerSettings, this.hRuler, this.vRuler);
        }
        if (newProp.rulerSettings.showRulers !== undefined) {
            this.intOffPageBackground();
            this.scroller.setSize();
            this.renderRulers();
        }
        else if (newProp.rulerSettings.horizontalRuler !== undefined ||
            newProp.rulerSettings.verticalRuler !== undefined) {
            if (newProp.rulerSettings.horizontalRuler.thickness !== undefined ||
                newProp.rulerSettings.verticalRuler.thickness !== undefined) {
                removeRulerElements(this);
                this.intOffPageBackground();
                this.scroller.setSize();
                this.renderRulers();
            }
            else {
                updateRuler(this);
            }
        }
        this.diagramRenderer.updateGrid(this.snapSettings, getGridLayerSvg(this.element.id), this.scroller.transform, this.rulerSettings, this.hRuler, this.vRuler);
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}
     */
    Diagram.prototype.getPersistData = function () {
        var keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Initialize nodes, connectors and renderer
     */
    Diagram.prototype.preRender = function () {
        this.initializePrivateVariables();
        this.isProtectedOnChange = true;
        this.serviceLocator = new ServiceLocator;
        this.initializeServices();
        this.setCulture();
        var measureWindowElement = 'measureElement';
        if (window["" + measureWindowElement]) {
            window["" + measureWindowElement] = null;
        }
        this.initDiagram();
        this.initViews();
        this.unWireEvents();
        this.wireEvents();
        this.element.classList.add('e-diagram');
    };
    Diagram.prototype.initializePrivateVariables = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-diagram').length;
            this.element.id = 'diagram_' + this.diagramid + '_' + collection;
        }
        this.defaultLocale = {
            Copy: 'Copy',
            Cut: 'Cut',
            Paste: 'Paste',
            Undo: 'Undo',
            Redo: 'Redo',
            SelectAll: 'Select All',
            Grouping: 'Grouping',
            Group: 'Group',
            UnGroup: 'Un Group',
            Order: 'Order',
            BringToFront: 'Bring To Front',
            MoveForward: 'Move Forward',
            SendToBack: 'Send To Back',
            SendBackward: 'Send Backward'
        };
        this.layerZIndex = -1;
        this.layerZIndexTable = {};
        //878837 : initialize parameter for passing container as a parameter
        if (this.swimlaneChildTable === undefined && this.swimlaneZIndexTable === undefined) {
            this.swimlaneChildTable = {};
            this.swimlaneZIndexTable = {};
        }
        this.nameTable = {};
        this.pathTable = {};
        this.groupTable = {};
        this.commands = {};
        if (!this.isLoading) {
            this.views = [];
        }
        this.commandHandler = new CommandHandler(this);
        this.eventHandler = new DiagramEventHandler(this, this.commandHandler);
        this.spatialSearch = new SpatialSearch(this.nameTable);
        this.scroller = new DiagramScroller(this);
    };
    Diagram.prototype.initializeServices = function () {
        this.serviceLocator.register('localization', this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale));
    };
    /**
     * Method to set culture for chart
     */
    Diagram.prototype.setCulture = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
    };
    /* tslint:disable */
    /**
     * Renders the diagram control with nodes and connectors
     */
    Diagram.prototype.render = function () {
        if (this.refreshing && this.dataSourceSettings.dataSource && !this.isLoading) {
            this.nodes = [];
            this.connectors = [];
        }
        //830544-Support to add load event to notify before rendering of diagram
        if (!this.refreshing) {
            var loadEventData = {
                diagram: this, name: 'load'
            };
            this.trigger('load', loadEventData);
        }
        // Bug 832897: Need to improve performance while rendering layout with large number of nodes.
        this.isRefreshed = false;
        this.ignoreCollectionWatch = true;
        var domTable = 'domTable';
        window["" + domTable] = {};
        var collapsedNode = [];
        //Removed isBlazor code.
        if (this.dataSourceSettings.crudAction.read) {
            this.renderInitialCrud();
        }
        this.initHistory();
        this.diagramRenderer = new DiagramRenderer(this.element.id, new SvgRenderer(), this.mode === 'SVG');
        this.initLayers();
        this.initializeDiagramLayers();
        this.diagramRenderer.setLayers();
        this.initObjects(true);
        var isLayout = false;
        // Removed isBlazor code.
        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (!nodes[parseInt(i.toString(), 10)].isExpanded) {
                collapsedNode.push(nodes[parseInt(i.toString(), 10)]);
            }
        }
        if (collapsedNode.length) {
            for (var i = collapsedNode.length - 1; i >= 0; i--) {
                if (i === 0) {
                    this.commandHandler.expandNode(collapsedNode[parseInt(i.toString(), 10)], this, false);
                }
                else {
                    this.commandHandler.expandNode(collapsedNode[parseInt(i.toString(), 10)], this, true);
                }
            }
        }
        if (this.canLayout) {
            this.doLayout();
        }
        if (isLayout) {
            this.commandHandler.getBlazorOldValues();
        }
        if (this.lineRoutingModule) {
            var previousConnectorObject = [];
            var updateConnectorObject = [];
            var changeConnectors = [];
            //Removed isBlazor code.
            // EJ2-65876 - Exception occurs on line routing injection module
            //934719 - Line Routing is never executed during initial rendering
            this.lineRoutingModule.lineRouting(this);
            // Removed isBlazor code.
        }
        else if (this.constraints & DiagramConstraints.LineRouting) {
            console.warn('[WARNING] :: Module "LineRouting" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
        this.validatePageSize();
        this.renderPageBreaks();
        this.diagramRenderer.renderSvgGridlines(this.snapSettings, getGridLayerSvg(this.element.id), this.scroller.transform, this.rulerSettings, this.hRuler, this.vRuler);
        this.commandHandler.initSelectorWrapper();
        /**
         * Used to render context menu
         */
        this.notify('initial-load', {});
        /**
         * Used to load context menu
         */
        this.trigger('load');
        this.scroller.setSize();
        this.scroller.updateScrollOffsets();
        // Bug 832897: Need to improve performance while rendering layout with large number of nodes.
        // If diagram not refreshed, then we will refresh the diagram.
        if (!this.isRefreshed) {
            this.refreshDiagramLayer();
        }
        //Bug 855677: After Serialization, Subprocess Node Dragging Faces Problems After Removing Child Node.
        //Removed refreshDiagramLayer() method in this line as it causes the subprocess child node to be rendered twice in wrapper which causes the issue.
        if (this.scrollSettings.verticalOffset > 0 || this.scrollSettings.horizontalOffset > 0) {
            this.updateScrollOffset();
        }
        /**
         * Used to end the context menu rendering
         */
        if (Browser.isDevice) {
            this.tool = DiagramTools.ZoomPan | DiagramTools.SingleSelect;
        }
        this.notify('initial-end', {});
        this.isProtectedOnChange = false;
        this.tooltipObject = initTooltip(this);
        this.diagramActions = DiagramAction.Render;
        this.initCommands();
        var hiddenUserHandleTemplate = document.getElementsByClassName(this.element.id + '_hiddenUserHandleTemplate');
        createUserHandleTemplates(this.userHandleTemplate, hiddenUserHandleTemplate, this.selectedItems, this.element.id);
        //Removed isBlazor code.
        this.isLoading = false;
        this.refreshRoutingConnectors();
        this.renderComplete();
        this.updateFitToPage();
        if (this.refreshing) {
            this.renderReactTemplates();
        }
    };
    /* tslint:enable */
    Diagram.prototype.updateFitToPage = function () {
        if (this.pageSettings && this.pageSettings.fitOptions && this.pageSettings.fitOptions.canFit) {
            this.fitToPage(this.pageSettings.fitOptions);
        }
    };
    Diagram.prototype.updateTemplate = function () {
        //Removed blazor code
    };
    //Call back function to the node template
    // private measureNode(node: NodeModel): void {
    //     if (node.shape.type === 'Native' && isBlazor()) {
    //         node.wrapper.measure(new Size(node.width, node.height));
    //         node.wrapper.arrange(node.wrapper.desiredSize);
    //     }
    // }
    Diagram.prototype.renderInitialCrud = function () {
        /* eslint-disable */
        var tempObj = this;
        /* eslint-enable */
        if (tempObj.dataSourceSettings.crudAction.read) {
            var callback = new Fetch(tempObj.dataSourceSettings.crudAction.read, 'GET');
            callback.onSuccess = function (data) {
                if (tempObj.dataSourceSettings.dataManager) {
                    tempObj.dataSourceSettings.dataManager = JSON.parse(data);
                }
                else {
                    tempObj.dataSourceSettings.dataSource = JSON.parse(data);
                }
                tempObj.dataBind();
            };
            callback.send().then();
        }
        if (tempObj.dataSourceSettings.connectionDataSource.crudAction.read) {
            var callback = new Fetch(tempObj.dataSourceSettings.connectionDataSource.crudAction.read, 'GET');
            callback.onSuccess = function (data) {
                tempObj.dataSourceSettings.connectionDataSource.dataManager = JSON.parse(data);
                tempObj.dataBind();
            };
            callback.send().then();
        }
    };
    /**
     * Retrieves the module name associated with the diagram.
     *
     * @returns {string}  Retrieves the module name associated with the diagram.
     */
    Diagram.prototype.getModuleName = function () {
        return 'diagram';
    };
    /**
     *
     * Returns the name of class Diagram
     * @returns {string}  Returns the module name of the diagram
     * @private
     */
    Diagram.prototype.getClassName = function () {
        return 'Diagram';
    };
    /* tslint:disable */
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} To provide the array of modules needed for control rendering .\
     * @private
     */
    Diagram.prototype.requiredModules = function () {
        var modules = [];
        modules.push({
            member: 'Bpmn',
            args: []
        });
        modules.push({
            member: 'Bridging',
            args: []
        });
        modules.push({
            member: 'ConnectorEditingTool',
            args: []
        });
        //Removed isBlazor code
        if (this.constraints & DiagramConstraints.UndoRedo) {
            modules.push({
                member: 'UndoRedo',
                args: []
            });
        }
        if (this.layout.type === 'OrganizationalChart' || this.layout.type === 'HierarchicalTree' ||
            this.layout.enableAnimation) {
            modules.push({
                member: 'LayoutAnimate',
                args: []
            });
        }
        if (this.snapSettings.constraints) {
            modules.push({
                member: 'Snapping',
                args: [this]
            });
        }
        modules.push({
            member: 'Ej1Serialization',
            args: [this]
        });
        modules.push({
            member: 'PrintandExport',
            args: [this]
        });
        if (this.contextMenuSettings.show) {
            modules.push({
                member: 'contextMenu',
                args: [this, this.serviceLocator]
            });
        }
        if (this.layout.type === 'OrganizationalChart' || this.layout.type === 'HierarchicalTree') {
            modules.push({
                member: 'OrganizationalChart',
                args: [this]
            });
        }
        if (this.layout.type === 'ComplexHierarchicalTree') {
            modules.push({
                member: 'ComplexHierarchicalTree',
                args: []
            });
        }
        if (this.layout.type === 'MindMap') {
            modules.push({
                member: 'MindMapChart',
                args: []
            });
        }
        if (this.layout.type === 'RadialTree') {
            modules.push({
                member: 'RadialTree',
                args: []
            });
        }
        if (this.layout.type === 'SymmetricalLayout') {
            modules.push({
                member: 'SymmetricalLayout',
                args: []
            });
        }
        if (this.layout.type === 'Flowchart') {
            modules.push({
                member: 'FlowchartLayout',
                args: []
            });
        }
        if (this.dataSourceSettings.dataManager || this.dataSourceSettings.dataSource ||
            this.dataSourceSettings.crudAction.read || this.dataSourceSettings.connectionDataSource.crudAction.read) {
            modules.push({
                member: 'DataBinding',
                args: []
            });
        }
        if (this.constraints & DiagramConstraints.LineRouting) {
            modules.push({
                member: 'LineRouting',
                args: []
            });
        }
        if (this.constraints & DiagramConstraints.AvoidLineOverlapping) {
            modules.push({
                member: 'AvoidLineOverlapping',
                args: [this]
            });
        }
        if ((this.layout && (this.layout.type === 'ComplexHierarchicalTree' || this.layout.type === 'HierarchicalTree')) || (this.layout.arrangement === 'Linear' || (this.layout.enableRouting))) {
            modules.push({
                member: 'LineDistribution',
                args: []
            });
        }
        return modules;
    };
    /* tslint:enable */
    Diagram.prototype.removeUserHandlesTemplate = function () {
        if (this.selectedItems.userHandles.length) {
            for (var i = 0; i < this.selectedItems.userHandles.length; i++) {
                for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
                    var elementId = _a[_i];
                    removeElement(this.selectedItems.userHandles[parseInt(i.toString(), 10)].name + '_template_hiddenUserHandle', elementId);
                }
            }
        }
    };
    /**
     *Destroys the diagram, freeing up its resources.
     *
     * @returns {void} Destroys the diagram, freeing up its resources.
     */
    Diagram.prototype.destroy = function () {
        clearInterval(this.renderTimer);
        this.renderTimer = null;
        if (this.hRuler && this.vRuler) {
            this.hRuler.destroy();
            this.vRuler.destroy();
        }
        this.tooltipObject.destroy();
        this.droppable.destroy();
        this.unWireEvents();
        this.notify('destroy', {});
        _super.prototype.destroy.call(this);
        this.removeUserHandlesTemplate();
        this.clearTemplate();
        if (document.getElementById(this.element.id)) {
            this.element.classList.remove('e-diagram');
            var tooltipelement = document.getElementsByClassName('e-diagram-tooltip');
            while (tooltipelement.length > 0) {
                tooltipelement[0].parentNode.removeChild(tooltipelement[0]);
            }
            var content = document.getElementById(this.element.id + 'content');
            if (content) {
                this.element.removeChild(content);
            }
            var measureWindowElement = 'measureElement';
            if (window["" + measureWindowElement]) {
                window["" + measureWindowElement].usageCount -= 1;
                var measureElementCount = 'measureElementCount';
                window["" + measureElementCount]--;
                if (window["" + measureElementCount] === 0) {
                    window["" + measureWindowElement].parentNode.removeChild(window["" + measureWindowElement]);
                    window["" + measureWindowElement] = null;
                }
            }
        }
        var domTable = 'domTable';
        window["" + domTable] = {};
        for (var i = 0; i < this.layers.length; i++) {
            var currentLayer = this.layers[parseInt(i.toString(), 10)];
            currentLayer.zIndexTable = {};
        }
        this.diagramActions = undefined;
    };
    //Wires the mouse events with diagram control
    Diagram.prototype.wireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var stopEvent = Browser.touchEndEvent;
        var moveEvent = Browser.touchMoveEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        var isIE11Pointer = Browser.isPointer;
        var wheelEvent = Browser.info.name === 'mozilla' ?
            (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        EventHandler.add(this.diagramCanvas, startEvent, this.eventHandler.mouseDown, this.eventHandler);
        EventHandler.add(this.diagramCanvas, moveEvent, this.eventHandler.mouseMove, this.eventHandler);
        EventHandler.add(this.diagramCanvas, stopEvent, this.eventHandler.mouseUp, this.eventHandler);
        EventHandler.add(this.diagramCanvas, cancelEvent, this.eventHandler.mouseLeave, this.eventHandler);
        EventHandler.add(this.diagramCanvas, 'keydown', this.eventHandler.keyDown, this.eventHandler);
        EventHandler.add(this.diagramCanvas, 'keyup', this.eventHandler.keyUp, this.eventHandler);
        EventHandler.add(this.diagramCanvas, 'dblclick', this.eventHandler.doubleClick, this.eventHandler);
        EventHandler.add(this.diagramCanvas, 'scroll', this.eventHandler.scrolled, this.eventHandler);
        EventHandler.add(this.diagramCanvas, wheelEvent, this.eventHandler.mouseWheel, this.eventHandler);
        EventHandler.add(window, 'resize', this.eventHandler.windowResize, this.eventHandler);
        this.initDroppables();
    };
    //Unwires the mouse events from diagram control
    Diagram.prototype.unWireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        var isIE11Pointer = Browser.isPointer;
        var wheelEvent = Browser.info.name === 'mozilla' ?
            (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        var stopEvent = Browser.touchEndEvent;
        EventHandler.remove(this.diagramCanvas, startEvent, this.eventHandler.mouseDown);
        EventHandler.remove(this.diagramCanvas, moveEvent, this.eventHandler.mouseMove);
        EventHandler.remove(this.diagramCanvas, stopEvent, this.eventHandler.mouseUp);
        EventHandler.remove(this.diagramCanvas, cancelEvent, this.eventHandler.mouseLeave);
        EventHandler.remove(this.diagramCanvas, 'keydown', this.eventHandler.keyDown);
        EventHandler.remove(this.diagramCanvas, 'keyup', this.eventHandler.keyUp);
        EventHandler.remove(this.diagramCanvas, 'dblclick', this.eventHandler.doubleClick);
        EventHandler.remove(this.diagramCanvas, 'scroll', this.eventHandler.scrolled);
        EventHandler.remove(this.diagramCanvas, wheelEvent, this.eventHandler.mouseWheel);
        EventHandler.remove(window, 'resize', this.eventHandler.windowResize);
    };
    //public methods - start region
    /**
     * Select a specified collection of nodes and connectors in the diagram. You can specify whether to clear the existing selection and provide an old value if needed. \
     *
     * @returns { void } Select a specified collection of nodes and connectors in the diagram. You can specify whether to clear the existing selection and provide an old value if needed.\
     * @param {NodeModel | ConnectorModel} objects - An array containing the collection of nodes and connectors to be selected.
     * @param {boolean} multipleSelection - Determines whether the existing selection should be cleared (default is false).
     * @param {NodeModel | ConnectorModel} oldValue - Defines the old value
     *
     */
    Diagram.prototype.select = function (objects, multipleSelection, oldValue) {
        //Removed isBlazor code.
        if (objects != null) {
            this.commandHandler.selectObjects(objects, multipleSelection, oldValue);
        }
    };
    /**
     * Returns the diagram action as a string representation.
     * @returns { string }
     * @param { DiagramAction } diagramAction - The diagram action to be converted to a string.
     */
    //Feature (EJ2-18451) : For all client side events, cause argument data type should be string instead of flag enum and value should be easier to understand.
    Diagram.prototype.getDiagramAction = function (diagramAction) {
        var action;
        if (diagramAction === 2 && DiagramAction.Render) {
            action = 'Render';
        }
        else if (diagramAction & DiagramAction.UndoRedo) {
            action = 'UndoRedo';
        }
        else if (diagramAction & DiagramAction.PublicMethod) {
            action = 'PublicMethod';
        }
        else if (diagramAction & DiagramAction.ToolAction) {
            action = 'ToolAction';
        }
        else if (diagramAction & DiagramAction.TextEdit) {
            action = 'TextEdit';
        }
        else if (diagramAction & DiagramAction.Group) {
            action = 'Group';
        }
        else if (diagramAction & DiagramAction.Interactions) {
            action = 'Interactions';
        }
        else if (diagramAction & DiagramAction.PreventHistory) {
            action = 'PreventHistory';
        }
        else if (diagramAction & DiagramAction.DecoratorPropertyChange) {
            action = 'DecoratorPropertyChange';
        }
        else if (diagramAction & DiagramAction.PreventZIndexOnDragging) {
            action = 'PreventZIndexOnDragging';
        }
        else if (diagramAction & DiagramAction.isGroupDragging) {
            action = 'isGroupDragging';
        }
        else if (diagramAction & DiagramAction.DragUsingMouse) {
            action = 'DragUsingMouse';
        }
        return action;
    };
    /**
     *  Select all objects, including nodes and connectors, in the diagram. \
     *
     * @returns { void }  Select all objects, including nodes and connectors, in the diagram.\
     *
     */
    Diagram.prototype.selectAll = function () {
        var selectedItems = [];
        selectedItems = this.getObjectsOfLayer(this.activeLayer.objects);
        this.select(selectedItems);
    };
    /**
     * Remove a specific object from the current selection in the diagram. \
     *
     * @returns { void } Remove a specific object from the current selection in the diagram.\
     * @param {NodeModel | ConnectorModel} obj -  The object to remove from the selection.
     *
     */
    Diagram.prototype.unSelect = function (obj) {
        //Removed isBlazor code.
        if (obj && isSelected(this, obj)) {
            this.commandHandler.unSelect(obj);
            // this.commandHandler.updateBlazorSelector();
        }
    };
    /**
     * Removes all elements from the selection list, clearing the current selection.\
     *
     * @returns { void } Removes all elements from the selection list, clearing the current selection.\
     *
     */
    Diagram.prototype.clearSelection = function () {
        this.commandHandler.clearSelection(true);
    };
    /**
     *  Updates the dimensions of the diagram viewport. \
     *
     * @returns { void }  Updates the dimensions of the diagram viewport.\
     *
     */
    Diagram.prototype.updateViewPort = function () {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        this.eventHandler.updateViewPortSize(this.element);
        this.updateBlazorDiagramProperties(attribute, true);
    };
    Diagram.prototype.cutCommand = function () {
        this.cut();
    };
    /**
     *  Removes the selected nodes and connectors from the diagram and moves them to the diagram clipboard for cutting. \
     *
     * @returns { void }  Removes the selected nodes and connectors from the diagram and moves them to the diagram clipboard for cutting. \
     *
     */
    Diagram.prototype.cut = function () {
        this.commandHandler.cut();
    };
    /**
     *   Adds a process into the sub-process. \
     *
     * @returns { void }  Adds a process into the sub-process. \
     * @param {NodeModel | ConnectorModel} process - A NodeModel representing the process to be added.
     * @param {boolean} parentId - A string representing the parent ID where the process will be added.
     *
     */
    Diagram.prototype.addProcess = function (process, parentId) {
        if (this.bpmnModule) {
            this.bpmnModule.addProcess(process, parentId, this);
        }
    };
    /**
     *  Removes a process from the BPMN sub-process. \
     *
     * @returns { void }  Removes a process from the BPMN sub-process.\
     * @param {string} id - The ID of the process to be removed.
     *
     */
    Diagram.prototype.removeProcess = function (id) {
        if (this.bpmnModule) {
            this.bpmnModule.removeProcess(id, this);
        }
    };
    Diagram.prototype.pasteCommand = function () {
        this.paste();
    };
    /**
     * Adds the given objects or the objects in the diagram clipboard to the diagram control. \
     *
     * @returns { void }  Adds the given objects or the objects in the diagram clipboard to the diagram control. \
     * @param {NodeModel[] | ConnectorModel[]} obj - An array of nodes or connectors objects to be added to diagram.
     * @deprecated
     *
     */
    Diagram.prototype.paste = function (obj) {
        this.commandHandler.paste(obj);
    };
    /**
     *  Fits the diagram to the page with respect to mode and region. \
     *
     * @returns { void }  Fits the diagram to the page with respect to mode and region.\
     * @param {IFitOptions} options - specify the options for fitting the diagram to the page.
     */
    Diagram.prototype.fitToPage = function (options) {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        this.scroller.fitToPage(options);
        this.updateBlazorDiagramProperties(attribute, true);
    };
    /**
     * Brings the specified bounds into view within the diagram's viewport. \
     *
     * @returns { void }  Brings the specified bounds into view within the diagram's viewport.\
     * @param {Rect} bound - Representing the bounds to be brought into view.
     *
     */
    Diagram.prototype.bringIntoView = function (bound) {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        // EJ2-69238 - add true as an extra parameter to calcuate the horizontal and vertical offset
        this.scroller.bringIntoView(bound, true);
        this.updateBlazorDiagramProperties(attribute, true);
    };
    /**
     * Brings the specified bounds to the center of the viewport. \
     *
     * @returns { void }  Brings the specified bounds to the center of the viewport.\
     * @param {Rect} bound - representing the bounds to be centered in the viewport.
     *
     */
    Diagram.prototype.bringToCenter = function (bound) {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        this.scroller.bringToCenter(bound);
        this.updateBlazorDiagramProperties(attribute, true);
    };
    Diagram.prototype.copyCommand = function () {
        this.copy();
    };
    /**
     * Copies the selected nodes and connectors from the diagram to the diagram clipboard for copying. \
     *
     * @returns { Object } Copies the selected nodes and connectors from the diagram to the diagram clipboard for copying.\
     *
     */
    Diagram.prototype.copy = function () {
        var obj = this.commandHandler.copy();
        return obj;
    };
    /**
     *  Groups the selected nodes and connectors in the diagram. \
     *
     * @returns { void }   Groups the selected nodes and connectors in the diagram.\
     *
     */
    Diagram.prototype.group = function () {
        var selectedItems = [];
        selectedItems = this.selectedItems.nodes;
        selectedItems = selectedItems.concat(this.selectedItems.connectors);
        if (selectedItems.length > 1) {
            this.callBlazorModel = false;
            this.insertBlazorDiagramObjects(this.selectedItems);
            this.commandHandler.group();
            this.callBlazorModel = true;
            this.commandHandler.getBlazorOldValues();
        }
    };
    /**
     *  UnGroup the selected nodes and connectors in diagram \
     *
     * @returns { void }   UnGroup the selected nodes and connectors in diagram.\
     *
     */
    Diagram.prototype.unGroup = function () {
        this.callBlazorModel = false;
        this.insertBlazorDiagramObjects(this.selectedItems);
        this.commandHandler.unGroup();
        this.callBlazorModel = true;
        this.commandHandler.getBlazorOldValues();
    };
    /**
     *  Use this method to move the currently selected nodes or connectors to the back of the drawing order. This effectively places them behind other elements in the diagram. \
     *
     * @returns { void }   Use this method to move the currently selected nodes or connectors to the back of the drawing order. This effectively places them behind other elements in the diagram.\
     *
     */
    Diagram.prototype.sendToBack = function () {
        this.commandHandler.sendToBack();
    };
    /**
     * Specify which layer in the diagram should be considered the active layer. The active layer is the one where new elements will be added and where user interactions are primarily focused. \
     *
     * @returns { void } Specify which layer in the diagram should be considered the active layer. The active layer is the one where new elements will be added and where user interactions are primarily focused. \
     * @param {string} layerName - The name of the layer to set as the active layer.
     *
     */
    Diagram.prototype.setActiveLayer = function (layerName) {
        var layer = this.commandHandler.getLayer(layerName);
        this.activeLayer = layer;
    };
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
    Diagram.prototype.addLayer = function (layer, layerObject) {
        this.commandHandler.addLayer(layer, layerObject);
    };
    /**
     * remove the layer from diagram \
     *
     * @returns { void } remove the layer from diagram.\
     * @param {string} layerId - provide the bound value.
     * @deprecated
     *
     */
    Diagram.prototype.removeLayer = function (layerId) {
        this.commandHandler.removeLayer(layerId, isBlazor());
    };
    // /* eslint-enable */
    /**
     *Moves objects from one layer to another layer within the diagram. \
     *
     * @returns { void } Moves objects from one layer to another layer within the diagram. \
     * @param {string[]} objects - An array of object IDs represented as strings to be moved.
     * @param {string} targetLayer - The ID of the target layer to which the objects should be moved.
     */
    Diagram.prototype.moveObjects = function (objects, targetLayer) {
        var oldValues = cloneObject(this.layers);
        this.enableServerDataBinding(false);
        this.commandHandler.moveObjects(objects, targetLayer);
        //     const result: object = this.commandHandler.deepDiffer.map(oldValues, cloneObject(this.layers));
        //     const diffValue: object = this.commandHandler.deepDiffer.frameObject({}, result);
        //     this.oldDiagramObject = { layers: diffValue };
        //     // this.commandHandler.updateBlazorProperties();
    };
    /* tslint:disable */
    Diagram.prototype.layerObjectUpdate = function () {
        //Removed isBlazor code.
    };
    /* tslint:enable */
    /**
     * Use this method to change the order of layers in the diagram. This moves the specified layer behind the layer that comes after it in the layer order. \
     *
     * @returns { void } Use this method to change the order of layers in the diagram. This moves the specified layer behind the layer that comes after it in the layer order.\
     * @param {string} layerName - The name of the layer to be moved.
     * @param {string} targetLayer - define the objects id of string array
     *
     */
    Diagram.prototype.sendLayerBackward = function (layerName) {
        this.layerObjectUpdate();
        this.commandHandler.sendLayerBackward(layerName);
        // comment blazor code
        // this.commandHandler.updateLayerObject(this.oldDiagramObject, true);
    };
    /**
     * Moves the specified layer forward in the drawing order. \
     *
     * @returns { void } Moves the specified layer forward in the drawing order.\
     * @param {string} layerName - A string representing the name of the layer to be moved forward.
     *
     */
    Diagram.prototype.bringLayerForward = function (layerName) {
        this.layerObjectUpdate();
        this.commandHandler.bringLayerForward(layerName);
        // comment blazor code
        // this.commandHandler.updateLayerObject(this.oldDiagramObject);
    };
    /**
     * Clones a layer along with its objects.\
     *
     * @returns { void } Clones a layer along with its objects.\
     * @param {string} layerName - A string representing the name of the layer to be cloned.
     *
     */
    Diagram.prototype.cloneLayer = function (layerName) {
        this.commandHandler.cloneLayer(layerName);
    };
    /**
     *Brings the selected nodes or connectors to the front of the drawing order. \
     *
     * @returns { void } Brings the selected nodes or connectors to the front of the drawing order. \
     *
     */
    Diagram.prototype.bringToFront = function () {
        this.commandHandler.bringToFront();
    };
    /**
     *Sends the selected nodes or connectors forward in the visual order.  \
     *
     * @returns { void } Sends the selected nodes or connectors forward in the visual order. \
     *
     */
    Diagram.prototype.moveForward = function () {
        this.commandHandler.sendForward();
    };
    /**
     *Sends the selected nodes or connectors one step backward in the z-order.\
     *
     * @returns { void } Sends the selected nodes or connectors one step backward in the z-order.\
     *
     */
    Diagram.prototype.sendBackward = function () {
        this.commandHandler.sendBackward();
    };
    /**
     *gets the node or connector having the given name \
     *
     * @returns { void } gets the node or connector having the given name.\
     * @param {string} name - define the name of the layer
     *
     */
    Diagram.prototype.getObject = function (name) {
        return this.nameTable["" + name];
    };
    /**
     *Retrieves the node object for the given node ID.  \
     *
     * @returns { void } Retrieves the node object for the given node ID. \
     * @param {string} id - The ID of the node for which the node object is to be retrieved.
     *
     */
    Diagram.prototype.getNodeObject = function (id) {
        return cloneObject(this.nameTable["" + id]);
    };
    /**
     *Retrieves the connector object for the given node ID. \
     *
     * @returns { void } Retrieves the connector object for the given node ID.\
     * @param {string} id - The ID of the node for which the connector object is to be retrieved.
     *
     */
    Diagram.prototype.getConnectorObject = function (id) {
        return cloneObject(this.nameTable["" + id]);
    };
    /**
     * Retrieves the active layer. \
     *
     * @returns { void } Retrieves the active layer.\
     *
     */
    Diagram.prototype.getActiveLayer = function () {
        return this.activeLayer;
    };
    Diagram.prototype.nudgeCommand = function (direction, x, y) {
        if (typeof direction !== 'object' && (this.selectedItems.nodes.length || this.selectedItems.connectors.length) > 0) {
            var type = void 0;
            if (x.type && x.type === 'KEYDOWN') {
                type = x.type;
            }
            this.nudge(direction, undefined, undefined, type);
        }
    };
    /**
     * Moves the selected objects towards the given direction by a specified distance.
     *
     * @returns { void }  Moves the selected objects towards the given direction by a specified distance.  \
     * @param {NudgeDirection} direction -  Defines the direction in which the objects should be moved.
     * @param {number} x - The horizontal distance by which the selected objects should be moved.
     * @param {number} y -  The vertical distance by which the selected objects should be moved.
     * @param {string} type -  A string that defines the type of nudge action.
     */
    Diagram.prototype.nudge = function (direction, x, y, type) {
        var tx = 0;
        var ty = 0;
        var negativeDirection;
        if (direction === 'Left' || direction === 'Right') {
            negativeDirection = (direction === 'Left');
            tx = (negativeDirection ? -1 : 1) * (x ? x : 1);
        }
        else {
            negativeDirection = (direction === 'Up');
            ty = (negativeDirection ? -1 : 1) * (y ? y : 1);
        }
        if (type === 'KEYDOWN') {
            tx *= 5;
            ty *= 5;
        }
        var obj = this.selectedItems;
        var annotation = this.selectedItems.wrapper.children[0];
        if (annotation instanceof TextElement) {
            this.commandHandler.labelDrag(obj.nodes[0], annotation, tx, ty);
        }
        else {
            var undoObject = cloneObject(this.selectedItems);
            this.protectPropertyChange(true);
            this.drag(obj, tx, ty);
            this.protectPropertyChange(false);
            var entry = {
                type: 'PositionChanged',
                redoObject: cloneObject(this.selectedItems), undoObject: undoObject, category: 'Internal'
            };
            this.addHistoryEntry(entry);
        }
        this.refreshCanvasLayers();
    };
    Diagram.prototype.insertBlazorDiagramObjects = function (actualObject) {
        //Removed isBlazor code
    };
    /**
     * Drags the given object (nodes, connectors, or selector) by the specified horizontal and vertical distances.
     *
     * @returns { void }  Drags the given object (nodes, connectors, or selector) by the specified horizontal and vertical distances.\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - representing the nodes, connectors, or selector to be dragged.
     * @param {number} tx - A number representing the horizontal distance by which the given objects should be moved.
     * @param {number} ty - A number representing the vertical distance by which the given objects should be moved.
     */
    Diagram.prototype.drag = function (obj, tx, ty) {
        this.insertBlazorDiagramObjects(obj);
        //Removed isBlazor code
        if (this.bpmnModule && (obj instanceof Node)) {
            var updated = this.bpmnModule.updateAnnotationDrag(obj, this, tx, ty);
            if (updated) {
                return;
            }
        }
        if (obj instanceof Selector) {
            this.preventConnectorsUpdate = true;
            if (obj.nodes && obj.nodes.length) {
                for (var _i = 0, _a = obj.nodes; _i < _a.length; _i++) {
                    var node = _a[_i];
                    this.callBlazorModel = false;
                    this.drag(node, tx, ty);
                    if (node.parentId) {
                        var parent_1 = this.nameTable[node.parentId];
                        if (parent_1.isLane) {
                            // 909151 - Connector not updating while dragging multiple selection.
                            if (obj.nodes.length > 1) {
                                this.preventConnectorsUpdate = false;
                            }
                            var swimlane = this.nameTable[parent_1.parentId];
                            updateLaneBoundsAfterAddChild(parent_1, swimlane, node, this);
                        }
                    }
                }
                this.callBlazorModel = true;
            }
            if (obj.connectors && obj.connectors.length) {
                this.callBlazorModel = false;
                for (var _b = 0, _c = obj.connectors; _b < _c.length; _b++) {
                    var conn = _c[_b];
                    this.drag(conn, tx, ty);
                    if (this.selectionConnectorsList.indexOf(conn) === -1) {
                        this.selectionConnectorsList.push(conn);
                    }
                }
                this.callBlazorModel = true;
            }
            this.updateSelector();
            if ((this.diagramActions & DiagramAction.DragUsingMouse)) {
                this.updatePage();
            }
        }
        else {
            if (obj instanceof Node) {
                if (this.bpmnModule) {
                    this.bpmnModule.updateAnnotationDrag(obj, this, tx, ty);
                }
            }
            this.commandHandler.drag(obj, tx, ty);
        }
        if (obj instanceof Selector) {
            this.preventConnectorsUpdate = false;
            for (var _d = 0, _e = this.selectionConnectorsList; _d < _e.length; _d++) {
                var connectors = _e[_d];
                this.updateConnectorProperties(this.nameTable[connectors.id]);
                if (connectors.shape.type === 'Bpmn' && connectors.shape.sequence === 'Default' && connectors.shape.flow === 'Sequence') {
                    this.commandHandler.updatePathElementOffset(connectors);
                }
            }
            this.selectionConnectorsList = [];
        }
        // Bug 832880: Need to improve performance while nudging multiple nodes.
        // Removed one if condition here to improve performance.
        if (this.callBlazorModel && (!(this.blazorActions & BlazorAction.interaction)) &&
            (!(this.blazorActions & BlazorAction.GroupClipboardInProcess))) {
            this.commandHandler.getBlazorOldValues();
        }
    };
    Diagram.prototype.disableStackContainerPadding = function (wrapper, disable) {
        if (wrapper instanceof StackPanel) {
            wrapper.considerPadding = disable;
        }
        if (wrapper.children) {
            for (var _i = 0, _a = wrapper.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.disableStackContainerPadding(child, false);
            }
        }
    };
    /**
     * Use this method to scale one or more objects in the diagram by specifying the horizontal and vertical scaling ratios. You can also provide a pivot point as a reference for scaling.
     *
     * @returns { void } Use this method to scale one or more objects in the diagram by specifying the horizontal and vertical scaling ratios. You can also provide a pivot point as a reference for scaling.\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - The objects to be resized.
     * @param {number} sx - The horizontal scaling ratio.
     * @param {number} sy - The vertical scaling ratio.
     * @param {PointModel} pivot - The reference point with respect to which the objects will be resized.
     */
    Diagram.prototype.scale = function (obj, sx, sy, pivot) {
        this.disableStackContainerPadding(obj.wrapper, false);
        this.insertBlazorDiagramObjects(obj);
        var checkBoundaryConstraints = true;
        if (obj.id) {
            obj = this.nameTable[obj.id] || obj;
        }
        if (obj instanceof Selector) {
            if (obj.nodes && obj.nodes.length) {
                this.callBlazorModel = false;
                for (var _i = 0, _a = obj.nodes; _i < _a.length; _i++) {
                    var node = _a[_i];
                    checkBoundaryConstraints = this.commandHandler.scale(node, sx, sy, pivot, obj);
                    if (!this.commandHandler.checkBoundaryConstraints(undefined, undefined, obj.wrapper.bounds)) {
                        this.commandHandler.scale(node, 1 / sx, 1 / sy, pivot, obj);
                    }
                }
                this.callBlazorModel = true;
            }
            if (obj.connectors && obj.connectors.length) {
                this.callBlazorModel = false;
                for (var _b = 0, _c = obj.connectors; _b < _c.length; _b++) {
                    var conn = _c[_b];
                    this.commandHandler.scale(conn, sx, sy, pivot, obj);
                    if (!this.commandHandler.checkBoundaryConstraints(undefined, undefined, obj.wrapper.bounds)) {
                        this.commandHandler.scale(conn, 1 / sx, 1 / sy, pivot, obj);
                    }
                }
                this.callBlazorModel = true;
            }
            var selector = this.selectedItems;
            if (!(selectionHasConnector(this, selector))) {
                this.updateSelector();
            }
            this.refreshCanvasLayers();
        }
        else {
            this.commandHandler.scale(obj, sx, sy, pivot, (obj.children ? obj : undefined));
        }
        if (this.callBlazorModel && (!(this.blazorActions & BlazorAction.interaction)) &&
            (!(this.blazorActions & BlazorAction.GroupClipboardInProcess))) {
            this.commandHandler.getBlazorOldValues();
        }
        this.disableStackContainerPadding(obj.wrapper, true);
        return checkBoundaryConstraints;
    };
    /**
     * Rotates the specified nodes, connectors, or selector by the given angle.
     *
     * @returns { void } Rotates the specified nodes, connectors, or selector by the given angle.\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - The objects to be rotated
     * @param {number} angle - The angle by which the objects should be rotated (in degrees).
     * @param {PointModel} pivot - The reference point with respect to which the objects will be rotated.
     * @param {boolean} rotateUsingHandle - Whether to rotate using the handle.
     */
    Diagram.prototype.rotate = function (obj, angle, pivot, rotateUsingHandle) {
        // Bug 842506: After multiple group node rotations, the undo functionality is not working.
        // Added below condition to store the current obj to add it as undo element in rotation changed entry.
        var undoObject;
        var childTable = [];
        if (!rotateUsingHandle) {
            undoObject = cloneObject(obj);
            if (undoObject.nodes && undoObject.nodes.length > 0 && undoObject.nodes[0].children) {
                var elements = [];
                if (!this.fromUndo) {
                    this.rotateUsingButton = true;
                }
                var nodes = this.commandHandler.getAllDescendants(undoObject.nodes[0], elements);
                for (var i = 0; i < nodes.length; i++) {
                    var node = this.commandHandler.cloneChild(nodes[parseInt(i.toString(), 10)].id);
                    childTable[nodes[parseInt(i.toString(), 10)].id] = cloneObject(node);
                }
            }
            if (angle < 0) {
                angle = (angle + 360) % 360;
            }
        }
        this.insertBlazorDiagramObjects(obj);
        var checkBoundaryConstraints;
        if (obj.id) {
            obj = this.nameTable[obj.id] || obj;
        }
        if (obj) {
            pivot = pivot || { x: obj.wrapper.offsetX, y: obj.wrapper.offsetY };
            if (obj instanceof Selector) {
                this.callBlazorModel = false;
                obj.rotateAngle += angle;
                obj.wrapper.rotateAngle += angle;
                var bounds = getBounds(obj.wrapper);
                checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, bounds);
                if (!checkBoundaryConstraints) {
                    obj.rotateAngle -= angle;
                    obj.wrapper.rotateAngle -= angle;
                    return checkBoundaryConstraints;
                }
                var objects = [];
                objects = objects.concat(obj.nodes);
                objects = objects.concat(obj.connectors);
                this.commandHandler.rotateObjects(obj, objects, angle, pivot);
                this.callBlazorModel = true;
            }
            else {
                this.commandHandler.rotateObjects(obj, [obj], angle, pivot);
            }
        }
        if (this.callBlazorModel && (!(this.blazorActions & BlazorAction.interaction))) {
            this.commandHandler.getBlazorOldValues();
        }
        if (!rotateUsingHandle && !this.fromUndo) {
            // To add history entry for group node rotation.
            if (undoObject.nodes && undoObject.nodes.length > 0 && undoObject.nodes[0].children) {
                var entry = {
                    type: 'RotationChanged', redoObject: cloneObject(obj), undoObject: cloneObject(undoObject), category: 'Internal',
                    childTable: childTable
                };
                this.commandHandler.addHistoryEntry(entry);
                this.commandHandler.updateSelector();
            }
        }
        return checkBoundaryConstraints;
    };
    /**
     * Moves the source point of the given connector by the specified horizontal and vertical distances.
     *
     * @returns { void }  Moves the source point of the given connector by the specified horizontal and vertical distances.\
     * @param {ConnectorModel} obj - representing the connector whose source point needs to be moved.
     * @param {number} tx - A number representing the horizontal distance by which the source point should be moved.
     * @param {number} ty - A number representing the vertical distance by which the source point should be moved.
     */
    Diagram.prototype.dragSourceEnd = function (obj, tx, ty) {
        this.insertBlazorDiagramObjects(obj);
        this.commandHandler.dragSourceEnd(obj, tx, ty);
        if (this.callBlazorModel) {
            this.commandHandler.getBlazorOldValues();
        }
    };
    /**
     * Moves the target point of the given connector by the specified horizontal and vertical distances.
     *
     * @returns { void }   Moves the target point of the given connector by the specified horizontal and vertical distances.\
     * @param {ConnectorModel} obj - representing the connector whose target point needs to be moved.
     * @param {number} tx - A number representing the horizontal distance by which the target point should be moved.
     * @param {number} ty - A number representing the vertical distance by which the target point should be moved.
     */
    Diagram.prototype.dragTargetEnd = function (obj, tx, ty) {
        this.insertBlazorDiagramObjects(obj);
        this.commandHandler.dragTargetEnd(obj, tx, ty);
        if (this.callBlazorModel) {
            this.commandHandler.getBlazorOldValues();
        }
    };
    /**
     * Finds all the objects that are under the given mouse position based on specified criteria.
     *
     * @returns { void }   Finds all the objects that are under the given mouse position based on specified criteria.\
     * @param {PointModel} position - The PointModel that defines the position. The objects under this position will be found.
     * @param {IElement} source - Representing the source object. The objects under this source will be found.
     */
    Diagram.prototype.findObjectsUnderMouse = function (position, source) {
        return this.eventHandler.findObjectsUnderMouse(position, source);
    };
    /**
     * Finds the object that is under the given mouse position based on specified criteria.
     *
     * @returns { void }   Finds the object that is under the given mouse position based on specified criteria. \
     * @param {NodeModel[] | ConnectorModel[]}objects - A collection of NodeModel or ConnectorModel objects, from which the target object has to be found.
     * @param {Actions} action - Defines the action used to find the relevant object.
     * @param {boolean} inAction - A boolean indicating the active state of the action.
     */
    Diagram.prototype.findObjectUnderMouse = function (objects, action, inAction) {
        return this.eventHandler.findObjectUnderMouse(objects, action, inAction);
    };
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
    Diagram.prototype.findTargetObjectUnderMouse = function (objects, action, inAction, position, source) {
        return this.eventHandler.findTargetUnderMouse(objects, action, inAction, position, source);
    };
    /**
     * Finds the child element of the given object at the given position based on specified criteria.
     *
     * @returns { void } Finds the child element of the given object at the given position based on specified criteria.\
     * @param {IElement} obj - representing the object, the child element of which has to be found.
     * @param {PointModel} position - defines the position. The child element under this position will be found.
     * @param {Diagram} diagram - defines the diagram value.
     * @param {number} padding - A number representing the padding for the search area around the position.
     */
    Diagram.prototype.findElementUnderMouse = function (obj, position, diagram, padding) {
        return this.eventHandler.findElementUnderMouse(obj, position, diagram, padding);
    };
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
    Diagram.prototype.findActionToBeDone = function (obj, wrapper, position, target) {
        return this.eventHandler.findActionToBeDone(obj, wrapper, position, target);
    };
    // Feature 826644: Support to add ports to the connector. Added below method to update connector port on property change.
    Diagram.prototype.updateConnectorPort = function (connector) {
        if (connector.ports.length) {
            var portContent = void 0;
            for (var _i = 0, _a = connector.ports; _i < _a.length; _i++) {
                var port = _a[_i];
                portContent = this.getWrapper(connector.wrapper, port.id);
                connector.initPortWrapper(port, connector.intermediatePoints, connector.wrapper.bounds, portContent);
            }
        }
        connector.wrapper.measure(new Size(connector.wrapper.width, connector.wrapper.height));
        connector.wrapper.arrange(connector.wrapper.desiredSize);
    };
    /**
     * Returns the tool that handles the given action.
     *
     * @returns { ToolBase } Returns the tool that handles the given action. \
     * @param {string} action - A string that defines the action that is going to be performed.
     */
    Diagram.prototype.getTool = function (action) {
        var tool;
        var getCustomTool = getFunction(this.getCustomTool);
        if (getCustomTool) {
            tool = getCustomTool(action);
            if (tool) {
                return tool;
            }
        }
        return this.eventHandler.getTool(action);
    };
    /**
     * Defines the cursor that corresponds to the given action.
     *
     * @returns { string } Defines the cursor that corresponds to the given action. \
     * @param {string} action - The action for which the cursor is defined.
     * @param {boolean} active - Indicates whether the action is active.
     */
    Diagram.prototype.getCursor = function (action, active) {
        var cursor;
        var getCustomCursor = getFunction(this.getCustomCursor);
        if (getCustomCursor) {
            cursor = getCustomCursor(action, active);
            if (cursor) {
                return cursor;
            }
        }
        if (this.customCursor.length) {
            for (var i = 0; i < this.customCursor.length; i++) {
                if (this.customCursor[parseInt(i.toString(), 10)].action === action) {
                    return this.customCursor[parseInt(i.toString(), 10)].cursor;
                }
            }
        }
        return this.eventHandler.getCursor(action);
    };
    /**
     * Initializes the undo redo actions
     *
     * @returns { void } Initializes the undo redo actions \
     * @private
     */
    Diagram.prototype.initHistory = function () {
        if (this.undoRedoModule) {
            this.undoRedoModule.initHistory(this);
        }
    };
    /**
     * Adds a history entry for a change in the diagram control to the track.
     *
     * @returns { void } Adds a history entry for a change in the diagram control to the track. \
     * @param {HistoryEntry} entry - The history entry that describes a change in the diagram.
     * @param {string[]} sourceId - An optional array of source IDs associated with the change.
     */
    Diagram.prototype.addHistoryEntry = function (entry, sourceId) {
        if (this.undoRedoModule && (this.constraints & DiagramConstraints.UndoRedo)
            && (!this.currentSymbol || this.checkCurrentSymbol(this.currentSymbol, entry))) {
            if (entry.undoObject && entry.undoObject.id === 'helper') {
                return;
            }
            var added = this.undoRedoModule.addHistoryEntry(entry, this);
            if (entry.type !== 'StartGroup' && entry.type !== 'EndGroup' && added) {
                this.historyChangeTrigger(entry, 'CustomAction', sourceId);
            }
        }
    };
    Diagram.prototype.checkCurrentSymbol = function (currentSymbol, entry) {
        var check = false;
        if (entry.undoObject && entry.redoObject) {
            var undoObjects = entry.undoObject;
            var redoObject = entry.undoObject;
            if (redoObject.id && undoObjects.id && redoObject.id !== currentSymbol.id && undoObjects.id !== currentSymbol.id) {
                return check = true;
            }
            else {
                return check;
            }
        }
        return check;
    };
    /**
     * Adds the given custom change in the diagram control to the track
     *
     * @returns { void } Adds the given custom change in the diagram control to the track \
     * @param {HistoryEntry} entry - Defines the entry/information about a change in diagram
     */
    Diagram.prototype.addCustomHistoryEntry = function (entry) {
        //Removed isBlazor code
    };
    /* eslint-disable */
    /** @private */
    Diagram.prototype.historyChangeTrigger = function (entry, action, sourceId) {
        var change = {};
        /* eslint-enable */
        var oldValue = 'oldValue';
        var newValue = 'newValue';
        var type = 'type';
        var entryType = 'entryType';
        var source = [];
        if (entry.category === 'Internal') {
            if (entry && entry.redoObject && ((entry.redoObject.nodes) instanceof Array) &&
                ((entry.redoObject.connectors) instanceof Array)) {
                source = entry.redoObject.nodes.concat(entry.redoObject.connectors);
            }
            else {
                if (entry.redoObject) {
                    source.push(entry.redoObject);
                }
            }
            change["" + type] = entry.type;
            //Removed isBlazor code
            switch (entry.type) {
                case 'PositionChanged':
                    // 909584 - History change event args value is not updated properly
                    if (action === 'Undo') {
                        change["" + oldValue] = {
                            offsetX: entry.redoObject.offsetX,
                            offsetY: entry.redoObject.offsetY
                        };
                        change["" + newValue] = {
                            offsetX: entry.undoObject.offsetX,
                            offsetY: entry.undoObject.offsetY
                        };
                    }
                    else {
                        change["" + oldValue] = {
                            offsetX: entry.undoObject.offsetX,
                            offsetY: entry.undoObject.offsetY
                        };
                        change["" + newValue] = {
                            offsetX: entry.redoObject.offsetX,
                            offsetY: entry.redoObject.offsetY
                        };
                    }
                    break;
                case 'RotationChanged':
                    if (action === 'Undo') {
                        change["" + oldValue] = { rotateAngle: entry.redoObject.rotateAngle };
                        change["" + newValue] = { rotateAngle: entry.undoObject.rotateAngle };
                    }
                    else {
                        change["" + oldValue] = { rotateAngle: entry.undoObject.rotateAngle };
                        change["" + newValue] = { rotateAngle: entry.redoObject.rotateAngle };
                    }
                    break;
                case 'SizeChanged':
                    if (action === 'Undo') {
                        change["" + oldValue] = {
                            offsetX: entry.redoObject.offsetX, offsetY: entry.redoObject.offsetY,
                            width: entry.redoObject.width, height: entry.redoObject.height
                        };
                        change["" + newValue] = {
                            offsetX: entry.undoObject.offsetX, offsetY: entry.undoObject.offsetY,
                            width: entry.undoObject.width, height: entry.undoObject.height
                        };
                    }
                    else {
                        change["" + oldValue] = {
                            offsetX: entry.undoObject.offsetX, offsetY: entry.undoObject.offsetY,
                            width: entry.undoObject.width, height: entry.undoObject.height
                        };
                        change["" + newValue] = {
                            offsetX: entry.redoObject.offsetX, offsetY: entry.redoObject.offsetY,
                            width: entry.redoObject.width, height: entry.redoObject.height
                        };
                    }
                    break;
                case 'CollectionChanged':
                    change[entry.changeType] = source;
                    break;
                case 'ConnectionChanged':
                    if (action === 'Undo') {
                        change["" + oldValue] = {
                            offsetX: entry.redoObject.offsetX,
                            offsetY: entry.redoObject.offsetY
                        };
                        change["" + newValue] = {
                            offsetX: entry.undoObject.offsetX,
                            offsetY: entry.undoObject.offsetY
                        };
                    }
                    else {
                        change["" + oldValue] = {
                            offsetX: entry.undoObject.offsetX,
                            offsetY: entry.undoObject.offsetY
                        };
                        change["" + newValue] = {
                            offsetX: entry.redoObject.offsetX,
                            offsetY: entry.redoObject.offsetY
                        };
                    }
                    break;
            }
            /**Feature(EJ2-60228): Need to add Object ID in the history change event argument*/
            var nodeSourceId = [];
            var connectorSourceId = [];
            if (sourceId === undefined && entry.type === 'PropertyChanged') {
                for (var i = 0; i < Object.keys(entry.undoObject).length; i++) {
                    if (Object.keys(entry.undoObject)[parseInt(i.toString(), 10)] === 'nodes') {
                        for (var _i = 0, _a = Object.keys(entry.undoObject.nodes); _i < _a.length; _i++) {
                            var key = _a[_i];
                            var undoIndex = parseInt(key, 10);
                            nodeSourceId.push(this.nodes[parseInt(undoIndex.toString(), 10)].id);
                        }
                    }
                }
                for (var i = 0; i < Object.keys(entry.undoObject).length; i++) {
                    if (Object.keys(entry.undoObject)[parseInt(i.toString(), 10)] === 'connectors') {
                        for (var _b = 0, _c = Object.keys(entry.undoObject.connectors); _b < _c.length; _b++) {
                            var key = _c[_b];
                            var undoIndex = parseInt(key, 10);
                            connectorSourceId.push(this.connectors[parseInt(undoIndex.toString(), 10)].id);
                        }
                    }
                }
                sourceId = nodeSourceId.concat(connectorSourceId);
            }
            var arg = {
                cause: entry.category, source: cloneBlazorObject(source), change: cloneBlazorObject(change),
                action: action, sourceId: sourceId
            };
            //Removed isBlazor code
            if (source.length) {
                this.triggerEvent(DiagramEvent.historyChange, arg);
            }
        }
    };
    /**
     * Use this method to start a group action, allowing multiple actions to be treated as a single unit during undo/redo operations. This is useful when you want to group related actions together.
     *
     * @returns { void } Use this method to start a group action, allowing multiple actions to be treated as a single unit during undo/redo operations. This is useful when you want to group related actions together. \
     */
    Diagram.prototype.startGroupAction = function () {
        var entry = { type: 'StartGroup', category: 'Internal' };
        if (!(this.diagramActions & DiagramAction.UndoRedo)) {
            this.addHistoryEntry(entry);
        }
    };
    /**
     * Closes the grouping of actions that will be undone/restored as a whole.
     *
     * @returns { void } Closes the grouping of actions that will be undone/restored as a whole.\
     */
    Diagram.prototype.endGroupAction = function () {
        var entry = { type: 'EndGroup', category: 'Internal' };
        if (!(this.diagramActions & DiagramAction.UndoRedo)) {
            this.addHistoryEntry(entry);
        }
    };
    /**
     * Restores the last action that was performed.
     *
     * @returns { void } Restores the last action that was performed. \
     */
    Diagram.prototype.undo = function () {
        this.canEnableBlazorObject = true;
        this.callBlazorModel = false;
        if (this.undoRedoModule && (this.constraints & DiagramConstraints.UndoRedo)) {
            this.isUndo = true;
            this.undoRedoModule.undo(this);
            this.isUndo = false;
        }
        else if (this.constraints & DiagramConstraints.UndoRedo) {
            console.warn('[WARNING] :: Module "UndoRedo" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
        this.commandHandler.getBlazorOldValues();
        this.callBlazorModel = true;
        this.canEnableBlazorObject = false;
    };
    /**
     * Reverse an undo action, essentially restoring the state of the component to a previous state after an undo operation has been performed.
     *
     * @returns { void } Reverse an undo action, essentially restoring the state of the component to a previous state after an undo operation has been performed.\
     */
    Diagram.prototype.redo = function () {
        this.canEnableBlazorObject = true;
        this.callBlazorModel = false;
        if (this.undoRedoModule && (this.constraints & DiagramConstraints.UndoRedo)) {
            this.undoRedoModule.redo(this);
        }
        else if (this.constraints & DiagramConstraints.UndoRedo) {
            console.warn('[WARNING] :: Module "UndoRedo" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
        this.commandHandler.getBlazorOldValues();
        this.callBlazorModel = true;
        this.canEnableBlazorObject = false;
    };
    Diagram.prototype.getBlazorDiagramObjects = function (objects) {
        if (objects) {
            for (var j = 0; j < objects.length; j++) {
                this.insertBlazorDiagramObjects(objects[parseInt(j.toString(), 10)]);
            }
        }
        else {
            this.insertBlazorDiagramObjects(this.selectedItems);
        }
        this.callBlazorModel = false;
        this.canEnableBlazorObject = true;
    };
    /**
     * Aligns a group of objects with reference to the first object in the group.
     *
     * @returns { void } Aligns a group of objects with reference to the first object in the group.\
     * @param {AlignmentOptions}option - Defining the factor by which the objects have to be aligned.
     * @param {NodeModel[] | ConnectorModel[]} objects - A collection of node or connector objects to be aligned.
     * @param {AlignmentMode} type - Defines the type to be aligned
     */
    Diagram.prototype.align = function (option, objects, type) {
        this.getBlazorDiagramObjects(objects);
        if (!objects) {
            objects = [];
            objects = objects.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        }
        this.diagramActions = this.diagramActions | DiagramAction.PublicMethod;
        this.commandHandler.align(objects, option, (type ? type : 'Object'));
        this.commandHandler.getBlazorOldValues();
        this.callBlazorModel = true;
        this.canEnableBlazorObject = false;
    };
    /**
     * Arranges a group of objects with equal intervals within the group.
     *
     * @returns { void } Arranges a group of objects with equal intervals within the group.\
     * @param {NodeModel[] | ConnectorModel[]} option - Objects that have to be equally spaced within the group.
     * @param {DistributeOptions} objects - Object defining the factor to distribute the shapes.
     */
    Diagram.prototype.distribute = function (option, objects) {
        this.getBlazorDiagramObjects(objects);
        if (!objects) {
            objects = [];
            objects = objects.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        }
        this.diagramActions = this.diagramActions | DiagramAction.PublicMethod;
        this.commandHandler.distribute(objects, option);
        this.commandHandler.getBlazorOldValues();
        this.canEnableBlazorObject = false;
        this.callBlazorModel = true;
    };
    /**
     * Scales the specified objects to match the size of the first object in the group.
     *
     * @returns { void } Scales the specified objects to match the size of the first object in the group.\
     * @param {SizingOptions} option - Specifies whether the objects should be horizontally scaled, vertically scaled, or both.
     * @param {NodeModel[] | ConnectorModel[]}objects - The collection of objects to be scaled.
     */
    Diagram.prototype.sameSize = function (option, objects) {
        this.getBlazorDiagramObjects(objects);
        if (!objects) {
            objects = [];
            objects = objects.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        }
        this.diagramActions = this.diagramActions | DiagramAction.PublicMethod;
        this.commandHandler.sameSize(objects, option);
        this.commandHandler.getBlazorOldValues();
        this.canEnableBlazorObject = false;
        this.callBlazorModel = true;
    };
    Diagram.prototype.updateBlazorDiagramProperties = function (attribute, canCall) {
        //Removed isBlazor code
        if (canCall) {
            // this.commandHandler.getDiagramOldValues(this.oldDiagramObject, attribute);
        }
    };
    Diagram.prototype.getZoomingAttribute = function () {
        var attribute = [];
        attribute.push('scrollSettings');
        attribute.push('snapSettings');
        return attribute;
    };
    /**
     * Scales the diagram control based on the provided zoom factor. You can optionally specify a focused point around which the diagram will be zoomed.
     *
     * @returns { void } Scales the diagram control based on the provided zoom factor. You can optionally specify a focused point around which the diagram will be zoomed.\
     * @param {number} factor - Defines the factor by which the diagram is zoomed.
     * @param {PointModel} focusedPoint - Defines the point with respect to which the diagram will be zoomed.
     */
    Diagram.prototype.zoom = function (factor, focusedPoint) {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        this.scroller.zoom(factor, 0, 0, focusedPoint);
        if (!(this.blazorActions & BlazorAction.interaction)) {
            this.updateBlazorDiagramProperties(attribute, true);
        }
    };
    /**
     * Scales the diagram control based on the provided options, which include the desired zoom factor, focus point, and zoom type.
     *
     * @returns { void }  Scales the diagram control based on the provided options, which include the desired zoom factor, focus point, and zoom type.\
     * @param {ZoomOptions} options - An object specifying the zoom factor, focus point, and zoom type.
     *
     */
    Diagram.prototype.zoomTo = function (options) {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        var factor = options.zoomFactor ? options.zoomFactor : 0.2;
        factor = options.type === 'ZoomOut' ? 1 / (1 + factor) : (1 + factor);
        this.scroller.zoom(factor, 0, 0, options.focusPoint);
        this.updateBlazorDiagramProperties(attribute, true);
    };
    /**
     * Pans the diagram control to the given horizontal and vertical offsets.
     *
     * @returns { void } Pans the diagram control to the given horizontal and vertical offsets.\
     * @param {number} horizontalOffset - The horizontal distance to which the diagram should be scrolled.
     * @param {number} verticalOffset - The vertical distance to which the diagram should be scrolled.
     * @param {PointModel} focusedPoint - representing the focused point during panning.
     * @param {boolean} isInteractiveZoomPan - A boolean indicating whether the panning is interactive zoom pan.
     */
    Diagram.prototype.pan = function (horizontalOffset, verticalOffset, focusedPoint, isInteractiveZoomPan) {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        this.setCursor('grabbing');
        this.scroller.zoom(1, horizontalOffset, verticalOffset, focusedPoint, isInteractiveZoomPan);
        this.updateBlazorDiagramProperties(attribute, true);
    };
    /**
     * Resets the zoom and scroller offsets to their default values.
     *
     * @returns { void } Resets the zoom and scroller offsets to their default values.\
     */
    Diagram.prototype.reset = function () {
        var attribute = this.getZoomingAttribute();
        this.updateBlazorDiagramProperties(attribute);
        this.scroller.zoom(1 / this.scroller.currentZoom, -this.scroller.horizontalOffset, -this.scroller.verticalOffset, { x: 0, y: 0 });
        this.updateBlazorDiagramProperties(attribute, true);
    };
    /**
     * Resets the segments of the connectors to their default state. This removes any custom segments and restores the connectors to their original configuration.
     *
     * @returns { void } Resets the segments of the connectors to their default state. This removes any custom segments and restores the connectors to their original configuration. \
     */
    Diagram.prototype.resetSegments = function () {
        var previousConnectorObject = [];
        var updateConnectorObject = [];
        var changeConnectors = [];
        //Removed isBlazor code
        if (this.constraints & DiagramConstraints.LineRouting && this.lineRoutingModule) {
            this.lineRoutingModule.lineRouting(this);
        }
        else {
            this.protectPropertyChange(true);
            var connector = void 0;
            for (var i = 0; i < this.connectors.length; i++) {
                connector = this.connectors[parseInt(i.toString(), 10)];
                connector.segments = [];
                this.connectorPropertyChange(connector, {}, { segments: connector.segments });
                if (this.avoidLineOverlappingModule) {
                    this.avoidLineOverlappingModule.removeConnector(connector);
                }
            }
            this.protectPropertyChange(false);
        }
        //Removed isBlazor code
    };
    /**
     * setBlazorDiagramProps method
     *
     * @returns {void} setBlazorDiagramProps method .\
     * @param {boolean} arg - provide the eventName value.
     * @private
     */
    Diagram.prototype.setBlazorDiagramProps = function (arg) {
        var attribute = this.getZoomingAttribute();
        if (arg) {
            this.updateBlazorDiagramProperties(attribute);
        }
        else {
            this.updateBlazorDiagramProperties(attribute, true);
        }
    };
    /**
     * getDirection method
     *
     * @returns { Promise<void | object> } getDirection method .\
     * @param {DiagramEvent} eventName - provide the eventName value.
     * @param {Object} args - provide the args value.
     * @private
     */
    Diagram.prototype.triggerEvent = function (eventName, args) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args) {
                            this.updateEventValue(args);
                        }
                        return [4 /*yield*/, this.trigger(DiagramEvent["" + eventName], args)];
                    case 1:
                        eventArgs = _a.sent();
                        //Removed isBlazor code.
                        return [2 /*return*/, eventArgs];
                }
            });
        });
    };
    Diagram.prototype.updateEventValue = function (args) {
        var element = args.element;
        if (args.element && element instanceof Selector && (element.nodes.length + element.connectors.length === 1)) {
            args.element = (element.nodes.length === 1) ? element.nodes[0] : element.connectors[0];
        }
    };
    /**
     * Adds the specified node to a lane within a swimlane.
     *
     * @returns { void }     Adds the specified node to a lane within a swimlane. \
     * @param {NodeModel} node - representing the node to be added to the lane.
     * @param {string} swimLane - A string representing the ID of the swimlane containing the lane.
     * @param {string} lane - A string representing the ID of the lane where the node will be added.
     * @deprecated
     */
    Diagram.prototype.addNodeToLane = function (node, swimLane, lane) {
        if (this.nameTable["" + swimLane]) {
            var swimlaneNode = this.nameTable["" + swimLane];
            this.protectPropertyChange(true);
            if (this.undoRedoModule) {
                this.historyManager.startGroupAction();
            }
            if (!this.nameTable[node.id]) {
                node.offsetX = swimlaneNode.wrapper.bounds.width + swimlaneNode.wrapper.bounds.x;
                node.offsetY = swimlaneNode.wrapper.bounds.height + swimlaneNode.wrapper.bounds.y;
                node = this.add(node);
            }
            node.parentId = '';
            if (!swimlaneNode.shape.phases.length) {
                var laneId = swimLane + lane + '0';
                if (this.nameTable["" + laneId]) {
                    //Bug 913801: Adding an existing node into a lane as child won't be interactive.
                    //Added below method call to update the zIndex of newly added child node.
                    this.commandHandler.updateLaneChildrenZindex(node, this.nameTable["" + laneId]);
                    addChildToContainer(this, this.nameTable["" + laneId], node, undefined, true);
                    updateLaneBoundsAfterAddChild(this.nameTable["" + laneId], swimlaneNode, node, this);
                }
            }
            else {
                for (var i = 0; i < swimlaneNode.shape.phases.length; i++) {
                    var laneId = swimLane + lane + i;
                    if (this.nameTable["" + laneId] && this.nameTable["" + laneId].isLane) {
                        var laneNode = this.nameTable["" + laneId].wrapper.bounds;
                        var focusPoint = {
                            x: laneNode.x +
                                (laneNode.x - swimlaneNode.wrapper.bounds.x + node.margin.left + (node.wrapper.bounds.width / 2)),
                            y: laneNode.y + swimlaneNode.wrapper.bounds.y - node.margin.top
                        };
                        if (swimlaneNode.shape.orientation === 'Horizontal') {
                            focusPoint.y = laneNode.y;
                        }
                        else {
                            focusPoint.x = laneNode.x;
                            var laneHeaderId = this.nameTable["" + laneId].parentId +
                                swimlaneNode.shape.lanes[0].id + '_0_header';
                            focusPoint.y = laneNode.y +
                                (swimlaneNode.wrapper.bounds.y - this.nameTable["" + laneHeaderId].wrapper.bounds.height +
                                    node.margin.top + (node.wrapper.bounds.height / 2));
                        }
                        if ((laneId === swimLane + lane + (swimlaneNode.shape.phases.length - 1)) ||
                            laneNode.containsPoint(focusPoint)) {
                            //Bug 913801: Adding an existing node into a lane as child won't be interactive.
                            //Added below method call to update the zIndex of newly added child node.
                            this.commandHandler.updateLaneChildrenZindex(node, this.nameTable["" + laneId]);
                            addChildToContainer(this, this.nameTable["" + laneId], node, undefined, true);
                            updateLaneBoundsAfterAddChild(this.nameTable["" + laneId], swimlaneNode, node, this);
                            break;
                        }
                    }
                }
            }
            if (this.undoRedoModule) {
                this.historyManager.endGroupAction();
            }
            this.protectPropertyChange(false);
        }
        this.updateDiagramElementQuad();
    };
    /**
     * Displays a tooltip for the specified diagram object.
     *
     * @param {NodeModel | ConnectorModel} obj - The object for which the tooltip will be shown.
     */
    Diagram.prototype.showTooltip = function (obj) {
        if (obj && obj.id && !obj.wrapper) {
            obj = this.nameTable[obj.id];
        }
        var bounds = getBounds(obj.wrapper);
        var position = { x: 0, y: 0 };
        var content = obj.tooltip.content ?
            obj.tooltip.content : 'X:' + Math.round(bounds.x) + ' ' + 'Y:' + Math.round(bounds.y);
        if (obj && obj.tooltip.openOn === 'Custom') {
            if (obj instanceof Node) {
                position = { x: obj.offsetX + (obj.width / 2), y: obj.offsetY + (obj.height / 2) };
            }
            else {
                position = { x: obj.targetPoint.x, y: obj.targetPoint.x };
            }
            this.commandHandler.showTooltip(obj, position, content, 'SelectTool', true);
        }
    };
    /**
     * Hides the tooltip for the corresponding diagram object.
     *
     * @param {NodeModel | ConnectorModel} obj - The node or connector object for which the tooltip should be hidden.
     */
    Diagram.prototype.hideTooltip = function (obj) {
        if (obj && obj.tooltip.openOn === 'Custom') {
            this.tooltipObject.close();
        }
    };
    /**
     * Adds the specified node to the diagram control.
     *
     * @returns { Node }     Adds the specified node to the diagram control.\
     * @param {NodeModel} obj - representing the node to be added to the diagram.
     * @param {boolean} group - A boolean value indicating whether the node should be added to a group.
     * @blazorArgsType obj|DiagramNode
     */
    Diagram.prototype.addNode = function (obj, group) {
        return this.add(obj, group);
    };
    /**
     * Adds the specified diagram object to the specified group node.
     *
     * @returns { void }     Adds the specified diagram object to the specified group node.\
     * @param {NodeModel} group - The group node to which the diagram object will be added.
     * @param {string | NodeModel | ConnectorModel} child - The diagram object to be added to the group.
     * @blazorArgsType obj|DiagramNode
     */
    Diagram.prototype.addChildToGroup = function (group, child) {
        var severDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        var propChange = this.isProtectedOnChange;
        this.protectPropertyChange(true);
        group = this.getObject(group.id);
        //Removed isBlazor code
        var isHistoryAdded = (!(this.diagramActions & DiagramAction.UndoRedo) && !(this.diagramActions & DiagramAction.Group) &&
            !(this.diagramActions & DiagramAction.PreventHistory));
        if (isHistoryAdded) {
            this.startGroupAction();
        }
        var id = this.addChild(group, child);
        if (isHistoryAdded) {
            var childTable = {};
            childTable["" + id] = cloneObject(this.getObject(id));
            var entry = {
                type: 'AddChildToGroupNode', changeType: 'Insert', undoObject: cloneObject(group),
                redoObject: cloneObject(group), category: 'Internal', objectId: id, childTable: childTable
            };
            this.addHistoryEntry(entry);
            this.endGroupAction();
        }
        //880811- Adding child to group node using addChildToGroup method is not working properly.
        var element = this.nameTable[child] ? this.nameTable[child] : child;
        var childElementToMove = document.getElementById(element.id + '_groupElement');
        var targetGroupElement = document.getElementById(group.id + '_groupElement');
        if (targetGroupElement && childElementToMove) {
            targetGroupElement.appendChild(childElementToMove);
        }
        this.protectPropertyChange(propChange);
        this.enableServerDataBinding(severDataBind);
        this.updateSelector();
        //Removed isBlazor code.
    };
    /**
     * Removes the specified diagram object from the specified group node.
     *
     * @returns { void }     Removes the specified diagram object from the specified group node.\
     * @param {NodeModel} group - The group node to which the diagram object will be removed.
     * @param {string | NodeModel | ConnectorModel} child - The diagram object to be removed from the group.
     */
    Diagram.prototype.removeChildFromGroup = function (group, child) {
        var severDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        var propChange = this.isProtectedOnChange;
        this.protectPropertyChange(true);
        group = this.getObject(group.id);
        var undoGroup = cloneObject(group);
        var isHistoryAdded = (!(this.diagramActions & DiagramAction.UndoRedo) && !(this.diagramActions & DiagramAction.Group) &&
            !(this.diagramActions & DiagramAction.PreventHistory));
        if (isHistoryAdded) {
            this.startGroupAction();
        }
        var id = this.removeChild(group, child);
        if (isHistoryAdded) {
            var childTable = {};
            childTable["" + id] = cloneObject(this.getObject(id));
            var entry = {
                type: 'RemoveChildFromGroupNode', changeType: 'Remove', undoObject: cloneObject(undoGroup),
                redoObject: cloneObject(group), category: 'Internal', objectId: id, childTable: childTable
            };
            this.addHistoryEntry(entry);
            this.endGroupAction();
        }
        //880811 - diagram elements not updated properly while grouping nodes at runtime
        var element = this.nameTable[child] ? this.nameTable[child] : child;
        var elementZindex = element.zIndex;
        var layerNum = this.layers.indexOf(this.commandHandler.getObjectLayer(element.id));
        var insertBeforeObj = this.layers[parseInt(layerNum.toString(), 10)].objects[elementZindex + 1];
        var insertBeforeElement = document.getElementById(insertBeforeObj + '_groupElement');
        var childElementToMove = document.getElementById(element.id + '_groupElement');
        var targetGroupElement = document.getElementById(group.id + '_groupElement');
        if (targetGroupElement && childElementToMove) {
            if (insertBeforeObj && insertBeforeElement) {
                if (targetGroupElement.contains(insertBeforeElement)) {
                    targetGroupElement.insertBefore(childElementToMove, insertBeforeElement);
                }
                else if (targetGroupElement.parentNode.contains(insertBeforeElement) && insertBeforeElement.parentElement
                    === targetGroupElement.parentElement) {
                    targetGroupElement.parentNode.insertBefore(childElementToMove, insertBeforeElement);
                }
                else {
                    targetGroupElement.parentNode.appendChild(childElementToMove);
                }
            }
            else {
                targetGroupElement.parentNode.appendChild(childElementToMove);
            }
        }
        this.protectPropertyChange(propChange);
        this.enableServerDataBinding(severDataBind);
        this.updateSelector();
    };
    /**
     * Retrieves the history stack values for either undo or redo actions.
     *
     * @returns { void } Retrieves the history stack values for either undo or redo actions.\
     * @param {boolean} isUndoStack - If `true`, retrieves the undo stack values; if `false`, retrieves the redo stack values.
     */
    Diagram.prototype.getHistoryStack = function (isUndoStack) {
        //let temp: HistoryEntry[];
        var historyEntry = [];
        var temp = isUndoStack ? this.historyManager.undoStack : this.historyManager.redoStack;
        if (this.historyManager.stackLimit !== undefined) {
            for (var i = temp.length - 1; i >= 0; i--) {
                historyEntry.push(temp[parseInt(i.toString(), 10)]);
                if (historyEntry.length > this.historyManager.stackLimit) {
                    return historyEntry;
                }
            }
        }
        else {
            historyEntry = temp;
        }
        return historyEntry;
    };
    /* tslint:disable */
    /**
     * Returns the edges connected to the given node.
     *
     * @returns { string[] } Returns the edges connected to the given node. \
     * @deprecated
     * @param {Object} args - An object containing information about the node for which edges are to be retrieved.
     */
    Diagram.prototype.getEdges = function (args) {
        return args['outEdge'] ? this.nameTable[args['id']].outEdges : this.nameTable[args['id']].inEdges;
    };
    /* tslint:enable */
    /**
     * Returns the parent id for the node
     *
     * @returns { string }Returns the parent id for the node .\
     * @deprecated
     * @param {string} id - returns the parent id
     */
    Diagram.prototype.getParentId = function (id) {
        return this.nameTable["" + id].parentId;
    };
    /**
     * Adds the given connector to diagram control
     * @returns { Connector } Adds the given connector to diagram control .\
     *
     * @param {ConnectorModel} obj - Defines the connector that has to be added to diagram
     * @blazorArgsType obj|DiagramConnector
     */
    Diagram.prototype.addConnector = function (obj) {
        return this.add(obj);
    };
    /* eslint-disable */
    /** @private */
    Diagram.prototype.UpdateBlazorDiagramModelCollection = function (obj, copiedObject, multiSelectDelete, isBlazorGroupUpdate) {
        /* eslint-enable */
        //Removed isBlazor code
    };
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
    Diagram.prototype.UpdateBlazorDiagramModel = function (obj, objectType, removalIndex, annotationNodeIndex) {
        //Removed isBlazor code
    };
    // eslint-disable-next-line max-len
    Diagram.prototype.UpdateBlazorLabelOrPortObjects = function (obj, objectType, removalIndex, nodeIndex) {
        //Removed isBlazor code
    };
    /**
     *  addBlazorDiagramObjects method
     *
     * @returns { void }  addBlazorDiagramObjects method .\
     *
     * @private
     */
    Diagram.prototype.addBlazorDiagramObjects = function () {
        //Removed isBlazor code
    };
    Diagram.prototype.removeNodeEdges = function (elementId, id, isOutEdges) {
        var node = this.nameTable["" + elementId];
        var edges = isOutEdges ? node.outEdges : node.inEdges;
        if (edges.length > 0) {
            for (var i = 0; i < edges.length; i++) {
                if (edges[parseInt(i.toString(), 10)] === id) {
                    edges.splice(i, 1);
                }
            }
        }
    };
    /**
     *  insertBlazorConnector method
     *
     * @returns { void }  insertBlazorConnector method .\
     * @param {Connector} obj - provide the nodeId value.
     *
     * @private
     */
    Diagram.prototype.insertBlazorConnector = function (obj) {
        //Removed isBlazor code
    };
    /* tslint:disable */
    /**
     * Adds the provided object, which can be a node, group, or connector, onto the diagram canvas.
     *
     * @returns { Node | Connector }     Adds the provided object, which can be a node, group, or connector, onto the diagram canvas.\
     * @param {NodeModel | ConnectorModel} obj - Specifies the object to be added to the diagram.
     * @param {boolean} group - If a group object is passed, set it to true.
     */
    Diagram.prototype.add = function (obj, group) {
        var newObj;
        var propertyChangeValue = this.isProtectedOnChange;
        this.protectPropertyChange(true);
        var isTextAnnotationNode = false;
        if (obj) {
            obj = cloneObject(obj);
            var args = void 0;
            args = {
                element: obj, cause: this.diagramActions, diagramAction: this.getDiagramAction(this.diagramActions), state: 'Changing', type: 'Addition', cancel: false
            };
            if (this.parentObject) {
                args.parentId = this.parentObject.id;
            }
            //Removed isBlazor code
            if (obj.id !== 'helper' && !(this.diagramActions & DiagramAction.PreventCollectionChangeOnDragOver)) {
                this.triggerEvent(DiagramEvent.collectionChange, args);
            }
            if (args.cancel && this.drawingObject) {
                this.removeElements(args.element);
                this.tooltipObject.close();
                var sourceNodee = this.getObject(args.element.sourceID);
                var isOutEdgee = void 0;
                if (getObjectType(args.element) === Connector) {
                    if (args.element.sourceID) {
                        this.removeNodeEdges(args.element.sourceID, args.element.id, true);
                        if (sourceNodee.ports.length > 0) {
                            for (var i = 0; i < sourceNodee.ports.length; i++) {
                                var port = sourceNodee.ports[parseInt(i.toString(), 10)];
                                if (port.id === args.element.sourcePortID) {
                                    if (port.outEdges.length > 0) {
                                        isOutEdgee = false;
                                    }
                                    else {
                                        isOutEdgee = true;
                                    }
                                }
                            }
                            this.removePortEdges(sourceNodee, args.element.sourcePortID, args.element.id, isOutEdgee);
                        }
                    }
                    if (args.element.targetID) {
                        this.removeNodeEdges(args.element.targetID, args.element.id, false);
                    }
                }
            }
            this.diagramActions = this.diagramActions | DiagramAction.PublicMethod;
            obj.id = obj.id || randomId();
            var layers = this.activeLayer;
            // Bug 890792: Exception thrown when adding a node at runtime in the unit test case.
            // The issue arises only when the diagram is not appended to the DOM. In such cases, the diagram will not be rendered, and the activeLayer property is undefined.
            // Check if activeLayer is defined. If activeLayer is defined, then proceed with the operation.
            if (!args.cancel && layers && !layers.lock) {
                if (layers.objects.indexOf(obj.id) < 0 && !layers.lock) {
                    if (!layers.visible) {
                        layers.visible = true;
                        this.dataBind();
                    }
                    layers.objects.push(obj.id);
                }
                if (getObjectType(obj) === Connector) {
                    newObj = new Connector(this, 'connectors', obj, true);
                    newObj.status = 'New';
                    if (this.nameTable[newObj.targetID] && this.nameTable[newObj.targetID].shape.shape === 'TextAnnotation') {
                        newObj.isBpmnAnnotationConnector = true;
                        newObj.constraints = newObj.constraints & ~ConnectorConstraints.Delete;
                    }
                    updateDefaultValues(newObj, obj, this.connectorDefaults);
                    this.connectors.push(newObj);
                    this.initObject(newObj);
                    //Removed isBlazor code
                    if (obj.visible === false) {
                        this.updateElementVisibility(newObj.wrapper, newObj, obj.visible);
                    }
                    this.updateEdges(newObj);
                    this.insertBlazorConnector(newObj);
                }
                else {
                    newObj = new Node(this, 'nodes', obj, true);
                    updateDefaultValues(newObj, obj, this.nodeDefaults);
                    newObj.parentId = (obj.parentId) ? obj.parentId : newObj.parentId;
                    newObj.umlIndex = obj.umlIndex;
                    newObj.status = 'New';
                    isTextAnnotationNode = newObj.shape.shape === 'TextAnnotation';
                    if (isTextAnnotationNode && !obj.isTextAnnotationCopied) {
                        newObj.inEdges = obj.inEdges ? obj.inEdges : newObj.inEdges;
                    }
                    this.nodes.push(newObj);
                    this.initObject(newObj, layers, undefined, group);
                    if (isTextAnnotationNode) {
                        if (this.bpmnModule) {
                            for (var i = 0; i < this.bpmnModule.bpmnTextAnnotationConnector.length; i++) {
                                if (this.bpmnModule.bpmnTextAnnotationConnector[parseInt(i.toString(), 10)].wrapper === null) {
                                    this.initConnectors(this.bpmnModule.bpmnTextAnnotationConnector[parseInt(i.toString(), 10)], undefined, true);
                                }
                            }
                        }
                    }
                    //Removed isBlazor code
                    this.updateTemplate();
                    if (this.bpmnModule) {
                        if (newObj.shape.activity && newObj.shape.activity.subProcess.processes &&
                            newObj.shape.activity.subProcess.processes.length) {
                            this.bpmnModule.updateDocks(newObj, this);
                        }
                    }
                    if (this.lineRoutingModule && (this.constraints & DiagramConstraints.LineRouting)) {
                        var objects = this.spatialSearch.findObjects(newObj.wrapper.outerBounds);
                        for (var i = 0; i < objects.length; i++) {
                            var object = objects[parseInt(i.toString(), 10)];
                            if (object instanceof Connector) {
                                this.connectorPropertyChange(object, {}, {
                                    sourceID: object.sourceID, targetID: object.targetID, sourcePortID: object.sourcePortID,
                                    targetPortID: object.targetPortID, sourcePoint: object.sourcePoint, targetPoint: object.targetPoint
                                });
                            }
                        }
                    }
                    else if (this.constraints & DiagramConstraints.LineRouting) {
                        console.warn('[WARNING] :: Module "LineRouting" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
                    }
                    if (newObj.umlIndex > -1 && obj.parentId && this.nameTable[obj.parentId] &&
                        this.nameTable[obj.parentId].shape.type === 'UmlClassifier') {
                        var parent_2 = this.nameTable[obj.parentId];
                        parent_2.children.splice(newObj.umlIndex, 0, newObj.id);
                        parent_2.wrapper.children.splice(newObj.umlIndex, 0, newObj.wrapper);
                        parent_2.wrapper.measure(new Size());
                        parent_2.wrapper.arrange(parent_2.wrapper.desiredSize);
                        this.updateDiagramObject(parent_2);
                    }
                }
                args = {
                    element: newObj, cause: this.diagramActions, diagramAction: this.getDiagramAction(this.diagramActions), state: 'Changed', type: 'Addition', cancel: false
                };
                if (this.parentObject) {
                    args.parentId = this.parentObject.id;
                }
                //Removed isBlazor code
                if (obj.id !== 'helper' && !(this.diagramActions & DiagramAction.PreventCollectionChangeOnDragOver)) {
                    this.triggerEvent(DiagramEvent.collectionChange, args);
                }
                if (!(this.diagramActions & DiagramAction.UndoRedo) && !(this.diagramActions & DiagramAction.Group) &&
                    !(this.diagramActions & DiagramAction.PreventHistory)) {
                    var entry = {
                        type: 'CollectionChanged', changeType: 'Insert', undoObject: cloneObject(obj),
                        redoObject: cloneObject(obj), category: 'Internal'
                    };
                    this.addHistoryEntry(entry);
                }
                this.parentObject = undefined;
                if (this.mode === 'SVG') {
                    this.updateSvgNodes(newObj);
                    this.updateTextElementValue(newObj);
                    this.updateDiagramObject(newObj);
                    if (isTextAnnotationNode) {
                        var con = this.nameTable[newObj.inEdges[0]];
                        this.updateDiagramObject(con);
                    }
                    if (newObj.shape.activity && newObj.shape.activity.subProcess.processes &&
                        newObj.shape.activity.subProcess.processes.length) {
                        this.updateProcesses(newObj);
                    }
                    this.updateBridging();
                }
            }
        }
        this.protectPropertyChange(propertyChangeValue);
        this.resetDiagramActions(DiagramAction.PublicMethod);
        if (newObj && this.layers.length > 1) {
            this.moveNode(newObj);
        }
        // Bug 890792: Exception thrown when adding a node at runtime in the unit test case.
        // The issue arises only when the diagram is not appended to the DOM. In such cases, the diagram will not be rendered, and the views property is undefined.
        // Check if views is defined before iterating. If views is defined, then refresh the canvas for each view.
        if (this.views) {
            for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
                var temp = _a[_i];
                var view = this.views["" + temp];
                if (!(view instanceof Diagram)) {
                    this.refreshCanvasDiagramLayer(view);
                }
            }
        }
        this.renderReactTemplates();
        return newObj;
    };
    /**
     * AddElements method allows us to add diagram elements such as nodes and connectors as a collection into the diagram canvas.
     * @returns {void} -AddElements method.
     * @param { NodeModel[] | ConnectorModel[]} obj -Specifies the colelction object to be added to the diagram.
     * @public method
     **/
    Diagram.prototype.addElements = function (obj) {
        for (var i = 0; i < obj.length; i++) {
            this.add(obj[parseInt(i.toString(), 10)]);
        }
        // 930450: Diagram Taking Too Long to Load Due to Complex Hierarchical Tree Layout with Path Nodes
        if (this.pathDataStorage) {
            this.pathDataStorage.clear();
        }
    };
    /**
     * getPathdata from path data storage to access the path elements points
     * @returns {PointModel[]} - Ruturns points of the path data
     * @param {string} key - Path data as key
     *
     * @private
     */
    Diagram.prototype.getPathData = function (key) {
        // 930450: Diagram Taking Too Long to Load Due to Complex Hierarchical Tree Layout with Path Nodes
        if (!this.pathDataStorage) {
            this.pathDataStorage = new Map();
        }
        if (!this.pathDataStorage.has(key)) {
            return [];
        }
        return this.pathDataStorage.get(key);
    };
    /**
     * setPathdata to path data storage to access the path elements points
     * @returns {void} - Set Path data method
     * @param {string} key - Path data as key
     * @param {PointModel[]} data - Path data's points
     *
     * @private
     */
    Diagram.prototype.setPathData = function (key, data) {
        // 930450: Diagram Taking Too Long to Load Due to Complex Hierarchical Tree Layout with Path Nodes
        var existingData = this.pathDataStorage.get(key) || [];
        // Push data only if existingData is empty
        if (existingData.length === 0) {
            this.pathDataStorage.set(key, data);
        }
    };
    /* tslint:enable */
    Diagram.prototype.updateSvgNodes = function (node) {
        if (node.children) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var j = _a[_i];
                if (this.nameTable["" + j] && this.nameTable["" + j].parentId) {
                    var child = getDiagramElement(j + '_groupElement', this.element.id);
                    if (child) {
                        child.parentNode.removeChild(child);
                    }
                }
            }
        }
    };
    /**
     *  updateProcesses method
     *
     * @returns { void }  updateProcesses method .\
     * @param {(Node | Connector)} node - provide the nodeId value.
     *
     * @private
     */
    Diagram.prototype.updateProcesses = function (node) {
        if (this.bpmnModule && node && node.shape && node.shape.activity &&
            node.shape.activity.subProcess.processes &&
            node.shape.activity.subProcess.processes.length) {
            var processes = node.shape.activity.subProcess.processes;
            this.moveSvgNode(node.id);
            for (var _i = 0, processes_1 = processes; _i < processes_1.length; _i++) {
                var j = processes_1[_i];
                this.moveSvgNode(j);
                var edges = [];
                edges = edges.concat(this.nameTable["" + j].outEdges, this.nameTable["" + j].inEdges);
                for (var i = edges.length - 1; i >= 0; i--) {
                    this.moveSvgNode(edges[parseInt(i.toString(), 10)]);
                }
            }
            for (var _a = 0, processes_2 = processes; _a < processes_2.length; _a++) {
                var j = processes_2[_a];
                if (this.nameTable["" + j].shape.activity.subProcess.processes &&
                    this.nameTable["" + j].shape.activity.subProcess.processes.length) {
                    this.updateProcesses(this.nameTable["" + j]);
                }
            }
        }
        else {
            this.moveSvgNode(node.id);
        }
    };
    /**
     *  moveSvgNode method
     *
     * @returns { void }  moveSvgNode method .\
     * @param {string} nodeId - provide the nodeId value.
     *
     * @private
     */
    Diagram.prototype.moveSvgNode = function (nodeId) {
        var child = getDiagramElement(nodeId + '_groupElement', this.element.id);
        var parent = child.parentElement;
        child.parentNode.removeChild(child);
        parent.appendChild(child);
    };
    /**
     * Adds the given annotation to the specified node.
     *
     * @returns { void } Adds the given annotation to the specified node.\
     * @param {BpmnAnnotationModel} annotation - Object representing the annotation to be added.
     * @param {NodeModel} node - object representing the node to which the annotation will be added.
     * @deprecated
     */
    Diagram.prototype.addTextAnnotation = function (annotation, node) {
        if (this.bpmnModule) {
            this.getBPMNTextAnnotation(node, this, annotation, true);
        }
    };
    //Splice the InEdge and OutEdge of the for the node with respect to corresponding connectors that is deleting
    Diagram.prototype.spliceConnectorEdges = function (connector, isSource) {
        //let node: Node;
        var edges = [];
        //let isInEdge: boolean;
        var node = isSource ? this.nameTable[connector.sourceID] : this.nameTable[connector.targetID];
        if (node) {
            edges = isSource ? node.outEdges : node.inEdges;
            for (var i = edges.length - 1; i >= 0; i--) {
                if (edges[parseInt(i.toString(), 10)] === connector.id) {
                    edges.splice(i, 1);
                }
            }
            for (var j = 0; node.ports && j < node.ports.length; j++) {
                var isInEdge = isSource ? false : true;
                this.removePortEdges(node, node.ports[parseInt(j.toString(), 10)].id, connector.id, isInEdge);
            }
        }
    };
    /**
     * Remove the dependent connectors if the node is deleted
     * @returns { void } Remove the dependent connectors if the node is deleted .\
     * @param {Node} obj - provide the node value.
     *
     * @private
     */
    Diagram.prototype.removeDependentConnector = function (obj) {
        if (obj) {
            var connector = void 0;
            var edges = [];
            edges = edges.concat(obj.outEdges, obj.inEdges);
            for (var i = edges.length - 1; i >= 0; i--) {
                connector = this.nameTable[edges[parseInt(i.toString(), 10)]];
                if (connector) {
                    this.connectorTable[connector.id] = cloneObject(connector);
                    //To check for text annotation connector and remove the dependent text annotation node.
                    if (connector.isBpmnAnnotationConnector) {
                        var targetNode = this.nameTable[connector.targetID];
                        this.removeObjectsFromLayer(connector);
                        var index = this.connectors.indexOf(connector);
                        if (index !== -1) {
                            this.connectors.splice(index, 1);
                        }
                        this.removeElements(connector);
                        this.removeFromAQuad(connector);
                        delete this.nameTable[connector.id];
                        var sourceNode = this.nameTable[connector.sourceID];
                        if (sourceNode) {
                            var index_1 = sourceNode.outEdges.indexOf(connector.id);
                            if (index_1 !== -1) {
                                sourceNode.outEdges.splice(index_1, 1);
                            }
                        }
                        if (obj.id !== connector.targetID) {
                            this.remove(targetNode);
                        }
                    }
                    else {
                        this.remove(connector);
                    }
                }
            }
        }
    };
    /**
     * Remove the dependent connectors if the node is deleted
     * @returns { void } Remove the dependent connectors if the node is deleted .\
     * @param {(NodeModel | ConnectorModel)} obj - provide the node value.
     *
     * @private
     */
    Diagram.prototype.removeObjectsFromLayer = function (obj) {
        if (obj.children) {
            for (var i = 0; i < obj.children.length; i++) {
                var object = this.nameTable[obj.children[parseInt(i.toString(), 10)]];
                if (object) {
                    this.removeObjectsFromLayer(object);
                }
            }
        }
        var layer = this.layers.indexOf(this.commandHandler.getObjectLayer(obj.id));
        var objects = this.layers[parseInt(layer.toString(), 10)].objects;
        var objIndex = objects.indexOf(obj.id);
        if (objIndex > -1) {
            this.commandHandler.updateLayersZindexTable(layer);
            if (isSelected(this, obj)) {
                this.unSelect(obj);
            }
            this.layers[parseInt(layer.toString(), 10)].objects.splice(objIndex, 1);
            delete this.layers[parseInt(layer.toString(), 10)].zIndexTable[this.nameTable[obj.id].zIndex];
        }
    };
    /**
     * removeElements method \
     *
     * @returns { string }     removeElements method .\
     * @param {NodeModel | ConnectorModel} currentObj - provide the currentObj value.
     *
     * @private
     */
    Diagram.prototype.removeElements = function (currentObj) {
        if (this.mode === 'SVG' || (this.mode === 'Canvas' && currentObj.shape.type === 'Native')) {
            var removeElement_1 = getDiagramElement(currentObj.id + '_groupElement', this.element.id);
            var object = currentObj;
            if ((object).ports && (object).ports.length > 0) {
                for (var i = 0; i < (object).ports.length; i++) {
                    var port = (object).ports[parseInt(i.toString(), 10)];
                    var removePort = getDiagramElement(object.id + '_' + port.id + '_groupElement', this.element.id);
                    if (removePort) {
                        removePort.parentNode.removeChild(removePort);
                    }
                }
            }
            if (removeElement_1) {
                removeElement_1.parentNode.removeChild(removeElement_1);
            }
        }
        this.refreshCanvasLayers();
        if (currentObj.wrapper) {
            var children = currentObj.wrapper.children;
            var element = void 0;
            var view = void 0;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    if (children[parseInt(i.toString(), 10)] instanceof DiagramNativeElement || ((children[parseInt(i.toString(), 10)].id) && (children[parseInt(i.toString(), 10)].id).indexOf('icon_content') > 0)) {
                        if ((children[parseInt(i.toString(), 10)].id).indexOf('icon_content') > 0 && this.mode === 'SVG') {
                            element = getDiagramElement(children[parseInt(i.toString(), 10)].id + '_shape_groupElement', this.element.id);
                            if (element) {
                                element.parentNode.removeChild(element);
                            }
                            element = getDiagramElement(children[parseInt(i.toString(), 10)].id + '_rect_groupElement', this.element.id);
                            if (element) {
                                element.parentNode.removeChild(element);
                            }
                        }
                        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
                            var elementId = _a[_i];
                            removeElement(children[parseInt(i.toString(), 10)].id + '_groupElement', elementId);
                            var nodeIndex = this.scroller.removeCollection.indexOf(currentObj.id);
                            this.scroller.removeCollection.splice(nodeIndex, 1);
                        }
                    }
                    else if (children[parseInt(i.toString(), 10)] instanceof DiagramHtmlElement) {
                        for (var _b = 0, _c = this.views; _b < _c.length; _b++) {
                            var elementId = _c[_b];
                            removeElement(currentObj.id + '_html_element', elementId);
                            removeElement(children[parseInt(i.toString(), 10)].id + '_html_element', elementId);
                            //EJ2-63598 - Added below code to check whether platform is Angular or not.
                            // If angular then we do not remove the node html element wrapper to retain the HTML element in it.
                            var canUpdate = true;
                            var parent_3 = this.nameTable[currentObj.parentId];
                            //893691: HTML Template nodes are not visible after Zooming with Virtualisation
                            if (((this.isAngular || this.isReact) || this.isVue) &&
                                ((parent_3 && parent_3.isLane) || (this.constraints & DiagramConstraints.Virtualization))) {
                                canUpdate = false;
                            }
                            if (canUpdate) {
                                this.clearTemplate(['nodeTemplate' + '_' + currentObj.id]);
                                if (children[parseInt(i.toString(), 10)].annotationId) {
                                    this.clearTemplate(['annotationTemplate' + '_' + currentObj.id +
                                            (children[parseInt(i.toString(), 10)].annotationId)]);
                                }
                            }
                        }
                    }
                    removeGradient(children[parseInt(i.toString(), 10)].id);
                }
            }
        }
    };
    Diagram.prototype.removeCommand = function () {
        this.remove();
    };
    /**
     * Removes the specified object from the diagram.
     *
     * @param {NodeModel | ConnectorModel} obj - The node or connector object to be removed from the diagram.
     */
    /* tslint:disable */
    Diagram.prototype.remove = function (obj) {
        var selectedItems = [];
        selectedItems = selectedItems.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        var args;
        var groupAction = false;
        if (obj) {
            obj = this.nameTable[obj.id];
            this.insertBlazorConnector(obj);
            if (obj && (canDelete(obj) || (this.diagramActions & DiagramAction.Clear))) {
                args = {
                    element: obj, cause: this.diagramActions, diagramAction: this.getDiagramAction(this.diagramActions),
                    state: 'Changing', type: 'Removal', cancel: false
                };
                //Removed isBlazor code
                if (!(this.diagramActions & DiagramAction.Clear) && (obj.id !== 'helper')) {
                    this.triggerEvent(DiagramEvent.collectionChange, args);
                }
                if (!args.cancel) {
                    if (canDelete(obj)) {
                        if (obj && obj.shape && obj.shape.type === 'SwimLane') {
                            removeSwimLane(this, obj);
                        }
                    }
                    if ((!(this.diagramActions & DiagramAction.UndoRedo)) && !(this.diagramActions & DiagramAction.PreventHistory) &&
                        (obj instanceof Node || obj instanceof Connector)) {
                        var entry = {
                            type: 'CollectionChanged', changeType: 'Remove', undoObject: cloneObject(obj),
                            redoObject: cloneObject(obj), category: 'Internal'
                        };
                        if (!(this.diagramActions & DiagramAction.Clear)) {
                            if (obj.children && !obj.isLane && !obj.isPhase && obj.children.length > 0 && this.undoRedoModule && this.layout.type === 'None') {
                                this.historyManager.startGroupAction();
                                groupAction = true;
                            }
                        }
                        //875087 - Restrict removing dependent connectors when moveing between layers
                        if ((obj instanceof Node || obj instanceof Connector) && this.deleteDependentConnector) {
                            this.removeDependentConnector(obj);
                        }
                        if (!obj.isLane && !obj.isPhase) {
                            if (!(this.diagramActions & DiagramAction.Clear) && !this.isStackChild(obj)) {
                                this.addHistoryEntry(entry);
                            }
                        }
                    }
                    if (obj.shape.shape === 'TextAnnotation') {
                        this.removeDependentConnector(obj);
                    }
                    if (obj.children && !obj.isLane && !obj.isPhase &&
                        (!(this.diagramActions & DiagramAction.UndoRedo) || !isBlazor())) {
                        this.deleteGroup(obj);
                    }
                    if (obj.parentId) {
                        this.deleteChild(obj, undefined, true);
                        if (this.nameTable[obj.parentId] && this.nameTable[obj.parentId].shape.type === 'UmlClassifier') {
                            this.updateDiagramObject(this.nameTable[obj.parentId]);
                            this.updateConnectorEdges(this.nameTable[obj.parentId]);
                        }
                    }
                    var index = void 0;
                    this.diagramActions = this.diagramActions | DiagramAction.PublicMethod;
                    var currentObj = this.nameTable[obj.id];
                    if (currentObj instanceof Node) {
                        if (currentObj.shape.type === 'Bpmn' && this.bpmnModule) {
                            this.bpmnModule.removeBpmnProcesses(currentObj, this);
                        }
                        if (currentObj.isLane || currentObj.isPhase || currentObj.shape.type === 'SwimLane') {
                            var swimLaneNode = (currentObj.isLane || currentObj.isPhase) ?
                                this.nameTable[currentObj.parentId] : this.nameTable[currentObj.id];
                            var grid = swimLaneNode.wrapper.children[0];
                            if (currentObj.isLane) {
                                removeLane(this, currentObj, swimLaneNode);
                            }
                            else if (currentObj.isPhase) {
                                removePhase(this, currentObj, swimLaneNode);
                            }
                        }
                        index = this.nodes.indexOf(currentObj);
                        // Removed isBlazor code
                        if (index !== -1) {
                            this.crudDeleteNodes.push(this.nameTable[currentObj.id]);
                            this.nodes.splice(index, 1);
                            this.updateNodeEdges(currentObj);
                        }
                    }
                    else {
                        index = this.connectors.indexOf(currentObj);
                        //Removed isBlazor code
                        if (index !== -1) {
                            this.crudDeleteNodes.push(this.nameTable[currentObj.id]);
                            this.connectors.splice(index, 1);
                        }
                        this.updateEdges(currentObj);
                        this.spliceConnectorEdges(obj, true);
                        this.spliceConnectorEdges(obj, false);
                    }
                    if ((!this.isServerUpdate) && !(this.blazorActions & BlazorAction.GroupClipboardInProcess)) {
                        this.commandHandler.getBlazorOldValues();
                    }
                    if (groupAction) {
                        this.historyManager.endGroupAction();
                    }
                    if (isSelected(this, currentObj)) {
                        this.unSelect(currentObj);
                    }
                    if (!currentObj.isPhase) {
                        this.removeObjectsFromLayer(obj);
                        if (this.currentDrawingObject) {
                            this.currentDrawingObject.wrapper = undefined;
                        }
                        delete this.nameTable[obj.id];
                        if (selectedItems.length > 0 && selectedItems[0].id === currentObj.id && currentObj.parentId) {
                            var parentnode = this.nameTable[currentObj.parentId];
                            if (parentnode && parentnode.isLane && this.nameTable[parentnode.parentId].shape.type === 'SwimLane') {
                                var swimLaneNode = this.nameTable[parentnode.parentId];
                                removeLaneChildNode(this, swimLaneNode, parentnode, currentObj);
                            }
                        }
                        this.removeElements(currentObj);
                        this.updateBridging();
                        if (this.mode !== 'SVG') {
                            this.refreshDiagramLayer();
                        }
                        if (!(this.diagramActions & DiagramAction.Clear)) {
                            this.removeFromAQuad(currentObj);
                            args = {
                                element: obj, cause: this.diagramActions, diagramAction: this.getDiagramAction(this.diagramActions),
                                state: 'Changed', type: 'Removal', cancel: false
                            };
                            //Removed isBlazor code
                            if (obj.id !== 'helper') {
                                this.triggerEvent(DiagramEvent.collectionChange, args);
                            }
                            this.resetTool();
                        }
                    }
                }
            }
        }
        else if (selectedItems.length > 0) {
            if (this.undoRedoModule) {
                this.historyManager.startGroupAction();
                this.blazorActions |= BlazorAction.GroupingInProgress;
                groupAction = true;
            }
            //Removed isBlazor code
            for (var i = 0; i < selectedItems.length; i++) {
                var node = selectedItems[parseInt(i.toString(), 10)];
                var parent_4 = this.nameTable[node.parentId];
                if (this.nameTable[selectedItems[parseInt(i.toString(), 10)].id]) {
                    //Removed isBlazor code
                    // 912905: Multi-selecting and deleting swimlane objects causes the diagram to break
                    if (parent_4 && parent_4.shape instanceof SwimLane && !node.isPhase) {
                        if (node.isLane) {
                            var parentHeader = parent_4.shape.header.id ? parent_4.shape.header.height : 0;
                            if ((this.selectedItems.wrapper.bounds.x <= parent_4.wrapper.bounds.x &&
                                this.selectedItems.wrapper.bounds.width >= parent_4.wrapper.bounds.width &&
                                parent_4.shape.orientation === 'Horizontal') ||
                                (this.selectedItems.wrapper.bounds.y <= parent_4.wrapper.bounds.y + parentHeader &&
                                    this.selectedItems.wrapper.bounds.height >= parent_4.wrapper.bounds.height - parentHeader &&
                                    parent_4.shape.orientation === 'Vertical')) {
                                if (canDelete(parent_4) || parent_4.shape.lanes.length > 1) {
                                    this.remove(selectedItems[parseInt(i.toString(), 10)]);
                                }
                            }
                        }
                    }
                    else {
                        this.remove(selectedItems[parseInt(i.toString(), 10)]);
                    }
                    //Removed isBlazor code
                }
            }
            if (groupAction) {
                this.blazorActions &= ~BlazorAction.GroupingInProgress;
                this.isServerUpdate = true;
                this.commandHandler.getBlazorOldValues();
                this.UpdateBlazorDiagramModelCollection(undefined, undefined, undefined, true);
                this.historyManager.endGroupAction();
                this.isServerUpdate = false;
            }
            this.clearSelection();
        }
        if (!(obj && (canDelete(obj) || (this.diagramActions & DiagramAction.Clear)))) {
            if ((!(this.diagramActions & DiagramAction.UndoRedo)) && !(this.diagramActions & DiagramAction.PreventHistory) &&
                (obj instanceof Node || obj instanceof Connector)) {
                var entry = {
                    type: 'ConnectionChanged', undoObject: cloneObject(obj),
                    redoObject: cloneObject(obj), category: 'Internal'
                };
                if (!obj.isLane && !obj.isPhase) {
                    if (!(this.diagramActions & DiagramAction.Clear) && !this.isStackChild(obj)) {
                        this.addHistoryEntry(entry);
                    }
                }
            }
        }
        this.tooltipObject.close();
        if (obj && obj.id !== 'helper' && this.lineRoutingModule && (this.constraints & DiagramConstraints.LineRouting) &&
            (obj instanceof Node) && (this.layout.type !== 'ComplexHierarchicalTree')) {
            var INFLATE_MARGIN = 40;
            var nodeBounds = getBounds(obj.wrapper);
            nodeBounds.Inflate(INFLATE_MARGIN);
            var nearbyObjects = this.spatialSearch.findObjects(nodeBounds);
            this.lineRoutingModule.renderVirtualRegion(this, true);
            for (var _i = 0, nearbyObjects_1 = nearbyObjects; _i < nearbyObjects_1.length; _i++) {
                var item = nearbyObjects_1[_i];
                if (item instanceof Connector && item.type === 'Orthogonal') {
                    this.lineRoutingModule.refreshConnectorSegments(this, item, true);
                }
            }
        }
    };
    /* tslint:enable */
    Diagram.prototype.isStackChild = function (obj) {
        var isstack;
        var parent = this.nameTable[obj.parentId];
        if (obj && obj.parentId && parent.container &&
            (parent.container.type === 'Stack' &&
                this.nameTable[obj.parentId].shape.type !== 'UmlClassifier')) {
            isstack = true;
            var redoElement = {
                sourceIndex: parent.wrapper.children.indexOf(obj.wrapper), source: obj,
                target: undefined, targetIndex: undefined
            };
            var entry = {
                type: 'StackChildPositionChanged', redoObject: {
                    sourceIndex: undefined, source: obj,
                    target: undefined, targetIndex: undefined
                },
                undoObject: redoElement,
                category: 'Internal'
            };
            if (!(this.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(entry);
            }
        }
        return isstack;
    };
    /** @private */
    Diagram.prototype.deleteChild = function (node, parentNode, allowChildInSwimlane) {
        var id;
        parentNode = parentNode ? this.nameTable[parentNode.id] : this.nameTable[node.parentId];
        if (typeof node === 'string') {
            id = node;
        }
        else {
            id = node.id;
        }
        if (parentNode && parentNode.children) {
            for (var i = 0; i < parentNode.children.length; i++) {
                if (parentNode.children[parseInt(i.toString(), 10)] === id) {
                    parentNode.children.splice(i, 1);
                    for (var j = 0; j < parentNode.wrapper.children.length; j++) {
                        if (parentNode.wrapper.children[parseInt(j.toString(), 10)].id === id) {
                            parentNode.wrapper.children.splice(j, 1);
                        }
                    }
                    // Bug 841849: Swimlane child are not positioned properly and throw exception after deleting and then undoing.
                    // Added below condition to skip the child deletion inside swimlane when we add phase at runtime and delete swimlane.
                    if (!allowChildInSwimlane) {
                        // EJ2-57179 - Below lines added to remove the childs to swimlane after Redo.
                        var swimlaneNode = this.getObject(parentNode.parentId);
                        if (swimlaneNode && swimlaneNode.shape instanceof SwimLane) {
                            for (var h = 0; h < swimlaneNode.shape.lanes.length; h++) {
                                var laneId = node.parentId.split(swimlaneNode.id);
                                if (swimlaneNode.shape.lanes[parseInt(h.toString(), 10)].id
                                    === laneId[1].slice(0, -1)) {
                                    for (var y = 0; y < swimlaneNode.shape.lanes[parseInt(h.toString(), 10)].children.length; y++) {
                                        if (node.id ===
                                            swimlaneNode.shape.lanes[parseInt(h.toString(), 10)].children[parseInt(y.toString(), 10)].id) {
                                            swimlaneNode.shape.lanes[parseInt(h.toString(), 10)].children.splice(y, 1);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            parentNode.wrapper.measure(new Size());
            parentNode.wrapper.arrange(parentNode.wrapper.desiredSize);
        }
    };
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
    Diagram.prototype.addChild = function (node, child, index) {
        var id;
        var parentNode = this.nameTable[node.id];
        if (!parentNode.children) {
            parentNode.children = [];
        }
        if (parentNode.children) {
            if (typeof child === 'string') {
                if (this.nameTable["" + child]) {
                    id = child;
                }
            }
            else {
                id = child.id = child.id || randomId();
                this.add(child);
            }
            if (id && (!child.umlIndex || child.umlIndex === -1)) {
                var childNode = this.nameTable["" + id];
                childNode.parentId = parentNode.id;
                if (parentNode.container && parentNode.container.type === 'Stack') {
                    this.updateStackProperty(parentNode, childNode);
                }
                if (index) {
                    parentNode.children.splice(index, 0, id);
                    parentNode.wrapper.children.splice(index, 0, childNode.wrapper);
                }
                else {
                    parentNode.children.push(id);
                    parentNode.wrapper.children.push(childNode.wrapper);
                    // SF-362880 - Below lines added for adding the childs to swimlane after Undo.
                    var swimlane = this.getObject(node.parentId);
                    var childAlreadyInCollection = false;
                    if (swimlane && swimlane.shape instanceof SwimLane) {
                        for (var h = 0; h < swimlane.shape.lanes.length; h++) {
                            var lane = findLane(parentNode, this);
                            if (swimlane.shape.lanes[parseInt(h.toString(), 10)].id === lane.id) {
                                //Bug 876330: After performing cut operations followed by an undo, lanes and nodes in the swimlane are not rendered properly.
                                // To avoid adding the child node multiple times in the collection.
                                for (var i = 0; i < swimlane.shape.lanes[parseInt(h.toString(), 10)].children.length; i++) {
                                    if (swimlane.shape.lanes[parseInt(h.toString(), 10)].children[parseInt(i.toString(), 10)].id === childNode.id) {
                                        childAlreadyInCollection = true;
                                        break;
                                    }
                                }
                                if (!childAlreadyInCollection) {
                                    swimlane.shape.lanes[parseInt(h.toString(), 10)].children.push(childNode);
                                }
                                break;
                            }
                        }
                    }
                }
                parentNode.wrapper.measure(new Size());
                parentNode.wrapper.arrange(parentNode.wrapper.desiredSize);
                if (!parentNode.isLane) {
                    this.nameTable[node.id].width = parentNode.wrapper.actualSize.width;
                    this.nameTable[node.id].height = parentNode.wrapper.actualSize.height;
                    this.nameTable[node.id].offsetX = parentNode.wrapper.offsetX;
                    this.nameTable[node.id].offsetY = parentNode.wrapper.offsetY;
                }
                if (parentNode.container !== undefined) {
                    childNode.offsetX = childNode.wrapper.offsetX;
                    childNode.offsetY = childNode.wrapper.offsetY;
                }
                if (!parentNode.parentId ||
                    (this.nameTable[parentNode.parentId] &&
                        this.nameTable[parentNode.parentId].shape.type !== 'SwimLane')) {
                    this.updateDiagramObject(parentNode);
                }
            }
        }
        return id;
    };
    /**
     * removeChild method \
     *
     * @returns { string }     removeChild method .\
     * @param {NodeModel} node - provide the node value.
     * @param {string | NodeModel | ConnectorModel} child - provide the child value.
     *
     * @private
     */
    Diagram.prototype.removeChild = function (node, child) {
        var id;
        var parentNode = this.nameTable[node.id];
        if (!parentNode.children) {
            parentNode.children = [];
        }
        if (parentNode.children) {
            if (typeof child === 'string') {
                if (this.nameTable["" + child]) {
                    id = child;
                }
            }
            else {
                id = child.id = child.id || randomId();
            }
            if (id && (!child.umlIndex || child.umlIndex === -1)) {
                var childNode = this.nameTable["" + id];
                childNode.parentId = '';
                if (parentNode.container && parentNode.container.type === 'Stack') {
                    this.updateStackProperty(parentNode, childNode);
                }
                for (var i = 0; i < parentNode.children.length; i++) {
                    if (parentNode.children[parseInt(i.toString(), 10)] === id) {
                        parentNode.children.splice(i, 1);
                        for (var j = 0; j < parentNode.wrapper.children.length; j++) {
                            if (parentNode.wrapper.children[parseInt(j.toString(), 10)] === childNode.wrapper) {
                                parentNode.wrapper.children.splice(j, 1);
                            }
                        }
                    }
                }
                parentNode.wrapper.measure(new Size());
                parentNode.wrapper.arrange(parentNode.wrapper.desiredSize);
                if (!parentNode.isLane) {
                    this.nameTable[node.id].width = parentNode.wrapper.actualSize.width;
                    this.nameTable[node.id].height = parentNode.wrapper.actualSize.height;
                    this.nameTable[node.id].offsetX = parentNode.wrapper.offsetX;
                    this.nameTable[node.id].offsetY = parentNode.wrapper.offsetY;
                }
                if (!parentNode.parentId ||
                    (this.nameTable[parentNode.parentId] &&
                        this.nameTable[parentNode.parentId].shape.type !== 'SwimLane')) {
                    this.updateDiagramObject(parentNode);
                }
            }
        }
        return id;
    };
    /**
     * Clears all nodes and objects in the diagram, effectively resetting the diagram to an empty state.
     *
     * @returns { void }     Clears all nodes and objects in the diagram, effectively resetting the diagram to an empty state.\
     * @deprecated
     */
    Diagram.prototype.clear = function () {
        this.clearObjects();
        this.clearLayers();
    };
    //Bug 872106: Layer object in diagram doesnot removed in clear method
    Diagram.prototype.clearLayers = function () {
        var layerCount = this.layers.length;
        for (var i = layerCount - 1; i >= 0; i--) {
            this.removeLayer(this.layers[parseInt(i.toString(), 10)].id);
        }
        //Create default layer
        var defaultLayer = {
            id: 'default_layer', visible: true, lock: false, objects: [], zIndex: 0,
            objectZIndex: -1, zIndexTable: {}
        };
        this.commandHandler.addLayer(defaultLayer, null, true);
        this.setActiveLayer(this.layers[this.layers.length - 1].id);
    };
    Diagram.prototype.clearObjects = function (collection) {
        var objects = [];
        if (!collection) {
            objects = objects.concat(this.nodes);
            objects = objects.concat(this.connectors);
        }
        else {
            objects = collection;
        }
        this.diagramActions = this.diagramActions | DiagramAction.Clear;
        // Removed isBlazor code
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var obj = objects_1[_i];
            if (this.nameTable[obj.id]) {
                this.remove(obj);
            }
        }
        this.diagramActions = this.diagramActions & ~DiagramAction.Clear;
        this.spatialSearch = new SpatialSearch(this.nameTable);
        this.initHistory();
    };
    Diagram.prototype.startEditCommad = function () {
        var laneHeader;
        var node = (this.selectedItems.nodes[0]) ? this.selectedItems.nodes[0] : undefined;
        if (node && node instanceof Node) {
            if (node.isLane && node.parentId) {
                var swimlane = this.nameTable[node.parentId];
                var lanes = swimlane.shape.lanes;
                var canvasId = (node.id.slice(swimlane.id.length));
                var currentParentId = canvasId.substring(0, canvasId.length - 1);
                for (var i = 0; i < lanes.length; i++) {
                    if (node.isLane && currentParentId === lanes[parseInt(i.toString(), 10)].id) {
                        laneHeader = this.nameTable[lanes[parseInt(i.toString(), 10)].header.id];
                    }
                }
            }
            else if (node.shape.type === 'SwimLane' && node.shape.header && node.shape.hasHeader) {
                var id = node.wrapper.children[0].rows[0].cells[0].children[0].id;
                laneHeader = this.nameTable["" + id];
            }
        }
        this.startTextEdit(laneHeader);
    };
    /* tslint:disable */
    /**
     * Initiate the editing mode for a specific annotation within a node or connector.
     *
     * @returns { void }  Initiate the editing mode for a specific annotation within a node or connector. \
     * @param {NodeModel | ConnectorModel} node - The node or connector containing the annotation to be edited.
     * @param {string} id - The ID of the annotation to be edited within the node or connector.
     */
    Diagram.prototype.startTextEdit = function (node, id) {
        if ((!canZoomPan(this) && !canMultiSelect(this)) || canSingleSelect(this)) {
            this.textEditing = true;
            var transform = this.scroller.transform;
            var scale = canZoomTextEdit(this) ? transform.scale : 1;
            var minWidth = 90;
            var text = void 0;
            var bounds = void 0;
            var attributes = void 0;
            var x = void 0;
            var y = void 0;
            var textWrapper = void 0;
            if (!node) {
                node = (this.selectedItems.nodes[0]) ? this.selectedItems.nodes[0] : this.selectedItems.connectors[0];
            }
            if (node) {
                //Removed isBlazor code
                //893031: Exception throws while double click on UML Classifier connector
                //Added the condition that the node is not an instance of a connector
                if (node.shape && node.shape.type === 'UmlClassifier' && !(node instanceof Connector)) {
                    node = this.nameTable[node.children[0]];
                }
                var bpmnAnnotation = false;
                if (!textWrapper) {
                    if (node.shape.type !== 'Text' && node.annotations.length === 0) {
                        if (!(node.constraints & NodeConstraints.ReadOnly)) {
                            this.activeLabel.isGroup = true;
                            this.startGroupAction();
                            this.addLabels(node, [{ id: randomId(), content: '' }]);
                        }
                    }
                    if (!id && ((node.shape.type !== 'Text' && node.annotations.length > 0) || (node.shape.type === 'Text'))) {
                        //(EJ2-840331)-Double click on node annotation will open the edit of invisible annotation
                        if (node.shape.type === 'Text') {
                            id = (node.wrapper.children[0].id).split('_')[1];
                        }
                        else {
                            for (var i = node.annotations.length - 1; i >= 0; i--) {
                                if (node.annotations[parseInt(i.toString(), 10)].visibility) {
                                    id = node.annotations[parseInt(i.toString(), 10)].id;
                                }
                            }
                        }
                    }
                    if (id) {
                        textWrapper = this.getWrapper(node.wrapper, id);
                    }
                }
                else {
                    bpmnAnnotation = true;
                }
                if (node && textWrapper && !(textWrapper instanceof DiagramHtmlElement) &&
                    (!enableReadOnly(textWrapper, node) || bpmnAnnotation)) {
                    var style = (textWrapper.style);
                    var maxWidth = void 0;
                    maxWidth = textWrapper.bounds.width < node.wrapper.bounds.width ? textWrapper.bounds.width : node.wrapper.bounds.width;
                    maxWidth = minWidth > maxWidth ? minWidth : maxWidth;
                    var textEditing = document.getElementById(this.element.id + '_editTextBoxDiv');
                    var textArea = document.getElementById(this.element.id + '_editBox');
                    text = textArea ? textArea.value : textWrapper.content;
                    this.activeLabel.text = text;
                    if (!textEditing && !textArea) {
                        textEditing = createHtmlElement('div', {});
                        textArea = createHtmlElement('textarea', {});
                        this.diagramCanvas.appendChild(textEditing);
                        textEditing.appendChild(textArea);
                        textArea.appendChild(document.createTextNode(text));
                    }
                    bounds = measureHtmlText(textWrapper.style, text, undefined, undefined, maxWidth);
                    if (bounds.isEmpty()) {
                        if (node.shape.type !== 'Text') {
                            bounds = new Size(findAnnotation(node, (textWrapper.id).split(node.id + '_')[1]).width || 50, textWrapper.style.fontSize);
                        }
                        else {
                            bounds = new Size((node.width > 50) ? 50 : node.width, textWrapper.style.fontSize);
                        }
                    }
                    if (node.parentId && this.nameTable[node.parentId].shape.type === 'UmlClassifier') {
                        bounds.width = node.wrapper.bounds.width - 20;
                        x = ((((node.wrapper.bounds.center.x + transform.tx) * transform.scale) - (bounds.width / 2) * scale) - 2.5);
                        y = ((((node.wrapper.bounds.center.y + transform.ty) * transform.scale) - (bounds.height / 2) * scale) - 3);
                        textWrapper.style.textAlign = 'Left';
                    }
                    else {
                        bounds.width = Math.max(bounds.width, 50);
                        x = ((((textWrapper.bounds.center.x + transform.tx) * transform.scale) - (bounds.width / 2) * scale) - 2.5);
                        y = ((((textWrapper.bounds.center.y + transform.ty) * transform.scale) - (bounds.height / 2) * scale) - 3);
                    }
                    attributes = {
                        'id': this.element.id + '_editTextBoxDiv', 'style': 'position: absolute' + ';left:' + x + 'px;top:' +
                            y + 'px;width:' + ((bounds.width + 1) * scale) + 'px;height:' + (bounds.height * scale) +
                            'px; containerName:' + node.id + ';'
                    };
                    setAttributeHtml(textEditing, attributes);
                    //879137 - aria-label missing in annotation textEdit mode.
                    attributes = {
                        'aria-label': text, 'id': this.element.id + '_editBox', 'style': 'width:' + ((bounds.width + 1) * scale) +
                            'px;height:' + (bounds.height * scale) + 'px;resize: none;outline: none;overflow: hidden;' +
                            ';font-family:' + style.fontFamily +
                            ';font-size:' + (style.fontSize * scale) + 'px;text-align:' +
                            (textWrapper.style.textAlign.toLocaleLowerCase()) + ';', 'class': 'e-diagram-text-edit'
                    };
                    setAttributeHtml(textArea, attributes);
                    textArea.style.fontWeight = (style.bold) ? 'bold' : '';
                    textArea.style.fontStyle = (style.italic) ? 'italic' : '';
                    textArea.style.lineHeight = (style.fontSize * 1.2 + 'px;').toString();
                    textArea.style.textDecoration = (style.textDecoration) ? style.textDecoration : '';
                    this.activeLabel.parentId = node.id;
                    this.activeLabel.id = id;
                    textWrapper.visible = false;
                    this.updateDiagramObject(node);
                    this.diagramActions = this.diagramActions | DiagramAction.TextEdit;
                    if (!this.isTriggerEvent) {
                        EventHandler.add(textArea, 'input', this.eventHandler.inputChange, this.eventHandler);
                        EventHandler.add(textArea, 'focusout', this.focusOutEdit, this);
                        textArea.select();
                    }
                }
            }
        }
    };
    Diagram.prototype.updateConnectorfixedUserHandles = function (connector) {
        if (connector.fixedUserHandles.length) {
            var fixedUserHandleWrapper = void 0;
            for (var _i = 0, _a = connector.fixedUserHandles; _i < _a.length; _i++) {
                var fixedUserHandle = _a[_i];
                fixedUserHandleWrapper = this.getWrapper(connector.wrapper, fixedUserHandle.id);
                connector.updateAnnotation(fixedUserHandle, connector.intermediatePoints, connector.wrapper.bounds, fixedUserHandleWrapper);
            }
        }
        connector.wrapper.measure(new Size(connector.wrapper.width, connector.wrapper.height));
        connector.wrapper.arrange(connector.wrapper.desiredSize);
    };
    /* tslint:enable */
    Diagram.prototype.updateNodeExpand = function (node, visibility) {
        for (var i = 0; i < node.outEdges.length; i++) {
            var connector = this.nameTable[node.outEdges[parseInt(i.toString(), 10)]];
            var target = this.nameTable[connector.targetID];
            connector.visible = visibility;
            if (target) {
                if (!visibility) {
                    this.updateElementVisibility(connector.wrapper, connector, false);
                    target.isExpanded = visibility;
                }
                this.updateNodeExpand(target, target.isExpanded);
                target.visible = visibility;
                if (!visibility) {
                    this.updateElementVisibility(target.wrapper, target, false);
                }
            }
        }
    };
    Diagram.prototype.updateConnectorAnnotation = function (connector) {
        if (connector.annotations.length) {
            var annotationWrapper = void 0;
            for (var _i = 0, _a = connector.annotations; _i < _a.length; _i++) {
                var annotation = _a[_i];
                annotationWrapper = this.getWrapper(connector.wrapper, annotation.id);
                connector.updateAnnotation(annotation, connector.intermediatePoints, connector.wrapper.bounds, annotationWrapper, (this.diagramActions & DiagramAction.Interactions));
            }
        }
        connector.wrapper.measure(new Size(connector.wrapper.width, connector.wrapper.height));
        connector.wrapper.arrange(connector.wrapper.desiredSize);
    };
    Diagram.prototype.removeChildrenFromLayout = function (nodes) {
        var nodesCollection = [];
        var node;
        var parentId = 'parentId';
        var processId = 'processId';
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[parseInt(i.toString(), 10)];
            if (!node["" + parentId] && !node["" + processId]) {
                nodesCollection.push(node);
            }
        }
        return nodesCollection;
    };
    /* tslint:disable */
    /**
     * Automatically updates the diagram objects based on the type of the layout.
     * @returns { ILayout | boolean }  Automatically updates the diagram objects based on the type of the layout.\
     */
    Diagram.prototype.doLayout = function () {
        var update = false;
        var layout;
        var canDoOverlap = (this.layout.type === 'ComplexHierarchicalTree' || this.layout.type === 'HierarchicalTree');
        var propChange = this.isProtectedOnChange;
        this.protectPropertyChange(true);
        var nodes = this.removeChildrenFromLayout(this.nodes);
        var canEnableRouting = this.layout.enableRouting && this.layout.type === 'ComplexHierarchicalTree';
        var viewPort = { x: this.scroller.viewPortWidth, y: this.scroller.viewPortHeight };
        if (this.layout.type !== 'None') {
            if (this.organizationalChartModule || this.mindMapChartModule || this.radialTreeModule || this.symmetricalLayoutModule
                || this.complexHierarchicalTreeModule || this.flowchartLayoutModule) {
                // Trigger the layoutUpdated event with the state set to 'Started' and the current layout type.
                var args = { state: 'Started', type: this.layout.type };
                this.triggerEvent(DiagramEvent.layoutUpdated, args);
            }
            //Bug 862601: Connectors are not rendered properly with lineRouting and lineDistribution enables during doLayout process.
            //Removed initLineDistribution method call here and added it below after the complex hierarchical tree doLayout process.
            if (this.organizationalChartModule) {
                layout = this.organizationalChartModule.updateLayout(nodes, this.nameTable, this.layout, viewPort, this.dataSourceSettings.id, this.diagramActions);
                update = true;
                if (this.canDistribute(canEnableRouting, canDoOverlap)) {
                    this.lineDistributionModule.initLineDistribution(this.layout, this);
                }
                if (this.layoutAnimateModule && layout.rootNode && !this.diagramActions) {
                    this.updateNodeExpand(layout.rootNode, layout.rootNode.isExpanded);
                }
                // EJ2-58221 - added to render the layout properly based on parent node isExpanded property.
                else if (!this.layoutAnimateModule && layout.rootNode && !layout.rootNode.isExpanded && !this.canExpand) {
                    this.updateNodeExpand(layout.rootNode, layout.rootNode.isExpanded);
                }
            }
            else if (this.mindMapChartModule) {
                if (nodes && nodes.length > 0) {
                    this.mindMapChartModule.updateLayout(nodes, this.nameTable, this.layout, viewPort, this.dataSourceSettings.id, this.dataSourceSettings.root);
                }
                update = true;
            }
            else if (this.radialTreeModule) {
                this.radialTreeModule.updateLayout(nodes, this.nameTable, this.layout, viewPort);
                update = true;
            }
            else if (this.symmetricalLayoutModule) {
                this.symmetricalLayoutModule.maxIteration = this.layout.maxIteration;
                this.symmetricalLayoutModule.springLength = this.layout.springLength;
                this.symmetricalLayoutModule.springFactor = this.layout.springFactor;
                this.symmetricalLayoutModule.updateLayout(nodes, this.connectors, this.symmetricalLayoutModule, this.nameTable, this.layout, viewPort);
                update = true;
            }
            else if (this.complexHierarchicalTreeModule) {
                //Bug 862601: Connectors are not rendered properly with lineRouting and lineDistribution enables during doLayout process.
                //As the initLineDistribution method call removed from above and added below doLayout, we need to set diagram value and clear obstacle collection
                // of connectors.
                if (this.canDistribute(canEnableRouting, canDoOverlap)) {
                    this.lineDistributionModule.diagram = this;
                    var obstacleCollection_1 = 'obstaclePointCollection';
                    this.connectors.forEach(function (connector) {
                        connector["" + obstacleCollection_1] = [];
                    });
                }
                var nodes_1 = this.complexHierarchicalTreeModule.getLayoutNodesCollection(this.nodes);
                if (nodes_1.length > 0) {
                    // eslint-disable-next-line max-len
                    this.complexHierarchicalTreeModule.doLayout(nodes_1, this.nameTable, this.layout, viewPort, this);
                }
                update = true;
                //initLineDistribution method call after doLayout.
                if (this.canDistribute(canEnableRouting, canDoOverlap)) {
                    this.lineDistributionModule.initLineDistribution(this.layout, this);
                }
            }
            else if (this.flowchartLayoutModule) {
                this.flowchartLayoutModule.updateLayout(this.nodes, this);
                update = true;
            }
            else {
                var moduleName = this.layout.type === 'OrganizationalChart' ? 'HierarchicalTree' : this.layout.type;
                console.warn('[WARNING] :: Module ' + moduleName + ' is not available in Diagram component! You either misspelled the module name or forgot to load it.');
            }
            if (update) {
                this.preventDiagramUpdate = true;
                var connectors = {};
                var updatedNodes = nodes;
                // BLAZ-22230 - Added condition to check if canUpdateTemplate is false means then we can update the template for blazor
                //Removed isBlazor code
                for (var _i = 0, updatedNodes_1 = updatedNodes; _i < updatedNodes_1.length; _i++) {
                    var obj = updatedNodes_1[_i];
                    var node = obj;
                    if (!this.preventNodesUpdate && (!this.diagramActions || !(this.diagramActions & DiagramAction.PreventIconsUpdate))) {
                        this.updateIcon(node);
                        this.updateDefaultLayoutIcons(node);
                    }
                    this.preventNodesUpdate = true;
                    this.nodePropertyChange(node, {}, { offsetX: node.offsetX, offsetY: node.offsetY }, true);
                    this.preventNodesUpdate = false;
                    node.wrapper.measure(new Size(node.wrapper.width, node.wrapper.height));
                    node.wrapper.arrange(node.wrapper.desiredSize);
                    this.updateDiagramObject(node, true);
                    if (node.inEdges.length > 0) {
                        for (var j = 0; j < node.inEdges.length; j++) {
                            var connector = this.nameTable[node.inEdges[parseInt(j.toString(), 10)]];
                            connectors[connector.id] = connector;
                        }
                    }
                    if (node.outEdges.length > 0) {
                        for (var k = 0; k < node.outEdges.length; k++) {
                            var connection = this.nameTable[node.outEdges[parseInt(k.toString(), 10)]];
                            connectors[connection.id] = connection;
                        }
                    }
                }
                for (var _a = 0, _b = Object.keys(connectors); _a < _b.length; _a++) {
                    var conn = _b[_a];
                    if (canEnableRouting) {
                        this.lineDistributionModule.resetConnectorSegments(this.nameTable["" + conn]);
                    }
                    var connector = connectors["" + conn];
                    var points = this.getPoints(connector);
                    if (canEnableRouting) {
                        this.lineDistributionModule.resetRoutingSegments(connector, this, points);
                    }
                    updateConnector(connector, points);
                    if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default' && connector.shape.flow === 'Sequence') {
                        this.commandHandler.updatePathElementOffset(connector);
                    }
                    connector.wrapper.measure(new Size(undefined, undefined));
                    connector.wrapper.arrange(connector.wrapper.desiredSize);
                    this.updateConnectorAnnotation(connector);
                    this.updateConnectorfixedUserHandles(connector);
                    this.updateQuad(connector);
                    this.updateDiagramObject(connector, true);
                }
                if (canEnableRouting || this.layout.connectionPointOrigin === 'DifferentPoint' && this.lineDistributionModule && canDoOverlap) {
                    this.lineDistributionModule.distributeLines(this.layout, this);
                }
                this.refreshFlowChartConnectors();
                this.preventDiagramUpdate = false;
                this.updatePage();
                if ((!(this.diagramActions & DiagramAction.Render)) || this.mode === 'Canvas') {
                    this.refreshDiagramLayer();
                    this.isRefreshed = true;
                }
            }
            if (!propChange) {
                this.protectPropertyChange(propChange);
            }
        }
        if (update) {
            this.updateDiagramElementQuad();
        }
        if ((this.diagramActions & DiagramAction.Render) && this.layout.enableRouting) {
            this.refreshRoutingConnectors();
        }
        if (update) {
            // Trigger the layoutUpdated event with the state set to 'Completed' and the current layout type.
            var args = { state: 'Completed', type: this.layout.type };
            this.triggerEvent(DiagramEvent.layoutUpdated, args);
        }
        return ((this.blazorActions & BlazorAction.expandNode) ? layout : true);
    };
    //Bug 877799: Optimize the routing segment distance while using enableRouting in layout.
    //Stored the routingConnectors in resetRoutingSegments method and then Refresh the routing connectors after layout completion.
    Diagram.prototype.refreshRoutingConnectors = function () {
        this.isProtectedOnChange = true;
        if (this.routingConnectors) {
            for (var i = 0; i < this.routingConnectors.length; i++) {
                var connector = this.routingConnectors[parseInt(i.toString(), 10)];
                var sourceNode = this.nameTable[connector.sourceID];
                var targetNode = this.nameTable[connector.targetID];
                var lineRouting = new LineRouting();
                if (sourceNode.visible && targetNode.visible) {
                    lineRouting.renderVirtualRegion(this, true);
                    lineRouting.refreshConnectorSegments(this, connector, false, true);
                    var points = this.getPoints(connector);
                    updateConnector(connector, points);
                    connector.wrapper.measure(new Size(undefined, undefined));
                    connector.wrapper.arrange(connector.wrapper.desiredSize);
                    this.updateDiagramObject(connector, true);
                    this.routingConnectors.splice(i, 1);
                    i--;
                }
            }
        }
        this.isProtectedOnChange = false;
    };
    //To update new connector points in flowchart layout
    Diagram.prototype.refreshFlowChartConnectors = function () {
        if (this.flowchartLayoutModule) {
            this.flowchartLayoutModule.reRouteFlowChartConnectors(this.layout.flowChartData, this);
            for (var i = 0; i < this.connectors.length; i++) {
                var connector = this.connectors[parseInt(i.toString(), 10)];
                var points = this.getPoints(connector);
                updateConnector(connector, points);
                connector.wrapper.measure(new Size(undefined, undefined));
                connector.wrapper.arrange(connector.wrapper.desiredSize);
                this.updateConnectorAnnotation(connector);
                this.updateConnectorfixedUserHandles(connector);
                this.updateQuad(connector);
                this.updateDiagramObject(connector, true);
            }
        }
    };
    //Checks if line distribution is enabled.
    Diagram.prototype.canDistribute = function (canEnableRouting, canDoOverlap) {
        if ((canEnableRouting && this.lineDistributionModule) || (this.layout.connectionPointOrigin === 'DifferentPoint' && this.lineDistributionModule && canDoOverlap) || (this.layout.arrangement === 'Linear' && this.lineDistributionModule)) {
            return true;
        }
        else {
            if ((canEnableRouting) || (this.layout.connectionPointOrigin === 'DifferentPoint' && canDoOverlap) || (this.layout.arrangement === 'Linear')) {
                console.warn('[WARNING] :: Module "LineDistribution" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
            }
            return false;
        }
    };
    /* tslint:enable */
    /**
     * Serializes the diagram control as a string.
     * @returns { string }     Serializes the diagram control as a string. \
     */
    Diagram.prototype.saveDiagram = function () {
        var children = [];
        var node;
        var grid;
        var childTable;
        var child;
        var gridChild = 'childTable';
        for (var i = 0; i < this.nodes.length; i++) {
            node = this.nodes[parseInt(i.toString(), 10)];
            if (node.shape.type === 'SwimLane') {
                grid = node.wrapper.children[0];
                childTable = grid["" + gridChild];
                for (var _i = 0, _a = Object.keys(childTable); _i < _a.length; _i++) {
                    var key = _a[_i];
                    child = childTable["" + key];
                    children = getChild(child, children);
                }
                for (var i_1 = 0; i_1 < children.length; i_1++) {
                    if (this.nameTable[children[parseInt(i_1.toString(), 10)]]) {
                        this.swimlaneChildTable[children[parseInt(i_1.toString(), 10)]]
                            = this.nameTable[children[parseInt(i_1.toString(), 10)]].zIndex;
                    }
                }
                this.swimlaneZIndexTable[node.id] = node.zIndex;
            }
        }
        return serialize(this);
    };
    /**
     * Converts the given string into a Diagram Control.
     *
     * @returns { Object } Converts the given string into a Diagram Control. \
     * @param {string} data - The string representing the diagram model JSON to be loaded.
     * @param {boolean} isEJ1Data - A boolean indicating whether the JSON data is EJ1 data.
     */
    Diagram.prototype.loadDiagram = function (data, isEJ1Data) {
        if (isEJ1Data && this.ej1SerializationModule) {
            var ejDiagram = JSON.parse(data);
            data = this.ej1SerializationModule.getSerializedData(ejDiagram);
        }
        else if (isEJ1Data) {
            console.warn('[WARNING] :: Module "Ej1Serialization" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
        return deserialize(data, this);
    };
    /**
     * Exports the current diagram to a string in Mermaid format.
     * This method converts the current state of the diagram into Mermaid syntax, allowing it to be saved or shared.
     * @returns {string} - A string containing the Mermaid text representation of the current diagram.
     */
    Diagram.prototype.saveDiagramAsMermaid = function () {
        var mermaidData = '';
        if (this.layout && this.layout.type === 'Flowchart') {
            mermaidData = this.saveFlowDiagramInMermaidFormat();
        }
        else {
            mermaidData = this.saveMindmapDiagramInMermaidFormat();
        }
        return mermaidData;
    };
    /**
     * Converts the diagram to Mermaid format and saves it.
     * If the diagram has a 'MindMap' layout, it will generate a Mermaid mind map.
     * @returns {string} - The Mermaid formatted string representing the diagram.
     */
    Diagram.prototype.saveMindmapDiagramInMermaidFormat = function () {
        var mermaidData = '';
        var dataSourceCollection = [];
        if (this.layout && this.layout.type === 'MindMap') {
            dataSourceCollection.push('mindmap');
            if (this.nodes.length > 0) {
                var rootNode = this.nodes.filter(function (node) { return node.inEdges.length === 0; })[0];
                var content = this.convertMindmapToMermaid(rootNode, 0);
                dataSourceCollection.push(content);
                var outConnectors = rootNode.outEdges;
                this.updateTextDataSource(dataSourceCollection, outConnectors, 1);
                dataSourceCollection = dataSourceCollection.filter(function (data) { return data.trim() !== ''; });
                mermaidData = dataSourceCollection.join('\n');
            }
        }
        return mermaidData;
    };
    /**
     * Creates a text data source for sub-level children in a Mermaid diagram.
     * @param {string[]} dataSource - The data source to be updated.
     * @param {string[]} outEdges - The out edges of the current node.
     * @param {number} level - The level of the current node.
     * @returns {void} - Creates a text data source for sub-level children in a Mermaid diagram.
     */
    Diagram.prototype.updateTextDataSource = function (dataSource, outEdges, level) {
        var count = 0;
        while (count < outEdges.length) {
            var connector = this.getObject(outEdges[parseInt(count.toString(), 10)]);
            var targetNode = this.getObject(connector.targetID);
            var content = this.convertMindmapToMermaid(targetNode, level);
            dataSource.push(content);
            var childOutConnectors = targetNode.outEdges;
            if (childOutConnectors.length > 0) {
                this.updateTextDataSource(dataSource, childOutConnectors, level + 1);
            }
            count++;
        }
    };
    /**
     * Returns the text data source for the specified node in Mermaid format.
     * @param {NodeModel} node - The node for which the Mermaid data is to be generated.
     * @param {number} level - The level of the node in the diagram.
     * @returns {string} - The text data source for the specified node in Mermaid format.
     */
    Diagram.prototype.convertMindmapToMermaid = function (node, level) {
        var nodeId = node.id;
        var spaceCount = (level + 1) * 2;
        var spaces = ' '.repeat(spaceCount);
        var annotationContent = node.annotations.length > 0
            ? node.annotations[0].content.replace(/\n/g, ' ')
            : '';
        var content = spaces + annotationContent;
        var spaceWithNodeId = spaces + nodeId;
        if (node.shape && node.shape.type === 'Basic') {
            var basicShape = node.shape;
            if (basicShape.shape === 'Rectangle') {
                content = spaceWithNodeId + '[' + annotationContent + ']';
            }
            else if (basicShape.shape === 'Ellipse') {
                content = spaceWithNodeId + '((' + annotationContent + '))';
            }
            else if (basicShape.shape === 'Hexagon') {
                content = spaceWithNodeId + '{{' + annotationContent + '}}';
            }
        }
        else if (node.shape && node.shape.type === 'Flow') {
            var flowShape = node.shape;
            if (flowShape.shape === 'Terminator') {
                content = spaceWithNodeId + '(' + annotationContent + ')';
            }
        }
        else if (node.shape && node.shape.type === 'Path') {
            var pathShape = node.shape;
            if (pathShape.data === this.bangShape) {
                content = spaceWithNodeId + '))' + annotationContent + '((';
            }
            else if (pathShape.data === this.cloudShape) {
                content = spaceWithNodeId + ')' + annotationContent + '(';
            }
        }
        return content;
    };
    /**
     * Converts the flowchart diagram to Mermaid format.
     * @returns {string} - The exported flowchart diagram as Mermaid data.
     */
    Diagram.prototype.saveFlowDiagramInMermaidFormat = function () {
        var _this = this;
        var existingIds = [];
        var mermaidCode = 'graph TD\n';
        var graph = { nodes: this.nodes, edges: this.connectors };
        // Create a map of node labels for easy access
        // accumulator - The object that stores the node ID and label pairs.
        var nodeLabels = graph.nodes.reduce(function (accumulator, node) {
            accumulator[node.id] = node.annotations.length ? node.annotations[0].content : '';
            return accumulator;
        }, {});
        // Iterate through edges to create connections and node definitions
        graph.edges.forEach(function (edge) {
            var fromNodeId = edge.sourceID;
            var toNodeId = edge.targetID;
            var fromNodeLabel = nodeLabels["" + fromNodeId];
            var toNodeLabel = nodeLabels["" + toNodeId];
            var fromNode = _this.nameTable["" + fromNodeId];
            var toNode = _this.nameTable["" + toNodeId];
            var fromNodeShape = _this.getNodeShape(fromNode);
            var toNodeShape = _this.getNodeShape(toNode);
            var condition = (edge.annotations[0] && edge.annotations[0].content !== '') ? '|' + edge.annotations[0].content + '|' : '';
            if (existingIds.indexOf(fromNodeId) === -1) {
                existingIds.push(fromNodeId);
            }
            else {
                fromNodeShape = '';
            }
            if (existingIds.indexOf(toNodeId) === -1) {
                existingIds.push(toNodeId);
            }
            else {
                toNodeShape = '';
            }
            var arrow = _this.arrowType(edge);
            mermaidCode += "    " + fromNodeId + fromNodeShape + " " + arrow + condition + " " + toNodeId + toNodeShape + "\n";
        });
        // Add styles for each node
        graph.nodes.forEach(function (node) {
            var nodeId = node.id;
            var fill = node.style.fill;
            var stroke = node.style.strokeColor;
            var strokeWidth = node.style.strokeWidth + "px";
            mermaidCode += "    style " + nodeId + " fill:" + fill + ",stroke:" + stroke + ",stroke-width:" + strokeWidth + ";\n";
        });
        return mermaidCode;
    };
    // Method to get the arrow type from connector
    Diagram.prototype.arrowType = function (edge) {
        var decoratorShape = edge.targetDecorator.shape;
        var strokeDash = edge.style.strokeDashArray;
        var strokeWidth = edge.style.strokeWidth;
        var opacity = edge.style.opacity;
        var arrow = '';
        if (opacity < 1) {
            arrow = '~~~';
        }
        else if (strokeDash !== '') {
            arrow = '-.->';
        }
        else if (decoratorShape === 'Arrow') {
            arrow = strokeWidth > 1 ? '==>' : '-->';
        }
        else if (decoratorShape === 'None') {
            arrow = '---';
        }
        else {
            arrow = '-->';
        }
        return arrow;
    };
    // Method to get the node shape
    Diagram.prototype.getNodeShape = function (node) {
        var label = node.annotations.length > 0 ? node.annotations[0].content : '';
        var shape = node.shape.shape;
        if (shape) {
            switch (shape) {
                case 'Terminator':
                    return '([' + label + '])';
                case 'Process':
                    return '[' + label + ']';
                case 'Decision':
                    return '{' + label + '}';
                case 'Parallelogram':
                    return '[/' + label + '/]';
                case 'Ellipse':
                    return '((' + label + '))';
                case 'PreDefinedProcess':
                    return '[[' + label + ']]';
                default:
                    return '[' + label + ']';
            }
        }
        else {
            var data = node.shape.data;
            if (data === 'M 0 0 A 1 1 0 0 0 7 0 A 1 1 0 0 0 0 0 M -1 0 A 1 1 0 0 0 8 0 A 1 1 0 0 0 -1 0') {
                return '(((' + label + ')))';
            }
            else if (data === 'M 0 0 L 1 -1 L 5 -1 L 6 0 L 0 0') {
                return '[/' + label + '\\]';
            }
            else if (data === 'M 0 1 L 0 6 C 2 7 4 7 6 6 L 6 1 C 5 0 1 0 0 1 C 1 2 5 2 6 1') {
                return '[(' + label + ')]';
            }
            else if (data === 'M 0 0 L 12 0 L 14 2 L 2 2 L 0 0') {
                return '[\\' + label + '\\]';
            }
            else if (data === 'M 0 0 L 5 0 L 4 1 L 1 1 L 0 0') {
                return '[\\' + label + '/]';
            }
            else if (data === 'M 0 0 L 2 -2 L 11 -2 L 13 0 L 11 2 L 2 2 L 0 0') {
                return '{{' + label + '}}';
            }
            else {
                return '>' + label + ']';
            }
        }
    };
    /** Loads a diagram from a string containing Mermaid syntax.
     * This method parses the provided Mermaid text data and updates the current diagram accordingly.
     * Currently, only Mindmap and Flowchart diagrams can be loaded.
     * To render the diagram properly, you should set the `Layout.type` to either `MindMap` or `FlowChart`, and ensure that the respective modules are injected.
     * @param {string} data - The Mermaid text data representing the diagram to be loaded.
     * @returns {void} - No return value. The method updates the diagram in place.
     */
    Diagram.prototype.loadDiagramFromMermaid = function (data) {
        if (this.layout && this.layout.type === 'Flowchart' && this.flowchartLayoutModule) {
            //Task 896394: To load the mermaid data as flowchart
            this.convertMermaidToFlowChart(data);
        }
        else if (this.layout && this.layout.type === 'MindMap' && this.mindMapChartModule) {
            //Task 900266: To load the mermaid data as mindmap
            this.convertMermaidToMindmap(data);
        }
        else {
            console.warn('[WARNING] :: Module "FlowchartLayout" or "MindMap" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
    };
    /**
     * Counts the number of leading spaces in the specified string.
     * @param {string} word The string to check for leading spaces.
     * @returns { number } The number of leading spaces.
     */
    Diagram.prototype.countLeadingSpaces = function (word) {
        var i = 0;
        var length = word.length;
        // Loop through the string to count leading spaces
        while (i < length && word.charAt(i) === ' ') {
            i++;
        }
        // Return the number of leading spaces
        return i;
    };
    Diagram.prototype.convertMermaidToMindmap = function (data) {
        if (data && this.layout && this.layout.type === 'MindMap' && this.mindMapChartModule) {
            var dataSource = data.split(/\r?\n/).filter(function (s) { return s.trim().length > 0; });
            this.clear();
            this.mermaidNodeBaseCollection = [];
            var dataStack = [];
            var root = null;
            var previousItem = { text: '', children: [], currentLevel: 0, branch: 'Left' };
            var spaceAndItsLevels = [];
            var startLevel = 1;
            var haveBackticks = false;
            var isEndBackticks = false;
            var canCreateMindMap = false;
            if (dataSource.length > 0) {
                var _loop_1 = function (index) {
                    var word = dataSource[parseInt(index.toString(), 10)];
                    var level = 0;
                    var text = '';
                    var levelChar = ' ';
                    var leadingWhiteSpace = this_1.countLeadingSpaces(word);
                    var isStartBackticks = word.includes('"`');
                    isEndBackticks = word.includes('`"');
                    haveBackticks = isStartBackticks ? true : haveBackticks;
                    canCreateMindMap = (!haveBackticks && !canCreateMindMap) ? leadingWhiteSpace === 0 && index > 0 : canCreateMindMap;
                    if (haveBackticks && isEndBackticks && !isStartBackticks) {
                        previousItem.text += '\n' + word;
                        haveBackticks = false;
                        return "continue";
                    }
                    if (!isStartBackticks && haveBackticks) {
                        previousItem.text += '\n' + word;
                        return "continue";
                    }
                    haveBackticks = isEndBackticks ? false : haveBackticks;
                    if (word.length > 0 && ((/\s/.test(word[0]) && index > 0) || (leadingWhiteSpace === 0))) {
                        var spaceIndex = spaceAndItsLevels.findIndex(function (space) {
                            return space.space === leadingWhiteSpace.toString();
                        });
                        if (spaceIndex !== -1) {
                            for (var i = spaceAndItsLevels.length - 1; i >= 0; i--) {
                                var currentSpace = spaceAndItsLevels[parseInt(i.toString(), 10)];
                                var currentKey = parseFloat(currentSpace.space);
                                if (currentKey > leadingWhiteSpace) {
                                    spaceAndItsLevels.splice(i, 1); // Remove the element at index i
                                }
                                else if (currentKey < leadingWhiteSpace) {
                                    spaceAndItsLevels.push({ space: leadingWhiteSpace.toString(), level: currentSpace.level + 1 });
                                    level = currentSpace.level + 1;
                                    break;
                                }
                                else if (currentKey === leadingWhiteSpace) {
                                    level = currentSpace.level;
                                    break;
                                }
                            }
                        }
                        else {
                            if (spaceAndItsLevels.length === 0) {
                                spaceAndItsLevels.push({ space: leadingWhiteSpace.toString(), level: startLevel });
                                level = startLevel;
                            }
                            else {
                                for (var i = spaceAndItsLevels.length - 1; i >= 0; i--) {
                                    var currentElement = spaceAndItsLevels[parseInt(i.toString(), 10)];
                                    var currentKey = parseFloat(currentElement.space);
                                    if (currentKey > leadingWhiteSpace) {
                                        spaceAndItsLevels.splice(i, 1); // Remove the element at index i
                                    }
                                    else {
                                        var lastElement = spaceAndItsLevels[spaceAndItsLevels.length - 1];
                                        spaceAndItsLevels.push({ space: leadingWhiteSpace.toString(), level: lastElement.level + 1 });
                                        break;
                                    }
                                }
                                level = spaceAndItsLevels[spaceAndItsLevels.length - 1].level;
                            }
                        }
                        text = word.trim().replace(/^[+-]/, '');
                        levelChar = ' ';
                    }
                    var currentItem = {
                        text: text,
                        branch: undefined,
                        children: [],
                        currentLevel: index === 0 ? 0 : level - 1
                    };
                    if (dataStack.length > 0) {
                        while (dataStack.length >= level) {
                            if (dataStack.length === 0) {
                                break;
                            }
                            dataStack.pop();
                        }
                        if (dataStack.length > 0) {
                            dataStack[dataStack.length - 1].children.push(currentItem);
                        }
                    }
                    else {
                        root = currentItem;
                    }
                    dataStack.push(currentItem);
                    previousItem = currentItem;
                };
                var this_1 = this;
                for (var index = 0; index < dataSource.length; index++) {
                    _loop_1(index);
                }
                // Create dataSource
                var hierarchyDataSource = dataStack[0];
                if (hierarchyDataSource.text === 'mindmap' || canCreateMindMap) {
                    if (canCreateMindMap) {
                        var nodeDetails = this.getNodeDetails(hierarchyDataSource);
                        var nodeObj = {
                            id: nodeDetails.nodeId,
                            shape: nodeDetails.nodeShapeData,
                            annotations: [
                                { content: nodeDetails.annotationContent }
                            ]
                        };
                        this.mermaidNodeBaseCollection.push(nodeObj);
                        this.createDataSource(hierarchyDataSource.children, hierarchyDataSource, nodeObj.id);
                    }
                    else {
                        var hierarchyData = hierarchyDataSource.children[0];
                        var nodeData = this.getNodeDetails(hierarchyData);
                        var node = {
                            id: nodeData.nodeId,
                            shape: nodeData.nodeShapeData,
                            annotations: [
                                { content: nodeData.annotationContent }
                            ]
                        };
                        this.mermaidNodeBaseCollection.push(node);
                        this.createDataSource(hierarchyData.children, hierarchyData, node.id);
                    }
                    this.addElements(this.mermaidNodeBaseCollection);
                    this.doLayout();
                }
            }
        }
    };
    /**
     * Creates a data source for the Mermaid diagram based on the provided hierarchy data.
     * @param { HierarchyData[] } data The list of hierarchy data to process.
     * @param { HierarchyData } parent The parent hierarchy data.
     * @param { string } parentId The ID of the parent node.
     * @returns { void }
     */
    Diagram.prototype.createDataSource = function (data, parent, parentId) {
        var index = 0;
        while (index < data.length) {
            var child = data[parseInt(index.toString(), 10)];
            var nodeData = this.getNodeDetails(child);
            var node = {
                id: nodeData.nodeId,
                shape: nodeData.nodeShapeData,
                annotations: [
                    { content: nodeData.annotationContent }
                ]
            };
            var connector = {
                sourceID: parentId,
                targetID: node.id
            };
            this.mermaidNodeBaseCollection.push(node);
            this.mermaidNodeBaseCollection.push(connector);
            this.createDataSource(child.children, child, node.id);
            index++;
        }
    };
    /**
     * Retrieves the node details based on the provided hierarchy data for a mermaid diagram.
     * @param { HierarchyData } hierarchyData The hierarchy data.
     * @returns { NodeData } The node details.
     */
    Diagram.prototype.getNodeDetails = function (hierarchyData) {
        var pattern = /^(.*?)\s*([\\[\\(\\{][\s\S]*?[\]\\)\\}]|[)\\(][\s\S]*|[)\\{][\s\S]*|[)\\(][^{}()\\[\]]*$)/;
        var annotationContent = hierarchyData.text;
        var match = annotationContent.match(pattern);
        var nodeId = randomId();
        var annotationText = hierarchyData.text;
        var shape = { type: 'Basic', shape: 'Rectangle' };
        if (match) {
            nodeId = match[1] ? match[1] : nodeId;
            var content = match[2].trim().replace(/["`]/g, '');
            var firstCharacter = content.charAt(0);
            if (firstCharacter === '[') {
                annotationText = content.slice(1, -1);
            }
            else if (firstCharacter === '(') {
                if (content.startsWith('((')) {
                    annotationText = content.slice(2, -1);
                }
                else {
                    annotationText = content.slice(1, -1);
                }
                shape = content.startsWith('((') ?
                    { type: 'Basic', shape: 'Ellipse' } :
                    { type: 'Flow', shape: 'Terminator' };
            }
            else if (firstCharacter === ')') {
                if (content.startsWith('))')) {
                    annotationText = content.slice(2, -2);
                }
                else {
                    annotationText = content.slice(1, -1);
                }
                shape = content.startsWith('))') ?
                    { type: 'Path', data: this.bangShape } :
                    { type: 'Path', data: this.cloudShape };
            }
            else if (firstCharacter === '{') {
                annotationText = content.slice(2, -1);
                shape = { type: 'Basic', shape: 'Hexagon' };
            }
        }
        return {
            nodeId: nodeId,
            annotationContent: annotationText,
            nodeShapeData: shape
        };
    };
    /**
     * To convert the Mermaid data to flowchart diagram
     * @param {string} data - The Mermaid data to be converted to a flowchart diagram.
     * @returns {void}
     */
    Diagram.prototype.convertMermaidToFlowChart = function (data) {
        var dataCollection = [];
        this.clear();
        var lines = data.trim().split('\n');
        for (var i = 1; i < lines.length; i++) {
            var line = lines[parseInt(i.toString(), 10)];
            line = line.trim();
            if (line !== '') {
                if (line.startsWith('style')) {
                    this.parseStyle(line, dataCollection);
                }
                else {
                    var lineSplit = this.getLineSplitting(line);
                    var parts = [lineSplit[0], lineSplit[1]];
                    var data_1 = this.getNodeData(parts, dataCollection, lineSplit[2]);
                    if (data_1.length > 0) {
                        var lastItem = data_1[data_1.length - 1];
                        lastItem.arrowType = lineSplit[2];
                        if (lineSplit[3] !== '') {
                            if (lastItem.label && lastItem.label.some(function (str) { return str.trim().length > 0; })) {
                                lastItem.label.push(lineSplit[3]);
                            }
                            else {
                                lastItem.label = [];
                                lastItem.label[lastItem.parentId.length - 1] = lineSplit[3];
                            }
                        }
                    }
                    data_1.filter(function (flowData) {
                        return flowData.parentId && flowData.parentId.length === 0;
                    }).forEach(function (node) {
                        node.parentId = null;
                    });
                    dataCollection = dataCollection.concat(data_1);
                }
            }
        }
        this.createFlowChart(dataCollection);
        this.doLayout();
        this.clearHistory();
    };
    /**
     * To convert the dataCollection into flowchart nodes and connectors
     * @param { FlowChartData[] } dataCollection - The data collection to be converted to flowchart nodes and connectors.
     * @returns {void}
     */
    Diagram.prototype.createFlowChart = function (dataCollection) {
        var flowchartNodesAndConnectors = [];
        for (var n = 0; n < dataCollection.length; n++) {
            var data = dataCollection[parseInt(n.toString(), 10)];
            var node = {
                id: data.id,
                shape: data.shape,
                annotations: [{ content: data.name }],
                style: { fill: data.color, strokeColor: data.stroke, strokeWidth: data.strokeWidth }
            };
            flowchartNodesAndConnectors.push(node);
        }
        for (var c = 0; c < dataCollection.length; c++) {
            var data = dataCollection[parseInt(c.toString(), 10)];
            var connectorStyle = getConnectorArrowType(data);
            if (data.parentId && data.parentId.length > 1) {
                for (var i = 0; i < data.parentId.length; i++) {
                    var connector = {
                        id: randomId(),
                        sourceID: data.parentId[parseInt(i.toString(), 10)],
                        targetID: data.id,
                        annotations: [{ content: data.label ? data.label[parseInt(i.toString(), 10)] : '' }],
                        style: {
                            strokeWidth: connectorStyle.strokeWidth ? connectorStyle.strokeWidth : 1,
                            strokeDashArray: connectorStyle.strokeDashArray ? connectorStyle.strokeDashArray : '',
                            opacity: connectorStyle.opacity !== undefined ? connectorStyle.opacity : 1
                        },
                        targetDecorator: { shape: connectorStyle.targetDecorator }
                    };
                    flowchartNodesAndConnectors.push(connector);
                }
            }
            else if (data.parentId && data.parentId.length === 1) {
                var connector = {
                    id: randomId(),
                    sourceID: data.parentId[0],
                    targetID: data.id,
                    annotations: [{ content: data.label ? data.label[0] : '' }],
                    style: {
                        strokeWidth: connectorStyle.strokeWidth ? connectorStyle.strokeWidth : 1,
                        strokeDashArray: connectorStyle.strokeDashArray ? connectorStyle.strokeDashArray : '',
                        opacity: connectorStyle.opacity !== undefined ? connectorStyle.opacity : 1
                    },
                    targetDecorator: { shape: connectorStyle.targetDecorator }
                };
                flowchartNodesAndConnectors.push(connector);
            }
        }
        this.addElements(flowchartNodesAndConnectors);
    };
    /**
     * Splits the line based on arrow
     * @param { string } line - line to split
     * @returns { string[] } - Splitted line
     */
    Diagram.prototype.getLineSplitting = function (line) {
        var leftPart;
        var rightPart;
        var arrowName;
        var arrowText = '';
        // RegEx to split the line based on arrow
        var regex = /^(.*?)\s*(-->|---|--\s*.*?\s*-->|~~~|==>|===|==\s*.*?\s*==>|\s*-\.\s*->|\s*-\.\s*-|\s*-\.\s*.*?\s*\.\s*->|\s*-\..*?\.\s*->)(.*)$/;
        var match = line.match(regex);
        if (match) {
            leftPart = match[1].trim();
            var arrow = match[2].trim();
            rightPart = match[3].trim();
            // Detect and extract arrow text
            var arrowRegex = /(-\.|\\-\\-|==|--|~~)(.*?)(\1>|\.->|==>|\\->|~~>)/;
            var arrowTextMatch = arrow.match(arrowRegex);
            var arrowDetails = void 0;
            var arrowType = '';
            if (arrowTextMatch) {
                var text = arrowTextMatch[2].trim() || null;
                var arrowType_1 = arrowTextMatch[1] + arrowTextMatch[3];
                arrowDetails = {
                    text: text,
                    arrowType: arrowType_1
                };
            }
            else {
                arrowDetails = {
                    text: null,
                    arrowType: arrow
                };
            }
            arrowText = arrowDetails.text !== null ? arrowDetails.text : '';
            arrowType = arrowDetails.arrowType;
            // Identify arrow type
            if (arrowType.includes('-->')) {
                arrowName = 'single-line-arrow';
            }
            else if (arrowType.includes('---')) {
                arrowName = 'single-line';
            }
            else if (arrowType.includes('==>')) {
                arrowName = 'double-line-arrow';
            }
            else if (arrowType.includes('==')) {
                arrowName = 'double-line';
            }
            else if (arrowType.includes('~~~')) {
                arrowName = 'wiggly-arrow';
            }
            else if (arrowType.includes('-.->') || arrowType.includes('.->')) {
                arrowName = 'dotted-arrow';
            }
            else if (arrowType.includes('-.-') || arrowType.includes('.-')) {
                arrowName = 'dotted';
            }
            else {
                arrowName = 'single-line-arrow';
            }
        }
        return [leftPart, rightPart, arrowName, arrowText];
    };
    /**
     * To parse the style of the node
     * @param { string } line - line to parse
     * @param { FlowChartData[] } dataCollection - data collection
     * @returns { void }
     */
    Diagram.prototype.parseStyle = function (line, dataCollection) {
        var styleRegex = /^style\s+(\w+)\s+fill:([^,]+),stroke:([^,]+),stroke-width:(\d+)px;/;
        if (line.startsWith('style')) {
            var match = line.match(styleRegex);
            if (match) {
                var id = match[1];
                var fill = match[2];
                var stroke = match[3];
                var strokeWidth = parseInt(match[4], 10);
                var data_2 = {
                    id: id,
                    fill: fill,
                    stroke: stroke,
                    strokeWidth: strokeWidth
                };
                var matchData = dataCollection.filter(function (x) { return x.id === data_2.id; });
                matchData[0].color = data_2.fill;
                matchData[0].stroke = data_2.stroke;
                matchData[0].strokeWidth = data_2.strokeWidth;
            }
        }
    };
    /**
     * @param {string[]} lines - The lines to be processed.
     * @param {FlowChartData[]} dataCollection - The data collection to be updated.
     * @param {string} arrowType - The type of arrow.
     * @returns { void }
     */
    Diagram.prototype.getNodeData = function (lines, dataCollection, arrowType) {
        var dataArray = [];
        var firstId = null;
        var secondId = null;
        var isExistCount = 0;
        var connectorLabel = '';
        var _loop_2 = function (i) {
            var line1 = lines[parseInt(i.toString(), 10)];
            var text = this_2.splitNested(line1);
            if (text[0].includes('|')) {
                // Extract content outside the '|'
                var match = text[0].match(/\|([^|]*)\|/);
                if (match) {
                    connectorLabel = match[1];
                }
                var parts = text[0].split('|');
                if (parts.length >= 3) {
                    text[0] = parts[2].trim();
                }
            }
            var id = text[0].trim();
            if (i === 0) {
                firstId = id;
            }
            else {
                secondId = id;
            }
            var exsist = dataCollection.find(function (data) { return data.id === id; });
            if (!exsist) {
                var labelShape = text.length > 1 ? text[1] : text[0];
                var shape = this_2.getShape(labelShape);
                var label = labelShape.replace(/[\\[\]\\(\\)\\{\\}\\{\\}\\/>]/g, '');
                var data = {
                    id: id,
                    name: label,
                    shape: shape,
                    color: 'white',
                    parentId: []
                };
                dataArray.push(data);
            }
            else {
                isExistCount++;
            }
        };
        var this_2 = this;
        for (var i = 0; i < lines.length; i++) {
            _loop_2(i);
        }
        if (dataArray.length) {
            var lastItem = dataArray[dataArray.length - 1];
            if (lastItem.id !== firstId) {
                lastItem.parentId.push(firstId);
                if (lastItem.label) {
                    lastItem.label.push(connectorLabel);
                }
                else {
                    lastItem.label = [connectorLabel];
                }
            }
            else {
                var data = dataCollection.find(function (data) { return data.id === secondId; });
                if (data.parentId) {
                    data.parentId.push(firstId);
                }
                else {
                    data.parentId = [firstId];
                }
                if (data.label) {
                    data.label.push(connectorLabel);
                }
                else {
                    data.label = [connectorLabel];
                }
            }
        }
        else if (isExistCount === 2) {
            var filteredData = dataCollection.filter(function (flowData) { return flowData.id === secondId; })[0];
            filteredData.parentId = filteredData.parentId || [];
            filteredData.parentId.push(firstId);
            filteredData.label = filteredData.label || [];
            filteredData.label[filteredData.parentId.length - 1] = connectorLabel;
        }
        if (arrowType) {
            var filteredData = dataCollection.filter(function (flowData) { return flowData.id === secondId; })[0];
            if (filteredData) {
                filteredData.arrowType = arrowType;
            }
        }
        return dataArray;
    };
    /**
     * To split the text based on the nested brackets
     * @param {string} text - The text to be split based on nested brackets.
     * @returns {string[]} An array of strings split based on the nested brackets.
     */
    Diagram.prototype.splitNested = function (text) {
        var result = [];
        var current = '';
        var level = 0;
        var delimiter = '';
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var char = text_1[_i];
            if (char === '[' || char === '{' || char === '(' || char === '>') {
                if (level === 0) {
                    if (current.trim().length > 0) {
                        result.push(current.trim());
                    }
                    current = char; // Include the delimiter in the current part
                    delimiter = char;
                    level++;
                }
                else {
                    current += char;
                    level++;
                }
            }
            else if (char === ']' || char === '}' || char === ')') {
                if (level === 1 && char === delimiter) {
                    current += char; // Include the delimiter in the current part
                    result.push(current.trim());
                    current = '';
                    level--;
                }
                else if (level > 1) {
                    current += char;
                    level--;
                }
                else {
                    current += char;
                }
            }
            else {
                current += char;
            }
        }
        if (current.trim().length > 0) {
            result.push(current.trim());
        }
        return result;
    };
    // Get shape based on the bracket
    Diagram.prototype.getShape = function (text) {
        var shape = {};
        if (text.startsWith('(((')) {
            shape = { type: 'Path', data: 'M 0 0 A 1 1 0 0 0 7 0 A 1 1 0 0 0 0 0 M -1 0 A 1 1 0 0 0 8 0 A 1 1 0 0 0 -1 0' };
        }
        else if (text.startsWith('((')) {
            shape = { shape: 'Ellipse', type: 'Basic' };
        }
        else if (text.startsWith('([')) {
            shape = { type: 'Flow', shape: 'Terminator' };
        }
        else if (text.startsWith('(')) {
            shape = { type: 'Flow', shape: 'Process' };
        }
        else if (text.startsWith('[[')) {
            shape = { type: 'Flow', shape: 'PreDefinedProcess' };
        }
        else if (text.startsWith('[/')) {
            if (text.endsWith('/]')) {
                shape = { type: 'Basic', shape: 'Parallelogram' };
            }
            else {
                shape = { type: 'Path', data: 'M 0 0 L 1 -1 L 5 -1 L 6 0 L 0 0' };
            }
        }
        else if (text.startsWith('[(')) {
            shape = { type: 'Path', data: 'M 0 1 L 0 6 C 2 7 4 7 6 6 L 6 1 C 5 0 1 0 0 1 C 1 2 5 2 6 1' };
        }
        else if (text.startsWith('[\\')) {
            if (text.endsWith('\\]')) {
                shape = { type: 'Path', data: 'M 0 0 L 12 0 L 14 2 L 2 2 L 0 0' };
            }
            else {
                shape = { type: 'Path', data: 'M 0 0 L 5 0 L 4 1 L 1 1 L 0 0' };
            }
        }
        else if (text.startsWith('[')) {
            shape = { type: 'Basic', shape: 'Rectangle' };
        }
        else if (text.startsWith('{{')) {
            shape = { type: 'Path', data: 'M 0 0 L 2 -2 L 11 -2 L 13 0 L 11 2 L 2 2 L 0 0' };
        }
        else if (text.startsWith('{')) {
            shape = { type: 'Flow', shape: 'Decision' };
        }
        else if (text.startsWith('>')) {
            shape = { type: 'Path', data: 'M 0 0 L 8 0 L 8 2 L 0 2 L 2 1 L 0 0' };
        }
        return shape;
    };
    /**
     * To  get the html diagram content
     *
     * @returns { string }     getDirection method .\
     * @param {StyleSheetList} styleSheets - defines the collection of style files to be considered while exporting.
     */
    Diagram.prototype.getDiagramContent = function (styleSheets) {
        if (this.printandExportModule) {
            var data = this.printandExportModule.getDiagramContent(styleSheets);
            return data;
        }
        else {
            console.warn('[WARNING] :: Module "PrintAndExport" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
            return '';
        }
    };
    /**
     * Exports a diagram as a image.
     *
     * @returns { void } Exports a diagram as a image.\
     * @param {string} image - A string representing the image content to be exported.
     * @param {IExportOptions} options -An object defining the properties of the image export.
     */
    Diagram.prototype.exportImage = function (image, options) {
        if (this.printandExportModule) {
            this.printandExportModule.exportImages(image, options);
        }
        else {
            console.warn('[WARNING] :: Module "PrintAndExport" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
    };
    /**
     * Prints the native or HTML nodes of the diagram as an image.
     *
     * @returns { void } Prints the native or HTML nodes of the diagram as an image. \
     * @param {string} image - A string that defines the image content to be printed.
     * @param {IExportOptions} options - An IExportOptions object that defines the properties of the image and printing options.
     */
    Diagram.prototype.printImage = function (image, options) {
        if (this.printandExportModule) {
            options.printOptions = true;
            this.printandExportModule.exportImages(image, options);
        }
        else {
            console.warn('[WARNING] :: Module "PrintAndExport" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
    };
    /**
     * Define a limit on the number of history entries that the diagram's history manager can store. This can help manage memory usage and control the undo/redo history size. Or
     * Sets the limit for the history entries in the diagram.
     *
     * @returns { void }  Define a limit on the number of history entries that the diagram's history manager can store. This can help manage memory usage and control the undo/redo history size. Or Sets the limit for the history entries in the diagram.
     * @param {number} stackLimit - The limit for the history manager's stack.
     */
    Diagram.prototype.setStackLimit = function (stackLimit) {
        if (this.undoRedoModule && stackLimit) {
            this.historyManager.stackLimit = stackLimit;
            this.undoRedoModule.applyLimit(this.historyManager.currentEntry, stackLimit, this, true);
        }
    };
    /**
     * Clears the history of the diagram, removing all the recorded actions from the undo and redo history.
     * @returns { void } Clears the history of the diagram, removing all the recorded actions from the undo and redo history.\
     */
    Diagram.prototype.clearHistory = function () {
        if (this.undoRedoModule) {
            this.undoRedoModule.clearHistory(this);
        }
    };
    /**
     * Retrieves the bounding rectangle that encloses the entire diagram.
     * @returns { void } TRetrieves the bounding rectangle that encloses the entire diagram. \
     */
    Diagram.prototype.getDiagramBounds = function () {
        if (this.printandExportModule) {
            var bounds = this.printandExportModule.getDiagramBounds('', {});
            bounds.width = bounds.width > this.scrollSettings.viewPortWidth ?
                bounds.width + (bounds.x > 0 ? bounds.x : 0) : this.scrollSettings.viewPortWidth;
            bounds.height = bounds.height > this.scrollSettings.viewPortHeight ?
                bounds.height + (bounds.y > 0 ? bounds.y : 0) : this.scrollSettings.viewPortHeight;
            bounds.x = bounds.x > 0 ? 0 : bounds.x;
            bounds.y = bounds.y > 0 ? 0 : bounds.y;
            return bounds;
        }
        else {
            console.warn('[WARNING] :: Module "PrintAndExport" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
            return new Rect();
        }
    };
    /**
     * Exports the diagram as an image or SVG element based on the specified options.
     *
     * @returns { void } Exports the diagram as an image or SVG element based on the specified options.\
     * @param {IExportOptions} options - An object defining how the diagram image should be exported.
     */
    Diagram.prototype.exportDiagram = function (options) {
        if (this.printandExportModule) {
            var data = this.printandExportModule.exportDiagram(options);
            return data;
        }
        else {
            console.warn('[WARNING] :: Module "PrintAndExport" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
            return '';
        }
    };
    /**
     * Prints the diagram.
     *
     * @returns { void }     Prints the diagram.\
     * @param {IPrintOptions} optons - An IPrintOptions object that defines how the diagram is to be printed.
     */
    Diagram.prototype.print = function (options) {
        if (this.printandExportModule) {
            this.printandExportModule.print(options);
        }
        else {
            console.warn('[WARNING] :: Module "PrintAndExport" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
    };
    /**
     * Adds ports to a node or connector at runtime. \
     *
     * @returns { void }    Adds ports to a node or connector at runtime.\
     * @param { Node | ConnectorModel} obj - object representing the node or connector to which ports will be added.
     * @param {ShapeAnnotationModel[] | PathAnnotationModel[]} ports - objects representing the ports to be added.
     * @blazorArgsType obj|DiagramNode
     */
    Diagram.prototype.addPorts = function (obj, ports) {
        this.protectPropertyChange(true);
        var portCollection = [];
        var isAddPortInServer = true;
        var exist = false;
        //Removed isBlazor code
        obj = this.nameTable[obj.id] || obj;
        var newObj;
        if (ports.length > 1) {
            this.startGroupAction();
        }
        var _loop_3 = function (i) {
            //907755 - Issue in add/remove port on runtime
            exist = obj.ports.some(function (port) { return port.id === ports[parseInt(i.toString(), 10)].id; });
            if (exist) {
                return "continue";
            }
            if (obj instanceof Node) {
                newObj = new PointPort(obj, 'ports', ports[parseInt(i.toString(), 10)], true);
                obj.ports.push(newObj);
            }
            else if (obj instanceof Connector) {
                newObj = new PathPort(obj, 'ports', ports[parseInt(i.toString(), 10)], true);
                obj.ports.push(newObj);
            }
            //Removed isBlazor code
            if (obj.children) {
                // 907773: Add port to Group at runtime Issue Fix
                var container = obj.wrapper;
                for (var k = 0; k < container.children.length; k++) {
                    var wrapper = container.children[parseInt(k.toString(), 10)];
                    if ((wrapper.id).match(container.id)) {
                        obj.initPort(this_3.getDescription, wrapper, newObj);
                        break;
                    }
                }
            }
            else {
                var canvas = obj.wrapper;
                if (obj instanceof Node) {
                    canvas.children.push(obj.initPortWrapper(obj.ports[obj.ports.length - 1]));
                }
                else if (obj instanceof Connector) {
                    var points = obj.type === 'Bezier' ? obj.intermediatePoints : obj.getConnectorPoints(obj.type);
                    points = obj.clipDecorators(obj, points);
                    var bounds = Rect.toBounds(points);
                    // eslint-disable-next-line max-len
                    canvas.children.push(obj.initPort(obj.ports[obj.ports.length - 1], points, bounds, undefined));
                }
            }
            if (!(this_3.diagramActions & DiagramAction.UndoRedo) && !(this_3.diagramActions & DiagramAction.Group)) {
                var entry = {
                    type: 'PortCollectionChanged', changeType: 'Insert', undoObject: cloneObject(newObj),
                    redoObject: cloneObject(obj), category: 'Internal'
                };
                this_3.addHistoryEntry(entry);
            }
        };
        var this_3 = this;
        for (var i = 0; i < ports.length; i++) {
            _loop_3(i);
        }
        if (ports.length > 1) {
            this.endGroupAction();
        }
        //Removed isBlazor code
        obj.wrapper.measure(new Size(obj.width, obj.height));
        obj.wrapper.arrange(obj.wrapper.desiredSize);
        this.updateDiagramObject(obj);
        this.protectPropertyChange(false);
    };
    /**
     * Adds constraints at run time. \
     *
     * @returns { void }Add constraints at run time .\
     * @param {number} constraintsType - The source value for constraints.
     * @param {number} constraintsValue - The target value for constraints.
     *
     */
    Diagram.prototype.addConstraints = function (constraintsType, constraintsValue) {
        return constraintsType | constraintsValue;
    };
    /**
     * Remove constraints at run time. \
     *
     * @returns { void }Remove constraints at run time.\
     * @param {number} constraintsType - The type of constraints to be removed.
     * @param {number} constraintsValue - The value of constraints to be removed.
     *
     */
    Diagram.prototype.removeConstraints = function (constraintsType, constraintsValue) {
        return constraintsType & ~constraintsValue;
    };
    /**
     * Add labels in node at the run time in the blazor platform  \
     *
     * @returns { void } Add labels in node at the run time in the blazor platform  \
     * @param {NodeModel} obj - provide the obj value.
     * @param {ShapeAnnotationModel[]} labels - provide the labels value.
     *
     */
    Diagram.prototype.addNodeLabels = function (obj, labels) {
        this.addLabels(obj, labels);
    };
    /**
     * Adds labels to a connector at runtime in the Blazor platform.\
     *
     * @returns { void } Adds labels to a connector at runtime in the Blazor platform.\
     * @param {ConnectorModel} obj - The connector to which labels will be added.
     * @param {PathAnnotationModel[]} labels - An array of labels to add to the connector.
     *
     */
    Diagram.prototype.addConnectorLabels = function (obj, labels) {
        this.addLabels(obj, labels);
    };
    /**
     * Adds labels to a node or connector at runtime. \
     *
     * @returns { void } Adds labels to a node or connector at runtime.\
     * @param {NodeModel | ConnectorModel} obj - The node or connector to which labels will be added.
     * @param {ShapeAnnotationModel[] | PathAnnotation[] | PathAnnotationModel[]} labels - An array of label objects to be added.
     *
     */
    Diagram.prototype.addLabels = function (obj, labels) {
        this.protectPropertyChange(true);
        var isAddLabelInServer = true;
        var annotationCollection = [];
        //Removed isBlazor code
        obj = this.nameTable[obj.id] || obj;
        var canvas = obj.wrapper;
        var newObj;
        if (labels.length > 1) {
            this.startGroupAction();
        }
        for (var i = 0; i < labels.length; i++) {
            if (obj instanceof Node) {
                newObj = new ShapeAnnotation(obj, 'annotations', labels[parseInt(i.toString(), 10)], true);
                obj.annotations.push(newObj);
                //Removed isBlazor code
                if (obj.children) {
                    var node = obj;
                    for (var i_2 = 0; i_2 < node.wrapper.children.length; i_2++) {
                        if (node.wrapper.children[parseInt(i_2.toString(), 10)].id === node.id + 'group_container') {
                            var container = node.wrapper.children[parseInt(i_2.toString(), 10)];
                            container.children.push(obj.initAnnotationWrapper(obj.annotations[obj.annotations.length - 1], this.element.id));
                        }
                    }
                }
                else {
                    canvas.children.push(obj.initAnnotationWrapper(obj.annotations[obj.annotations.length - 1], this.element.id));
                }
            }
            else if (obj instanceof Connector) {
                newObj = new PathAnnotation(obj, 'annotations', labels[parseInt(i.toString(), 10)], true);
                obj.annotations.push(newObj);
                //Removed isBlazor code
                var segment = canvas.children[0];
                var bounds = new Rect(segment.offsetX - segment.width / 2, segment.offsetY - segment.height / 2, segment.width, segment.height);
                canvas.children.push(obj.getAnnotationElement(obj.annotations[obj.annotations.length - 1], obj.intermediatePoints, bounds, this.getDescription, this.element.id));
            }
            if (!(this.diagramActions & DiagramAction.UndoRedo) && !(this.diagramActions & DiagramAction.Group)) {
                var entry = {
                    type: 'LabelCollectionChanged', changeType: 'Insert', undoObject: cloneObject(newObj),
                    redoObject: cloneObject(obj), category: 'Internal'
                };
                this.addHistoryEntry(entry);
            }
        }
        if (labels.length > 1) {
            this.endGroupAction();
        }
        //Removed isBlazor code
        obj.wrapper.measure(new Size(canvas.width, canvas.height));
        obj.wrapper.arrange(canvas.desiredSize);
        this.updateDiagramObject(obj);
        this.protectPropertyChange(false);
        //EJ2-908488 - Added for Update annotations in overview
        this.refreshCanvasLayers();
    };
    /**
     *addChildToUmlNode - Add methods, members and attributes into a UML class runtime. \
     *
     * @returns { void } Add.
     * @param {NodeModel} node - Specifies the existing UmlClass node in the diagram to which you intend to add child elements.
     * @param {UmlClassMethodModel | UmlClassAttributeModel | UmlEnumerationMemberModel} child - Specify the child elements, such as attributes, members, or methods, to be added to the UML class.
     * @param {UmlClassChildType} umlChildType - Specify the enum that you intend to add to the UML class.
     *
     */
    Diagram.prototype.addChildToUmlNode = function (node, child, umlChildType) {
        var classifier;
        var method;
        var attribute;
        var member;
        var textWrap = 'NoWrap';
        //Members and attributes are exclusively added to the classShape and interfaceShape within the UML node
        if (node.shape.classifier === 'Class' || node.shape.classifier === 'Interface') {
            if (umlChildType === 'Method') {
                method = new UmlClassMethod(node, '', child);
                if (node.shape.classifier === 'Class') {
                    node.shape.classShape.methods.push(method);
                    classifier = node.shape.classShape;
                }
                else if (node.shape.classifier === 'Interface') {
                    node.shape.interfaceShape.methods.push(method);
                    classifier = node.shape.interfaceShape;
                }
                //this method triggers for adding methods at runtime
                getClassMembersChild(node, this, classifier, textWrap);
            }
            else if (umlChildType === 'Attribute') {
                attribute = new UmlClassAttribute(node, '', child);
                if (node.shape.classifier === 'Class') {
                    node.shape.classShape.attributes.push(attribute);
                    classifier = node.shape.classShape;
                }
                else if (node.shape.classifier === 'Interface') {
                    node.shape.interfaceShape.attributes.push(attribute);
                    classifier = node.shape.interfaceShape;
                }
                //this method triggers for adding attributes at runtime
                getClassAttributesChild(node, this, classifier, textWrap);
            }
        }
        else if (node.shape.classifier === 'Enumeration' && umlChildType === 'Member') {
            member = new UmlEnumerationMember(node, '', child);
            node.shape.enumerationShape.members.push(member);
            classifier = node.shape.enumerationShape;
            //this method triggers for adding members at runtime
            getClassNodesChild(node, this, classifier, textWrap);
        }
        //The clearSelection methods is invoked to update the newly added child type dynamically at runtime
        this.clearSelection();
        this.updateSelector();
    };
    /**
     * Dynamically add lanes to a swimlane at runtime. You can specify the swimlane (node), the lanes to be added (lane), and an optional index to determine where the lanes should be inserted. \
     *
     * @returns { void } Dynamically add lanes to a swimlane at runtime. You can specify the swimlane (node), the lanes to be added (lane), and an optional index to determine where the lanes should be inserted.\
     * @param {NodeModel} node - The swimlane to which lanes will be added.
     * @param {LaneModel[]} lane -An array of LaneModel objects representing the lanes to be added.
     * @param {number} index - The index at which the lanes should be inserted.
     *
     */
    Diagram.prototype.addLanes = function (node, lane, index) {
        node = this.nameTable[node.id] || node;
        for (var i = 0; i < lane.length; i++) {
            addLane(this, node, lane[parseInt(i.toString(), 10)], index);
            if (index !== undefined) {
                index += 1;
            }
        }
        this.updateDiagramElementQuad();
    };
    /**
     * Adds phases to a swimlane at runtime.  \
     *
     * @returns { void } Adds phases to a swimlane at runtime. \
     * @param {NodeModel} node - object representing the swimlane to which phases will be added.
     * @param {PhaseModel[]} phases - objects representing the phases to be added.
     *
     */
    Diagram.prototype.addPhases = function (node, phases) {
        node = this.nameTable[node.id] || node;
        for (var i = 0; i < phases.length; i++) {
            //897967-Exception thrown when adding Phases at runtime and perform undo Action
            this.protectPropertyChange(true);
            addPhase(this, node, phases[parseInt(i.toString(), 10)]);
            this.protectPropertyChange(false);
        }
        this.updateDiagramElementQuad();
    };
    /**
     *Removes a dynamic lane from a swimlane at runtime. \
     *
     * @returns { void } Removes a dynamic lane from a swimlane at runtime.\
     * @param {NodeModel} node - representing the swimlane to remove the lane from.
     * @param {LaneModel} lane - representing the dynamic lane to be removed.
     *
     */
    Diagram.prototype.removeLane = function (node, lane) {
        if (lane) {
            // 912168- Undoing removed lane throws exception Issue Fix
            var laneHead = this.nameTable[lane.header.id];
            this.diagramActions = this.diagramActions | DiagramAction.PublicMethod;
            removeLane(this, laneHead, node, undefined);
            this.updateDiagramElementQuad();
        }
    };
    /**
     *Removes a phase from a swimlane at runtime.\
     *
     * @returns { void } Removes a phase from a swimlane at runtime.\
     * @param {NodeModel} node - representing the swimlane to remove the phase from.
     * @param {PhaseModel} phase - representing the phase to be removed.
     *
     */
    Diagram.prototype.removePhase = function (node, phase) {
        var id = phase.header.id;
        var phaseObj = this.nameTable["" + id];
        removePhase(this, phaseObj, node);
        this.updateDiagramElementQuad();
    };
    //827745-support to edit Segment for Straight connector at runtime.
    /**
     * Used to add or remove intermediate segments to the straight connector.
     *
     * @returns { void }  Used to add or remove intermediate segments to the straight connector.
     * @param {IEditSegmentOptions} editOptions - An object containing various options for adding/removing segments.
     *
     */
    Diagram.prototype.editSegment = function (editOptions) {
        if (editOptions.connector.type === 'Straight') {
            var connector = editOptions.connector;
            var mode = editOptions && editOptions.SegmentEditing ? editOptions.SegmentEditing : 'Toggle';
            var point = editOptions.point;
            var hasPoint = void 0;
            var allowEdit = void 0;
            for (var i = 0; i < connector.segments.length; i++) {
                var segment = (connector.segments)[parseInt(i.toString(), 10)];
                if (contains(point, segment.point, connector.hitPadding)) {
                    hasPoint = true;
                    break;
                }
            }
            if ((hasPoint && mode === 'Remove') || (!hasPoint && mode === 'Add')) {
                allowEdit = true;
            }
            if ((connector.type === 'Straight') && (allowEdit || mode === 'Toggle')) {
                this.connectorEditingToolModule.addOrRemoveSegment(connector, point, this.commandHandler);
            }
        }
    };
    Diagram.prototype.removelabelExtension = function (obj, labels, j, wrapper) {
        for (var i = 0; i < wrapper.children.length; i++) {
            var canvas = wrapper.children[parseInt(i.toString(), 10)];
            if ((canvas instanceof TextElement) || (canvas instanceof DiagramHtmlElement)) {
                if (canvas.id.match('_' + labels[parseInt(j.toString(), 10)].id + '$')) {
                    for (var k = 0; k < obj.annotations.length; k++) {
                        if (canvas.id.match('_' + obj.annotations[parseInt(k.toString(), 10)].id + '$')) {
                            if (!(this.diagramActions & DiagramAction.UndoRedo)) {
                                var entry = {
                                    type: 'LabelCollectionChanged', changeType: 'Remove', undoObject: cloneObject(obj.annotations[parseInt(k.toString(), 10)]),
                                    redoObject: cloneObject(obj), category: 'Internal'
                                };
                                this.addHistoryEntry(entry);
                            }
                            obj.annotations.splice(k, 1);
                        }
                    }
                    wrapper.children.splice(i, 1);
                    if (this.mode === 'SVG') {
                        var element = getDiagramElement(canvas.id, this.element.id);
                        if (element) {
                            var element_1 = getDiagramElement(canvas.id, this.element.id);
                            element_1.parentNode.removeChild(element_1);
                        }
                        var textElement = getDiagramElement(canvas.id + '_text', this.element.id);
                        if (textElement) {
                            element = getDiagramElement(canvas.id + '_text', this.element.id);
                            element.parentNode.removeChild(element);
                        }
                        var htmlElement = getDiagramElement(canvas.id + '_html_element', this.element.id);
                        if (htmlElement) {
                            htmlElement.parentNode.removeChild(htmlElement);
                        }
                    }
                    else {
                        this.refreshCanvasLayers();
                    }
                }
            }
        }
    };
    /**
     * Removes labels from a node or connector at runtime. \
     *
     * @returns { string }    Removes labels from a node or connector at runtime. \
     * @param { Node | ConnectorModel} obj - Representing the node or connector to remove labels from.
     * @param {ShapeAnnotationModel[] | PathAnnotationModel[]} labels - objects representing the labels to be removed.
     *
     */
    Diagram.prototype.removeLabels = function (obj, labels) {
        var isAddLabelInServer = true;
        //Removed isBlazor code
        obj = this.nameTable[obj.id] || obj;
        // Removed isBlazor code
        if (labels.length > 1) {
            this.startGroupAction();
        }
        for (var j = labels.length - 1; j >= 0; j--) {
            if (obj.children && obj.children.length > 0) {
                //Bug 886881: Exception throws while ungrouping a group node with annotations.
                //Added the condition to check the wrapper id is same as the obj id to remove the group node label alone while unGroup.
                var groupWrapper = obj.wrapper.children.filter(function (wrapper) { return wrapper.id === obj.id + 'group_container'; });
                if (groupWrapper && groupWrapper.length > 0) {
                    this.removelabelExtension(obj, labels, j, groupWrapper[0]);
                }
            }
            else {
                this.removelabelExtension(obj, labels, j, obj.wrapper);
            }
        }
        if (labels.length > 1) {
            this.endGroupAction();
        }
        //EJ2-908488 - Added for Update annotations in overview
        this.refreshCanvasLayers();
    };
    Diagram.prototype.removePortsExtenion = function (obj, ports, j, wrapper) {
        for (var i = 0; i < wrapper.children.length; i++) {
            var canvas = wrapper.children[parseInt(i.toString(), 10)];
            if (canvas instanceof PathElement) {
                if (canvas.id.match('_' + ports[parseInt(j.toString(), 10)].id + '$')) {
                    for (var k = 0; k < obj.ports.length; k++) {
                        if (canvas.id.match('_' + obj.ports[parseInt(k.toString(), 10)].id + '$')) {
                            if (!(this.diagramActions & DiagramAction.UndoRedo)) {
                                var entry = {
                                    type: 'PortCollectionChanged', changeType: 'Remove', undoObject: cloneObject(obj.ports[parseInt(k.toString(), 10)]),
                                    redoObject: cloneObject(obj), category: 'Internal'
                                };
                                this.addHistoryEntry(entry);
                            }
                            obj.ports.splice(k, 1);
                        }
                    }
                    wrapper.children.splice(i, 1);
                    if (this.mode === 'SVG') {
                        var element = getDiagramElement(canvas.id, this.element.id);
                        // 905159: undo redo the multi-node after the group and ungrouping the multi nodes Issue fix
                        if (element) {
                            element.parentNode.removeChild(element);
                        }
                    }
                    else {
                        this.refreshCanvasLayers();
                    }
                }
            }
        }
    };
    /**
     * Removes Ports at run time. \
     *
     * @returns { void } Removes Ports at run time.\
     * @param {Node} obj - The node or connector to remove ports from.
     * @param {PointPortModel[]} ports - An array of ports to be removed.
     *
     */
    Diagram.prototype.removePorts = function (obj, ports) {
        var isAddPortInServer = true;
        //Removed isBlazor code
        obj = this.nameTable[obj.id] || obj;
        var portLength = ports.length;
        //Removed isBlazor code
        if (portLength > 1) {
            this.startGroupAction();
        }
        for (var j = ports.length - 1; j >= 0; j--) {
            if (obj.children && obj.children.length > 0) {
                for (var k = 0; k < obj.wrapper.children.length; k++) {
                    //EJ2-66928 Bug- added for ungroup Issue to only remove the grouping ports and not to remove ports of the children nodes
                    var wrapper = obj.wrapper.children[parseInt(k.toString(), 10)];
                    if ((wrapper.id).match(obj.wrapper.id)) {
                        this.removePortsExtenion(obj, ports, j, obj.wrapper.children[parseInt(k.toString(), 10)]);
                    }
                }
            }
            else {
                this.removePortsExtenion(obj, ports, j, obj.wrapper);
            }
        }
        if (portLength > 1) {
            this.endGroupAction();
        }
    };
    //public methods - end region
    /**
     * getSizeValue method \
     *
     * @returns { string }     getSizeValue method .\
     * @param {string | number} real - provide the real value.
     * @param {string | number} rulerSize - provide the rulerSize value.
     *
     * @private
     */
    Diagram.prototype.getSizeValue = function (real, rulerSize) {
        var value;
        if (real.toString().indexOf('px') > 0) {
            value = real.toString();
        }
        else if (real.toString().indexOf('%') > 0) {
            value = rulerSize !== undefined ? '100%' : real.toString();
        }
        else {
            value = real.toString() + 'px';
        }
        if (rulerSize) {
            var position = getRulerSize(this);
            value = 'calc(' + value + ' - ' + rulerSize + 'px)';
        }
        return value;
    };
    Diagram.prototype.renderRulers = function () {
        if (this.rulerSettings.showRulers) {
            renderOverlapElement(this);
            renderRuler(this, true);
            renderRuler(this, false);
        }
        else {
            removeRulerElements(this);
        }
    };
    Diagram.prototype.intOffPageBackground = function () {
        var position = new Size();
        position = getRulerSize(this);
        var element = document.getElementById(this.element.id + 'content');
        //Task 913515: Handle null properties for diagram and barcode properties-phase1
        if (!this.width) {
            this.width = '100%';
        }
        if (!this.height) {
            this.height = '100%';
        }
        var width = this.getSizeValue(this.width, position.width);
        var height = this.getSizeValue(this.height, position.height);
        var style = this.rulerSettings.showRulers ?
            'width:' + width + '; height:' + height + ';' +
                'top:' + position.height + 'px;left:' + position.width + 'px;' +
                'overflow: scroll;position:absolute;overflow:auto;' :
            'width:' + width + '; height:' + height + ';position:absolute;' +
                ' left:0px;  top:0px;overflow: auto;';
        var attr = {
            'id': this.element.id + 'content',
            'tabindex': '0',
            'style': style
        };
        if (!element) {
            this.diagramCanvas = createHtmlElement('div', attr);
            this.element.appendChild(this.diagramCanvas);
        }
        else {
            this.diagramCanvas = element;
            applyStyleAgainstCsp(this.diagramCanvas, style);
        }
        this.diagramCanvas.style.background = this.backgroundColor;
    };
    Diagram.prototype.initDiagram = function () {
        this.intOffPageBackground();
        setAttributeHtml(this.element, {
            style: 'width:' + this.getSizeValue(this.width) + '; height:'
                + this.getSizeValue(this.height) + ';position:relative;overflow:hidden;'
        });
    };
    Diagram.prototype.renderHiddenUserHandleTemplateLayer = function (bounds) {
        //let element: HTMLElement;
        var attributes = {
            'class': this.element.id + '_hiddenUserHandleTemplate',
            'style': 'width:' + bounds.width + 'px; height:' + bounds.height + 'px;' + 'visibility:hidden ;  overflow: hidden;'
        };
        var element = createHtmlElement('div', attributes);
        this.element.appendChild(element);
    };
    Diagram.prototype.renderBackgroundLayer = function (bounds, commonStyle) {
        var bgLayer = this.createSvg(this.element.id + '_backgroundLayer_svg', bounds.width, bounds.height);
        applyStyleAgainstCsp(bgLayer, commonStyle);
        var backgroundImage = createSvgElement('g', {
            'id': this.element.id + '_backgroundImageLayer',
            'class': 'e-background-image-layer'
        });
        bgLayer.appendChild(backgroundImage);
        var attr = { 'id': this.element.id + '_backgroundLayer', 'class': 'e-background-layer' };
        var background = createSvgElement('g', attr);
        bgLayer.appendChild(background);
        this.diagramCanvas.appendChild(bgLayer);
    };
    Diagram.prototype.renderGridLayer = function (bounds, commonStyle) {
        var svgGridSvg = this.createSvg(this.element.id + '_gridline_svg', bounds.width, bounds.height);
        svgGridSvg.setAttribute('class', 'e-grid-layer');
        var svgGrid = createSvgElement('g', { 'id': this.element.id + '_gridline' });
        var rect = createSvgElement('rect', {
            'id': this.element.id + '_grid_rect', 'x': '0', 'y': '0', 'width': '100%', 'height': '100%'
        });
        if (checkBrowserInfo()) {
            //EJ2-832888-To remove the black grid lines appearing in the safari browser.
            var url = new URL(window.location.href);
            // Check if the URL contains a query string
            if (url.search !== '') {
                rect.setAttribute('fill', 'url(#' + this.element.id + '_pattern)');
            }
            else {
                rect.setAttribute('fill', 'url(' + location.protocol + '//' + location.host + location.pathname +
                    '#' + this.element.id + '_pattern)');
            }
        }
        else {
            rect.setAttribute('fill', 'url(#' + this.element.id + '_pattern)');
        }
        svgGrid.appendChild(rect);
        svgGridSvg.appendChild(svgGrid);
        this.diagramCanvas.appendChild(svgGridSvg);
        setAttributeSvg(svgGridSvg, { 'style': commonStyle });
    };
    Diagram.prototype.renderDiagramLayer = function (bounds, commonStyle) {
        var attributes = {
            'id': this.element.id + '_diagramLayer_div',
            'style': 'width:' + bounds.width + 'px; height:' + bounds.height + 'px;' + commonStyle
        };
        this.diagramLayerDiv = createHtmlElement('div', attributes);
        if (this.mode === 'SVG') {
            var diagramSvg = this.createSvg(this.element.id + '_diagramLayer_svg', bounds.width, bounds.height);
            diagramSvg.style['pointer-events'] = 'none';
            diagramSvg.setAttribute('class', 'e-diagram-layer');
            var diagramLayer = createSvgElement('g', { 'id': this.element.id + '_diagramLayer' });
            var transformationLayer = createSvgElement('g', {});
            this.diagramLayer = diagramLayer;
            diagramSvg.style['pointer-events'] = 'all';
            transformationLayer.appendChild(diagramLayer);
            diagramSvg.appendChild(transformationLayer);
            this.diagramLayerDiv.appendChild(diagramSvg);
        }
        else {
            this.diagramLayer = CanvasRenderer.createCanvas(this.element.id + '_diagram', bounds.width, bounds.height);
            applyStyleAgainstCsp(this.diagramLayer, 'position:absolute;left:0px;top:0px;');
            this.diagramLayerDiv.appendChild(this.diagramLayer);
        }
        this.diagramCanvas.appendChild(this.diagramLayerDiv);
    };
    Diagram.prototype.initLayers = function () {
        var commonStyle = 'position:absolute;top:0px;left:0px;overflow:hidden;pointer-events:none;';
        var container = document.getElementById(this.element.id);
        var bounds = container.getBoundingClientRect();
        //Task 918932: Provide diagram control in powerapps- phase2
        this.setScaleFromElement(bounds, container);
        this.modifyBounds(bounds);
        var scrollerSize = getScrollerWidth();
        this.scroller.scrollerWidth = scrollerSize;
        this.scroller.setViewPortSize(bounds.width, bounds.height);
        this.renderRulers();
        var measureWindowElement = 'measureElement';
        if (window["" + measureWindowElement]) {
            window["" + measureWindowElement] = null;
            var measureElements = document.getElementById('measureElement');
            measureElements.remove();
        }
        createMeasureElements();
        // this.renderBackgroundImageLayer(bounds, commonStyle);
        this.renderBackgroundLayer(bounds, commonStyle);
        this.renderGridLayer(bounds, commonStyle);
        this.renderDiagramLayer(bounds, commonStyle);
        this.renderHTMLLayer(bounds, commonStyle);
        this.renderPortsExpandLayer(bounds, commonStyle);
        this.renderNativeLayer(bounds, commonStyle);
        this.renderAdornerLayer(bounds, commonStyle);
        this.renderHiddenUserHandleTemplateLayer(bounds);
    };
    /**
     * @private
     * @param { ClientRect } bounds - provide the bounds value
     * @param { HTMLElement } container - provide the container value
     * @returns { void }
     *
     */
    Diagram.prototype.setScaleFromElement = function (bounds, container) {
        var width = bounds.width / container.clientWidth;
        this.scaleValue = width;
    };
    /**
     * @private
     * @returns { void }
     * @param { any } bounds - provide the bounds value
     */
    Diagram.prototype.modifyBounds = function (bounds) {
        var scale = this.scaleValue;
        bounds.x = bounds.x / scale;
        bounds.y = bounds.y / scale;
        bounds.width = bounds.width / scale;
        bounds.height = bounds.height / scale;
    };
    /**
     * @private
     * @returns { number } - Returns offset value
     * @param { number } offset - provide the offset value
     * @param { boolean } isTooltipOffset - provide the isTooltipOffset value
     *
     */
    Diagram.prototype.modifyClientOffset = function (offset, isTooltipOffset) {
        var scale = this.scaleValue;
        var value = 0;
        if (isTooltipOffset) {
            value = offset * scale;
        }
        else {
            value = offset / scale;
        }
        return value;
    };
    Diagram.prototype.renderAdornerLayer = function (bounds, commonStyle) {
        var divElement = createHtmlElement('div', {
            'id': this.element.id + '_diagramAdornerLayer',
            'style': 'width:' + bounds.width + 'px;height:' + bounds.height + 'px;' + commonStyle
        });
        var element = createHtmlElement('div', {
            'id': this.element.id + '_diagramUserHandleLayer',
            'style': 'width:' + bounds.width + 'px;height:' + bounds.height + 'px;' + commonStyle
        });
        element.setAttribute('class', 'e-userHandle-layer');
        divElement.appendChild(element);
        var svgAdornerSvg = this.createSvg(this.element.id + '_diagramAdorner_svg', bounds.width, bounds.height);
        svgAdornerSvg.setAttribute('class', 'e-adorner-layer');
        svgAdornerSvg.style['pointer-events'] = 'none';
        this.adornerLayer = createSvgElement('g', { 'id': this.element.id + '_diagramAdorner' });
        this.adornerLayer.style[' pointer-events'] = 'all';
        svgAdornerSvg.appendChild(this.adornerLayer);
        divElement.appendChild(svgAdornerSvg);
        this.diagramCanvas.appendChild(divElement);
        var svgSelector = createSvgElement('g', { 'id': this.element.id + '_SelectorElement' });
        this.adornerLayer.appendChild(svgSelector);
        setAttributeSvg(svgAdornerSvg, { style: 'pointer-events:none;' });
    };
    Diagram.prototype.renderPortsExpandLayer = function (bounds, commonStyle) {
        var svgPortsSvg = this.createSvg(this.element.id + '_diagramPorts_svg', bounds.width, bounds.height);
        svgPortsSvg.setAttribute('class', 'e-ports-expand-layer');
        var svgPortsLayer = createSvgElement('g', {
            'id': this.element.id + '_diagramPorts',
            'class': 'e-ports-layer',
            'style': 'pointer-events: all;'
        });
        svgPortsSvg.appendChild(svgPortsLayer);
        var svgExpandLayer = createSvgElement('g', {
            'id': this.element.id + '_diagramExpander',
            'class': 'e-expand-layer',
            'style': 'pointer-events: all;'
        });
        svgPortsSvg.appendChild(svgExpandLayer);
        this.diagramCanvas.appendChild(svgPortsSvg);
        setAttributeSvg(svgPortsSvg, { 'style': commonStyle });
    };
    Diagram.prototype.renderHTMLLayer = function (bounds, commonStyle) {
        this.htmlLayer = createHtmlElement('div', {
            'id': this.element.id + '_htmlLayer',
            'style': 'width:' + bounds.width + 'px; height:' + bounds.height + 'px;position:absolute;top:0px;' +
                'left:0px;overflow:hidden;pointer-events:none;',
            'class': 'e-html-layer'
        });
        var htmlLayerDiv = createHtmlElement('div', {
            'id': this.element.id + '_htmlLayer_div',
            'style': 'position:absolute;top:0px;left:0px;pointer-events:all;'
        });
        this.htmlLayer.appendChild(htmlLayerDiv);
        this.diagramCanvas.appendChild(this.htmlLayer);
    };
    Diagram.prototype.renderNativeLayer = function (bounds, commonStyle) {
        var nativeLayerSvg = this.createSvg(this.element.id + '_nativeLayer_svg', bounds.width, bounds.height);
        var nativeLayer = createSvgElement('g', { 'id': this.element.id + '_nativeLayer', 'style': 'pointer-events:all;' });
        nativeLayerSvg.appendChild(nativeLayer);
        this.diagramLayerDiv.appendChild(nativeLayerSvg);
        setAttributeSvg(nativeLayerSvg, { 'class': 'e-native-layer', 'style': commonStyle });
    };
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
    Diagram.prototype.createSvg = function (id, width, height) {
        var svgObj = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        setAttributeSvg(svgObj, { 'id': id, 'width': width, 'height': height });
        return svgObj;
    };
    Diagram.prototype.updateBazorShape = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[parseInt(i.toString(), 10)];
            switch (node.shape.type) {
                case 'Bpmn':
                    node.shape.bpmnShape =
                        node.shape.shape;
                    break;
                case 'UmlActivity':
                    node.shape.umlActivityShape =
                        node.shape.shape;
                    break;
                case 'Flow':
                    node.shape.flowShape =
                        node.shape.shape;
                    break;
                case 'Basic':
                    node.shape.basicShape =
                        node.shape.shape;
                    break;
                case 'Text':
                    node.shape.textContent =
                        node.shape.content;
                    break;
            }
        }
    };
    Diagram.prototype.initObjects = function (isLoad) {
        this.updateBazorShape();
        if (!this.isLoading) {
            this.initData();
        }
        this.initLayerObjects();
        this.updateBridging(isLoad);
    };
    /**
     * initLayerObjects method \
     *
     * @returns { void }     initLayerObjects method .\
     *
     * @private
     */
    Diagram.prototype.initLayerObjects = function () {
        var hasLayers = this.layers.length > 1; //const set: boolean = false;
        var connectors = [];
        var blazor = 'Blazor';
        //Removed isBlazor code
        var tempTabel = {};
        var bpmnTable = {};
        var tempNode = [];
        var groups = [];
        var i = 0;
        var previousNodeObject = [];
        var previousConnectorObject = [];
        var updateNodeObject = [];
        var updateConnectorObject = [];
        var changeNodes = [];
        var changeConnectors = [];
        //Removed isBlazor code
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.id = obj.id || randomId();
            this.addToLayer(obj, hasLayers);
            tempTabel[obj.id] = obj;
        }
        for (var _b = 0, _c = this.connectors; _b < _c.length; _b++) {
            var obj = _c[_b];
            obj.id = obj.id || randomId();
            this.addToLayer(obj, hasLayers);
            tempTabel[obj.id] = obj;
        }
        for (var _d = 0, _e = this.layers; _d < _e.length; _d++) {
            var layer = _e[_d];
            for (var _f = 0, _g = layer.objects; _f < _g.length; _f++) {
                var obj = _g[_f];
                if (tempTabel["" + obj]) {
                    if (!(tempTabel["" + obj] instanceof Connector)) {
                        if (tempTabel["" + obj].children) {
                            groups.push(obj);
                        }
                        else if ((tempTabel["" + obj].shape instanceof BpmnShape) &&
                            tempTabel["" + obj].shape.activity.subProcess.processes &&
                            tempTabel["" + obj].shape.activity.subProcess.processes.length > 0) {
                            bpmnTable[tempTabel["" + obj].id] = obj;
                        }
                        else {
                            this.initNodes(tempTabel["" + obj], layer);
                        }
                    }
                    else {
                        var connector = tempTabel["" + obj];
                        if (connector.sourceID && connector.targetID) {
                            var sourceNode = tempTabel[connector.sourceID];
                            var targetNode = tempTabel[connector.targetID];
                            var flag = true;
                            if (this.isLoading && ((sourceNode && sourceNode.children && sourceNode.children.length > 0) ||
                                (targetNode && targetNode.children && targetNode.children.length > 0))) {
                                flag = false;
                            }
                            if ((sourceNode && sourceNode.wrapper && targetNode && targetNode.wrapper) && flag) {
                                this.initConnectors(tempTabel["" + obj], layer);
                            }
                            else {
                                connectors.push(tempTabel["" + obj]);
                            }
                        }
                        else {
                            // 908150: Connector not rendered properly when one end is a group and other end is an endpoint
                            var sourceNode = tempTabel[connector.sourceID];
                            var targetNode = tempTabel[connector.targetID];
                            if ((sourceNode && sourceNode.children && sourceNode.children.length > 0) ||
                                (targetNode && targetNode.children && targetNode.children.length > 0)) {
                                connectors.push(tempTabel["" + obj]);
                            }
                            else {
                                this.initConnectors(tempTabel["" + obj], layer);
                            }
                        }
                    }
                }
            }
            // 930450: Diagram Taking Too Long to Load Due to Complex Hierarchical Tree Layout with Path Nodes
            if (this.pathDataStorage) {
                this.pathDataStorage.clear();
            }
            if (this.bpmnModule) {
                for (var _h = 0, _j = this.bpmnModule.bpmnTextAnnotationConnector; _h < _j.length; _h++) {
                    var obj = _j[_h];
                    this.initConnectors(obj, undefined, true);
                }
            }
        }
        for (var _k = 0, _l = Object.keys(bpmnTable); _k < _l.length; _k++) {
            var obj = _l[_k];
            this.initObject(tempTabel["" + obj]);
            this.bpmnModule.updateDocks(tempTabel["" + obj], this);
        }
        var alignedGroups = this.alignGroup(groups, tempTabel);
        for (var _m = 0, alignedGroups_1 = alignedGroups; _m < alignedGroups_1.length; _m++) {
            var obj = alignedGroups_1[_m];
            var layer = this.commandHandler.getObjectLayer(obj);
            this.initNodes(tempTabel["" + obj], layer);
        }
        for (var _o = 0, connectors_1 = connectors; _o < connectors_1.length; _o++) {
            var connector = connectors_1[_o];
            var layer = this.commandHandler.getObjectLayer(connector.id);
            this.initConnectors(connector, layer);
        }
        //Removed isBlazor code
    };
    Diagram.prototype.alignGroup = function (parents, tempTabel) {
        var newList = [];
        var parentist = [];
        var child;
        var childNode;
        var i;
        var j;
        for (i = 0; i < parents.length; i++) {
            child = parents[parseInt(i.toString(), 10)];
            childNode = tempTabel["" + child];
            var node = void 0;
            if (childNode && childNode.children.length) {
                for (j = 0; j < childNode.children.length; j++) {
                    node = childNode.children[parseInt(j.toString(), 10)];
                    if (parents.indexOf(node) > -1 && (newList.indexOf(node) === -1) &&
                        (parentist.indexOf(node) === -1)) {
                        newList.splice(0, 0, node);
                    }
                }
            }
            if (newList.indexOf(child) === -1) {
                parentist.push(child);
            }
        }
        newList = newList.concat(parentist);
        return newList;
    };
    Diagram.prototype.addToLayer = function (obj, hasLayers) {
        var layer;
        var isSourceId = false;
        var isTargetId = false;
        if (hasLayers) {
            layer = this.commandHandler.getObjectLayer(obj.id);
        }
        if (!hasLayers || !layer) {
            if (this.activeLayer.objects.indexOf(obj.id) === -1) {
                this.activeLayer.objects.push(obj.id);
            }
        }
        if ((obj instanceof Node || obj instanceof Connector) &&
            (obj.shape.type !== 'SwimLane' || (obj.children && obj.children.length > 0))) {
            if (obj.parentId) {
                var zIndex = this.swimlaneZIndexTable[obj.parentId];
                //EJ2-69247 - Unable to select node in swimlane after save and load
                var childzIndex = this.swimlaneChildTable[obj.id];
                if ((zIndex && zIndex !== -1) || ((childzIndex && childzIndex !== -1))) {
                    obj.zIndex = this.swimlaneChildTable[obj.id];
                }
            }
            if (obj instanceof Connector && (obj.sourceID && obj.targetID)) {
                //EJ2-69577 - We have removed findNodeInLane method to improve the performance.
                if (this.activeLayer.objects.indexOf(obj.sourceID) !== -1 &&
                    this.activeLayer.objects.indexOf(obj.targetID) !== -1) {
                    this.setZIndex(layer || this.activeLayer, obj);
                }
            }
            else {
                this.setZIndex(layer || this.activeLayer, obj);
            }
        }
    };
    Diagram.prototype.updateLayer = function (newProp) {
        for (var _i = 0, _a = Object.keys(newProp.layers); _i < _a.length; _i++) {
            var key = _a[_i];
            var layerObject = this.layers["" + key].objects;
            for (var _b = 0, layerObject_1 = layerObject; _b < layerObject_1.length; _b++) {
                var obj = layerObject_1[_b];
                var node = this.nameTable["" + obj];
                if (newProp.layers["" + key].visible !== undefined) {
                    this.updateElementVisibility(node.wrapper, node, newProp.layers["" + key].visible);
                }
                else if (newProp.layers["" + key].lock === true) {
                    this.unSelect(node);
                }
            }
            if (newProp.layers["" + key].lock !== undefined) {
                this.layers["" + key].lock = newProp.layers["" + key].lock;
            }
        }
        if (this.mode !== 'SVG') {
            this.refreshDiagramLayer();
        }
    };
    Diagram.prototype.updateScrollSettings = function (newProp) {
        var hPan = (-this.scroller.horizontalOffset + newProp.scrollSettings.horizontalOffset || 0);
        var vPan = (-this.scroller.verticalOffset + newProp.scrollSettings.verticalOffset || 0);
        var oldValue = {
            VerticalOffset: this.scrollSettings.verticalOffset, HorizontalOffset: this.scrollSettings.horizontalOffset,
            ViewportHeight: this.scrollSettings.viewPortHeight, ViewportWidth: this.scrollSettings.viewPortWidth,
            CurrentZoom: this.scroller.currentZoom
        };
        if (hPan !== 0 || vPan !== 0) {
            this.pan(hPan, vPan);
        }
        var newValue = {
            VerticalOffset: this.scrollSettings.verticalOffset, HorizontalOffset: this.scrollSettings.horizontalOffset,
            ViewportHeight: this.scrollSettings.viewPortHeight, ViewportWidth: this.scrollSettings.viewPortWidth,
            CurrentZoom: this.scroller.currentZoom
        };
        var panStatus = 'Start';
        if (this.realActions & RealAction.PanInProgress) {
            panStatus = 'Progress';
        }
        var arg = {
            oldValue: oldValue,
            newValue: newValue, source: this,
            panState: panStatus
        };
        //Removed isBlazor code
        this.triggerEvent(DiagramEvent.scrollChange, arg);
        this.commandHandler.updatePanState(true);
        if (this.mode === 'Canvas' && (this.constraints & DiagramConstraints.Virtualization)) {
            this.refreshDiagramLayer();
        }
    };
    Diagram.prototype.initData = function () {
        var dataSourceSettings = this.dataSourceSettings.dataManager || this.dataSourceSettings.dataSource;
        var adapter = 'adaptorName';
        if (this.dataBindingModule && !(this.realActions & RealAction.PreventDataInit)) {
            if (dataSourceSettings && this.dataSourceSettings.connectionDataSource.dataManager) {
                var dataManager = this.dataSourceSettings.dataManager || this.dataSourceSettings.dataSource;
                this.nodes = this.generateData(dataManager, true);
                this.connectors = this.generateData(this.dataSourceSettings.connectionDataSource.dataManager, false);
            }
            else if (dataSourceSettings && dataSourceSettings.dataSource &&
                (dataSourceSettings.dataSource.url || (dataSourceSettings["" + adapter] === 'BlazorAdaptor' &&
                    !dataSourceSettings.dataSource.url))) {
                this.dataBindingModule.initSource(this.dataSourceSettings, this);
            }
            else {
                this.dataBindingModule.initData(this.dataSourceSettings, this);
            }
        }
        else if (dataSourceSettings && !this.dataBindingModule) {
            console.warn('[WARNING] :: Module "DataBinding" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
    };
    Diagram.prototype.generateData = function (dataSource, isNode) {
        var nodes = [];
        var i;
        for (i = 0; i < dataSource.length; i++) {
            var row = dataSource[parseInt(i.toString(), 10)];
            var node = isNode ? this.makeData(row, true) : this.makeData(row, false);
            if (node && node.id && (!findNodeByName(nodes, node.id))) {
                nodes.push(node);
            }
        }
        return (nodes);
    };
    Diagram.prototype.makeData = function (row, isNode) {
        var i;
        var fields = isNode ? this.dataSourceSettings : this.dataSourceSettings.connectionDataSource;
        var data = {};
        data.id = row[fields.id] ? row[fields.id] : randomId();
        if (fields.sourceID) {
            data.sourceID = row[fields.sourceID];
        }
        if (fields.targetID) {
            data.targetID = row[fields.targetID];
        }
        if (row[fields.sourcePointX] && row[fields.sourcePointY]) {
            data.sourcePoint = { 'x': Number(row[fields.sourcePointX]), 'y': Number(row[fields.sourcePointY]) };
        }
        if (row[fields.targetPointX] && row[fields.targetPointY]) {
            data.targetPoint = { 'x': Number(row[fields.targetPointX]), 'y': Number(row[fields.targetPointY]) };
        }
        if (fields.crudAction.customFields && fields.crudAction.customFields.length > 0) {
            for (i = 0; i < fields.crudAction.customFields.length; i++) {
                data[fields.crudAction.customFields[parseInt(i.toString(), 10)]]
                    = row[fields.crudAction.customFields[parseInt(i.toString(), 10)]];
            }
        }
        return data;
    };
    Diagram.prototype.initNodes = function (obj, layer) {
        this.preventDiagramUpdate = true;
        this.initObject(obj, layer);
        this.preventDiagramUpdate = false;
    };
    Diagram.prototype.initConnectors = function (obj, layer, independentObj) {
        this.preventDiagramUpdate = true;
        this.initObject(obj, layer, independentObj);
        this.updateEdges(obj);
        this.preventDiagramUpdate = false;
    };
    Diagram.prototype.setZIndex = function (layer, obj) {
        //should be changed
        var currentLayer = layer;
        if ((obj).zIndex === Number.MIN_VALUE) {
            while (currentLayer.zIndexTable[currentLayer.objectZIndex + 1]) {
                layer.objectZIndex++;
            }
            // obj.zIndex = ++currentLayer.objectZIndex;
            this.setIndex(layer, obj);
        }
        else {
            var index = (obj.zIndex !== null ? obj.zIndex : currentLayer.objectZIndex + 1);
            if (currentLayer.zIndexTable[parseInt(index.toString(), 10)]) {
                var tabelLength = Object.keys(currentLayer.zIndexTable).length;
                var j = 0;
                for (var i = 0; i < tabelLength; i++) {
                    if (i === index) {
                        for (var j_1 = tabelLength; j_1 > index; j_1--) {
                            currentLayer.zIndexTable[parseInt(j_1.toString(), 10)] = currentLayer.zIndexTable[j_1 - 1];
                            if (this.nameTable[currentLayer.zIndexTable[parseInt(j_1.toString(), 10)]]) {
                                this.nameTable[currentLayer.zIndexTable[parseInt(j_1.toString(), 10)]].zIndex = j_1;
                            }
                        }
                        currentLayer.zIndexTable[parseInt(i.toString(), 10)] = obj.id;
                    }
                    j++;
                }
            }
        }
    };
    Diagram.prototype.setIndex = function (layer, obj) {
        var _this = this;
        // Helper function to assign object zIndex and increment the objectZIndex of layer
        var assignZIndex = function (element) {
            element.zIndex = ++layer.objectZIndex;
            if ((element.shape.type === 'Bpmn' && element.shape.activity &&
                element.shape.activity.subProcess && element.shape.activity.subProcess.processes &&
                element.shape.activity.subProcess.processes.length)) {
                var processArray = element.shape.activity.subProcess.processes;
                processArray.forEach(function (processId) {
                    var processess = _this.nameTable["" + processId];
                    if (processess) {
                        processess.zIndex = ++layer.objectZIndex;
                    }
                });
            }
        };
        // Function to handle updating zIndex for child elements
        var updateChildIndex = function (childId) {
            // Find if the child is a node or a connector
            var childNode = _this.nodes.find(function (node) { return node.id === childId; });
            var childConnector = _this.connectors.find(function (connector) { return connector.id === childId; });
            if (childNode) {
                if (childNode.children && childNode.children.length > 0) {
                    // Recursively update the z-index for children of group nodes
                    _this.setIndex(layer, childNode);
                }
                else {
                    // Assign zIndex to non-group child node
                    assignZIndex(childNode);
                }
            }
            else if (childConnector) {
                // Assign zIndex to child connector
                assignZIndex(childConnector);
            }
        };
        // check object is present in current layer
        var currentLayerObject = layer.objects.find(function (object) { return object === obj.id; });
        if (currentLayerObject) {
            if (obj instanceof Node) {
                // Assign zIndex to group or standalone node
                assignZIndex(obj);
                if (obj.children && obj.children.length > 0) {
                    // Update zIndex for each child if there are children
                    for (var k = 0; k < obj.children.length; k++) {
                        updateChildIndex(obj.children[parseInt(k.toString(), 10)]);
                    }
                }
            }
            else {
                // Assign zIndex to a connector
                assignZIndex(obj);
            }
        }
    };
    Diagram.prototype.initializeDiagramLayers = function () {
        //const tempLayers: LayerModel[] = this.layers;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[parseInt(i.toString(), 10)].zIndex !== -1) {
                var temp = this.layers[parseInt(i.toString(), 10)];
                this.layers[parseInt(i.toString(), 10)] = this.layers[this.layers[parseInt(i.toString(), 10)].zIndex];
                this.layers[temp.zIndex] = temp;
            }
        }
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            layer.zIndex = layer.zIndex !== -1 ? layer.zIndex : this.layers.indexOf(layer);
            this.layerZIndexTable[layer.zIndex] = layer.id;
        }
        for (var i = 0; i < this.layers.length; i++) {
            for (var j = i + 1; j < this.layers.length; j++) {
                if (this.layers[parseInt(i.toString(), 10)].zIndex > this.layers[parseInt(j.toString(), 10)].zIndex) {
                    var temp = this.layers[parseInt(i.toString(), 10)];
                    this.layers[parseInt(i.toString(), 10)] = this.layers[parseInt(j.toString(), 10)];
                    this.layers[parseInt(j.toString(), 10)] = temp;
                }
            }
        }
        if (this.layers.length === 0) {
            var defaultLayer = {
                id: 'default_layer', visible: true, lock: false, objects: [], zIndex: 0,
                objectZIndex: -1, zIndexTable: {}
            };
            this.commandHandler.addLayer(defaultLayer, null, true);
        }
        this.setActiveLayer(this.layers[this.layers.length - 1].id);
    };
    /**
     * resetTool method \
     *
     * @returns { void }     resetTool method .\
     *
     * @private
     */
    Diagram.prototype.resetTool = function () {
        this.eventHandler.resetTool();
    };
    Diagram.prototype.initObjectExtend = function (obj, layer, independentObj) {
        if (independentObj) {
            var checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, obj.wrapper.bounds, true);
            //EJ2-71853 - Need to improve performance of diagram while rendering large number of nodes and connectors.
            // Removed the for loop which is iterating through the zindex table and removing the object from the table as it is not covered in any scenario.
            //EJ2-840575 - Order commands not working between Swimlane and other nodes while drag and drop from the palette
            if (obj.shape.type === 'SwimLane') {
                for (var i = 0, a = Object.keys(layer.zIndexTable); i < a.length; i++) {
                    if (layer.zIndexTable[a[parseInt(i.toString(), 10)]] &&
                        layer.zIndexTable[a[parseInt(i.toString(), 10)]] === obj.id) {
                        delete layer.zIndexTable[a[parseInt(i.toString(), 10)]];
                    }
                }
            }
            layer.zIndexTable[obj.zIndex] = obj.id;
            if (!checkBoundaryConstraints) {
                var node = obj instanceof Node ? this.nodes : this.connectors;
                for (var i = 0; i <= node.length; i++) {
                    if (node[parseInt(i.toString(), 10)] && obj.id
                        === node[parseInt(i.toString(), 10)].id) {
                        node.splice(i, 1);
                    }
                }
                delete layer.zIndexTable[obj.zIndex];
            }
        }
    };
    /* tslint:disable */
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
    Diagram.prototype.initObject = function (obj, layer, independentObj, group) {
        if (independentObj === void 0) { independentObj = true; }
        if (obj !== undefined) {
            if (independentObj) {
                if (!layer) {
                    this.addToLayer(obj, false);
                    layer = this.activeLayer;
                }
                //Move the common properties like zindex and id to an abstract class
                if ((obj instanceof Node || obj instanceof Connector) &&
                    (obj.shape.type !== 'SwimLane' || (obj.children && obj.children.length > 0))) {
                    this.setZIndex(layer, obj);
                }
            }
            if (obj instanceof Node) {
                if (independentObj) {
                    // 939249: Duplicate Ports Added to Group After Grouping and Undoing.
                    if (obj.id !== 'helper' && !(this.diagramActions & DiagramAction.UndoRedo)) {
                        var getDefaults = getFunction(this.getNodeDefaults);
                        if (getDefaults) {
                            var defaults = getDefaults(obj, this);
                            if (defaults && defaults.ports) {
                                for (var i = 0; i < defaults.ports.length; i++) {
                                    defaults.ports[parseInt(i.toString(), 10)].inEdges = [];
                                    defaults.ports[parseInt(i.toString(), 10)].outEdges = [];
                                }
                            }
                            if (defaults && defaults !== obj) {
                                extendObject(defaults, obj);
                            }
                        }
                    }
                    this.initNode(obj, this.element.id);
                }
            }
            else if (obj instanceof Connector) {
                var getDefaults = getFunction(this.getConnectorDefaults);
                if (getDefaults) {
                    var defaults = getDefaults(obj, this);
                    if (defaults && defaults !== obj) {
                        extendObject(defaults, obj);
                    }
                    if (obj.segments.length) {
                        if (obj.type !== obj.segments[0].type) {
                            obj.segments = [];
                        }
                    }
                }
                var sourceNode = this.nameTable[obj.sourceID];
                var targetNode = this.nameTable[obj.targetID];
                var port = this.getConnectedPort(sourceNode, obj, true);
                var targetPort = this.getConnectedPort(targetNode, obj);
                var outPort = this.findInOutConnectPorts(sourceNode, false);
                var inPort = this.findInOutConnectPorts(targetNode, true);
                if ((sourceNode !== undefined && canOutConnect(sourceNode)) || (obj.sourcePortID !== ''
                    && canPortOutConnect(outPort))) {
                    obj.sourceWrapper = this.getEndNodeWrapper(sourceNode, obj, true);
                    if (obj.sourcePortID) {
                        // eslint-disable-next-line max-len
                        if (port && port.constraints && !(port.constraints & PortConstraints.None) && (port.constraints & PortConstraints.OutConnect)) {
                            obj.sourcePortWrapper = this.getWrapper(sourceNode.wrapper, obj.sourcePortID);
                        }
                    }
                }
                if ((targetNode !== undefined && canInConnect(targetNode)) || (obj.targetPortID !== ''
                    && canPortInConnect(inPort))) {
                    obj.targetWrapper = this.getEndNodeWrapper(targetNode, obj, false);
                    if (obj.targetPortID) {
                        // eslint-disable-next-line max-len
                        if (targetPort && targetPort.constraints && !(targetPort.constraints & PortConstraints.None) && (targetPort.constraints & PortConstraints.InConnect)) {
                            obj.targetPortWrapper = this.getWrapper(targetNode.wrapper, obj.targetPortID);
                        }
                    }
                }
                if (!independentObj) {
                    var points = obj.getConnectorPoints(obj.type);
                    updateConnector(obj, points);
                }
                if (independentObj) {
                    obj.init(this);
                }
                for (var k = 0; k < obj.wrapper.children.length; k++) {
                    if (this.pathTable[obj.wrapper.children[parseInt(k.toString(), 10)].data]) {
                        obj.wrapper.children[parseInt(k.toString(), 10)].absoluteBounds =
                            this.pathTable[obj.wrapper.children[parseInt(k.toString(), 10)].data].absoluteBounds;
                    }
                }
                obj.wrapper.measure(new Size(undefined, undefined));
                obj.wrapper.arrange(obj.wrapper.desiredSize);
                if (obj instanceof Connector && obj.type === 'Bezier') {
                    this.updateConnectorAnnotation(obj);
                    this.updateConnectorfixedUserHandles(obj);
                }
                for (var j = 0; j < obj.wrapper.children.length; j++) {
                    this.pathTable[obj.wrapper.children[parseInt(j.toString(), 10)].data] = {};
                    this.pathTable[obj.wrapper.children[parseInt(j.toString(), 10)].data].absoluteBounds =
                        obj.wrapper.children[parseInt(j.toString(), 10)].absoluteBounds;
                }
            }
            if (obj instanceof Node && obj.children && obj.container) {
                for (var i = 0; i < obj.children.length; i++) {
                    this.nameTable[obj.children[parseInt(i.toString(), 10)]].offsetX
                        = this.nameTable[obj.children[parseInt(i.toString(), 10)]].wrapper.offsetX;
                    this.nameTable[obj.children[parseInt(i.toString(), 10)]].offsetY
                        = this.nameTable[obj.children[parseInt(i.toString(), 10)]].wrapper.offsetY;
                }
            }
            // 908606: The nodes goes outside the subprocess while node rotation  Issue Fix
            if (obj instanceof Node && obj.shape &&
                obj.shape.shape === 'Activity' && obj.shape.activity.activity === 'SubProcess') {
                if (obj.shape.activity.subProcess.processes) {
                    var children = obj.shape.activity.subProcess.processes;
                    for (var i = 0; i < children.length; i++) {
                        if (this.nameTable[children[parseInt(i.toString(), 10)]]) {
                            this.nameTable[children[parseInt(i.toString(), 10)]].offsetX
                                = this.nameTable[children[parseInt(i.toString(), 10)]].wrapper.offsetX;
                            this.nameTable[children[parseInt(i.toString(), 10)]].offsetY
                                = this.nameTable[children[parseInt(i.toString(), 10)]].wrapper.offsetY;
                        }
                    }
                }
            }
            this.initObjectExtend(obj, layer, independentObj);
            this.nameTable[obj.id] = obj;
            if (!this.refreshing) {
                //To create text annotation node if we define shape annotations in parent node.
                if (obj.shape.annotations && obj.shape.annotations.length > 0) {
                    for (var i = 0; i < obj.shape.annotations.length
                        && obj.shape.annotations[parseInt(i.toString(), 10)].text; i++) {
                        this.getBPMNTextAnnotation(obj, this, obj.shape.annotations[parseInt(i.toString(), 10)], false);
                    }
                }
            }
            if (obj instanceof Node && obj.children) {
                this.preventNodesUpdate = true;
                this.preventConnectorsUpdate = true;
                if (!group && !obj.container) {
                    this.updateGroupOffset(obj, true);
                }
                this.groupTable[obj.id] = obj.children;
                for (var i = 0; i < obj.children.length; i++) {
                    var node = (this.nameTable[obj.children[parseInt(i.toString(), 10)]]);
                    if (node) {
                        node.parentId = obj.id;
                    }
                }
                // 941671: Undo not functioning correctly after Group, Rotate, and Ungroup Actions in Diagram
                if (!this.isLoading && obj.rotateAngle && !obj.container && !this.isUndo) {
                    this.commandHandler.rotateObjects(obj, [obj], obj.rotateAngle, { x: obj.offsetX, y: obj.offsetY }, false);
                }
                this.preventNodesUpdate = false;
                this.preventConnectorsUpdate = false;
            }
            if (this['enterObject'] === undefined) {
                this.updateQuad(obj);
            }
        }
        if (obj.visible === false) {
            this.updateElementVisibility(obj.wrapper, obj, false);
        }
    };
    /* tslint:enable */
    Diagram.prototype.getConnectedPort = function (node, connector, isSource) {
        if (node && node.ports) {
            for (var _i = 0, _a = node.ports; _i < _a.length; _i++) {
                var port = _a[_i];
                if (port.id === connector.sourcePortID && isSource) {
                    return port;
                }
                else if (port.id === connector.targetPortID && !isSource) {
                    return port;
                }
            }
        }
        return null;
    };
    Diagram.prototype.scaleObject = function (obj, size, isWidth) {
        var actualSize = isWidth ? obj.wrapper.actualSize.width : obj.wrapper.actualSize.height;
        var sw = (isWidth) ? 1 + ((size - actualSize) / actualSize) : 1;
        var sh = (isWidth) ? 1 : 1 + ((size - actualSize) / actualSize);
        //const groupOffsetX: number = obj.offsetX; const groupOffsetY: number = obj.offsetY;
        this.realActions |= RealAction.PreventDrag;
        this.scale(obj, sw, sh, { x: 0.5, y: 0.5 });
        this.realActions &= ~RealAction.PreventDrag;
    };
    Diagram.prototype.updateDefaultLayoutIcons = function (node) {
        if (this.layout.type === 'OrganizationalChart' || this.layout.type === 'HierarchicalTree' ||
            this.layout.type === 'ComplexHierarchicalTree') {
            {
                this.updateDefaultLayoutIcon(node, node.expandIcon);
                this.updateDefaultLayoutIcon(node, node.collapseIcon);
            }
        }
    };
    Diagram.prototype.updateDefaultLayoutIcon = function (node, icon) {
        if (icon.shape !== 'None') {
            if (icon.horizontalAlignment === 'Auto' && icon.verticalAlignment === 'Auto' &&
                icon.offset.x === .5 && icon.offset.y === 1) {
                var iconWrapper = this.getWrapper(node.wrapper, 'icon_content');
                var offsetX = void 0;
                var offsetY = void 0;
                if (this.layout.orientation === 'TopToBottom' || this.layout.orientation === 'BottomToTop') {
                    offsetX = .5;
                    offsetY = this.layout.orientation === 'TopToBottom' ? 1 : 0;
                }
                else if (this.layout.orientation === 'RightToLeft' || this.layout.orientation === 'LeftToRight') {
                    offsetX = this.layout.orientation === 'LeftToRight' ? 1 : 0;
                    offsetY = .5;
                }
                iconWrapper.setOffsetWithRespectToBounds(offsetX, offsetY, 'Fraction');
                iconWrapper.horizontalAlignment = 'Center';
                iconWrapper.verticalAlignment = 'Center';
                node.wrapper.measure(new Size(node.wrapper.width, node.wrapper.height));
                node.wrapper.arrange(node.wrapper.desiredSize);
            }
        }
    };
    /**
     * updateGroupOffset method \
     *
     * @returns { void }     updateGroupOffset method .\
     * @param {NodeModel | ConnectorModel} node - provide the source value.
     * @param {boolean} isUpdateSize - provide the target value.
     *
     * @private
     */
    Diagram.prototype.updateGroupOffset = function (node, isUpdateSize) {
        var isUpdateGroupToBlazor = false;
        if ((node.children && node.children.length > 0 && (!node.container)) || (node.processId)) {
            var node1 = this.nameTable[node.id];
            if (!(this.realActions & RealAction.PreventScale) && !(this.realActions & RealAction.PreventDrag)) {
                if (node1.offsetX && ((this.realActions & RealAction.EnableGroupAction) ||
                    ((!(this.diagramActions & DiagramAction.UndoRedo)) && (!(this.diagramActions & DiagramAction.ToolAction)
                        && !(this.diagramActions & DiagramAction.PublicMethod))))) {
                    this.realActions |= RealAction.PreventScale;
                    var diffX = (node1.offsetX - node.wrapper.offsetX);
                    node1.offsetX = node.wrapper.offsetX;
                    var diffY = (node1.offsetY - node.wrapper.offsetY);
                    node1.offsetY = node.wrapper.offsetY;
                    if ((diffX + diffY) !== 0) {
                        this.drag(node1, diffX, diffY);
                    }
                    this.realActions &= ~RealAction.PreventScale;
                }
                else {
                    //Removed isBlazor code
                    node1.offsetX = node.wrapper.offsetX;
                }
                if (node1.offsetY && ((this.realActions & RealAction.EnableGroupAction) ||
                    ((!(this.diagramActions & DiagramAction.UndoRedo)) && (!(this.diagramActions & DiagramAction.ToolAction)
                        && !(this.diagramActions & DiagramAction.PublicMethod))))) {
                    this.realActions |= RealAction.PreventScale;
                    var diffY = (node1.offsetY - node.wrapper.offsetY);
                    node1.offsetY = node.wrapper.offsetY;
                    this.drag(node1, 0, diffY);
                    this.realActions &= ~RealAction.PreventScale;
                }
                else {
                    //Removed isBlazor code
                    node1.offsetY = node.wrapper.offsetY;
                }
                if (this.diagramActions) {
                    //Removed isBlazor code
                    node1.width = node.wrapper.actualSize.width;
                    node1.height = node.wrapper.actualSize.height;
                }
            }
        }
        if ((node) && node.annotations && node.annotations.length > 0) {
            node.wrapper.children.forEach(function (wrapperChild) {
                if (wrapperChild instanceof Canvas) {
                    wrapperChild.children.forEach(function (child) {
                        if (child && child instanceof TextElement) {
                            child.refreshTextElement();
                        }
                    });
                }
            });
            node.wrapper.measure(new Size(node.width, node.height), node.id, this.onLoadImageSize.bind(this));
            node.wrapper.arrange(node.wrapper.desiredSize);
        }
        if (isUpdateSize) {
            if ((node.children && node.children.length > 0)) {
                if (this.nameTable[node.id].width !== undefined) {
                    this.scaleObject(node, this.nameTable[node.id].width, true);
                }
                else {
                    //Removed isBlazor code
                    this.nameTable[node.id].width = node.wrapper.actualSize.width;
                }
                if (this.nameTable[node.id].height !== undefined) {
                    this.scaleObject(node, this.nameTable[node.id].height, false);
                }
                else {
                    //Removed isBlazor code
                    this.nameTable[node.id].height = node.wrapper.actualSize.height;
                }
            }
        }
        //Removed Blazor code
    };
    /* eslint-disable */
    Diagram.prototype.initNode = function (obj, diagramId, group) {
        var canvas = obj.initContainer();
        var portContainer = new Canvas();
        var content;
        if (!this.diagramSettings.inversedAlignment) {
            canvas.inversedAlignment = false;
        }
        if (!canvas.children) {
            canvas.children = [];
        }
        if (obj.children) {
            canvas.measureChildren = false;
            portContainer.id = obj.id + 'group_container';
            // Bug 853721: Grid lines remain hidden when lane fill is set to transparent.
            // Added below code to set swimlane fill while dragging from palette to diagram.
            if (obj.shape && obj.shape.type === 'SwimLane') {
                portContainer.style.fill = obj.style.fill;
            }
            else {
                portContainer.style.fill = 'none';
            }
            portContainer.style.strokeColor = 'none';
            portContainer.horizontalAlignment = 'Stretch';
            portContainer.verticalAlignment = 'Stretch';
            //EJ2-865476 - Issue with Pivot Point in group node during resizing
            portContainer.pivot = obj.pivot;
            canvas.style = obj.style;
            canvas.padding.left = obj.padding.left;
            canvas.padding.right = obj.padding.right;
            canvas.padding.top = obj.padding.top;
            canvas.padding.bottom = obj.padding.bottom;
            portContainer.children = [];
            portContainer.preventContainer = true;
            if (obj.container) {
                portContainer.relativeMode = 'Object';
            }
            if (obj.container && (obj.container.type === 'Grid')) {
                for (var i = 0; i < obj.children.length; i++) {
                    var childCollection = new Canvas();
                    var child = this.nameTable[obj.children[i]];
                    childCollection.children = [];
                    childCollection.children.push(child.wrapper);
                    if (child) {
                        canvas.addObject(child.wrapper, child.rowIndex, child.columnIndex, child.rowSpan, child.columnSpan);
                    }
                }
            }
            else {
                for (var i = 0; i < obj.children.length; i++) {
                    if (this.nameTable[obj.children[i]]) {
                        var child = this.nameTable[obj.children[i]];
                        this.updateStackProperty(obj, child, i);
                        canvas.children.push(child.wrapper);
                        canvas.elementActions = canvas.elementActions | ElementAction.ElementIsGroup;
                        child.wrapper.flip = child.wrapper.flip ^=
                            obj.wrapper.flip;
                    }
                }
            }
            if (isNullOrUndefined(obj.container) ||
                (obj.container && (obj.container.type !== 'Grid'))) {
                canvas.children.push(portContainer);
            }
        }
        else {
            var setNodeTemplate = getFunction(this.setNodeTemplate);
            if (setNodeTemplate && obj.id !== 'helper') {
                content = setNodeTemplate(obj, this);
            }
            if (!content) {
                content = obj.init(this);
            }
            canvas.children.push(content);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var wrapperContent;
        wrapperContent = getFunction(this.getDescription);
        if (wrapperContent) {
            (obj.children ? canvas : content).description = wrapperContent;
        }
        else {
            (obj.children ? canvas : content).description = obj.annotations.length ? obj.annotations[0].content : obj.id;
        }
        var container = obj.children ? portContainer : canvas;
        obj.initAnnotations(this.getDescription, container, this.element.id, canVitualize(this) ? true : false, this.annotationTemplate);
        obj.initPorts(this.getDescription, container);
        obj.initIcons(this.getDescription, this.layout, container, diagramId);
        for (var i = 0; obj.fixedUserHandles !== undefined, i < obj.fixedUserHandles.length; i++) {
            var fixedUserHandles = obj.initFixedUserHandles(obj.fixedUserHandles[i], this.fixedUserHandleTemplate, this.element.id);
            container.children.push(fixedUserHandles);
        }
        if (obj.shape.type === 'SwimLane' && obj.wrapper && obj.wrapper.children.length > 0 &&
            obj.wrapper.children[0] instanceof GridPanel) {
            this.setZIndex(this.activeLayer, obj);
            if (this.connectors.length > 0) {
                for (var i = 0; i < this.connectors.length; i++) {
                    var obj_1 = this.connectors[i];
                    if ((obj_1.sourceID && obj_1.targetID) && (this.activeLayer.objects.indexOf(obj_1.sourceID) === -1 &&
                        this.activeLayer.objects.indexOf(obj_1.targetID) === -1)) {
                        this.setZIndex(this.activeLayer, obj_1);
                    }
                }
            }
            swimLaneMeasureAndArrange(obj);
            arrangeChildNodesInSwimLane(this, obj);
            this.updateDiagramElementQuad();
        }
        else {
            canvas.measure(new Size(obj.width, obj.height), obj.id, this.onLoadImageSize.bind(this));
            if (canvas instanceof GridPanel) {
                canvas.arrange(canvas.desiredSize, true);
            }
            else {
                canvas.arrange(canvas.desiredSize);
            }
        }
        if (obj.wrapper.flip !== FlipDirection.None) {
            if (obj.children && obj.children.length > 0) {
                for (var i = 0; i < obj.children.length; i++) {
                    var node = this.nameTable[obj.children[i]];
                    if (node) {
                        if (!this.refreshing && !this.commandHandler.cloningInProgress && !(this.diagramActions & DiagramAction.UndoRedo)) {
                            node.flip ^= obj.flip;
                            node.flipMode = obj.flipMode;
                        }
                        if (node.flipMode !== 'None' && node.flipMode !== 'Label' && node.flipMode !== 'LabelText' && node.flipMode !== 'LabelAndLabelText') {
                            this.updatePorts(node, node.flip);
                        }
                        else {
                            this.updatePorts(node, FlipDirection.None);
                        }
                        this.applyWrapperFlip(node);
                        node.wrapper.measure(new Size(node.wrapper.bounds.width, node.wrapper.bounds.height), node.id, this.onLoadImageSize.bind(this));
                        node.wrapper.arrange(node.wrapper.desiredSize);
                    }
                }
                var groupWrapperCanvas = obj.wrapper.children[obj.wrapper.children.length - 1];
                groupWrapperCanvas.flip = obj.wrapper.flip;
                groupWrapperCanvas.flipMode = obj.wrapper.flipMode;
                for (var j = 0; j < groupWrapperCanvas.children.length; j++) {
                    var wrapperChild = groupWrapperCanvas.children[j];
                    if (wrapperChild instanceof TextElement) {
                        if (obj.flipMode !== 'Port' && obj.flipMode !== 'None') {
                            wrapperChild.flip = obj.wrapper.flip;
                            wrapperChild.flipMode = obj.wrapper.flipMode;
                        }
                    }
                }
                if (!this.refreshing && !this.commandHandler.cloningInProgress && !(this.diagramActions & DiagramAction.UndoRedo)) {
                    alignElement(obj.wrapper, obj.wrapper.offsetX, obj.wrapper.offsetY, this, obj.wrapper.flip, undefined, undefined, true);
                }
            }
            else {
                //To apply flip and flip mode for the text elements of node.
                this.applyWrapperFlip(obj);
            }
        }
        if (obj.shape.type === 'Bpmn') {
            if (obj.shape.shape === 'TextAnnotation') {
                var isbpmnTextConnector = false;
                for (var i = 0; i < this.connectors.length; i++) {
                    if (this.connectors[parseInt(i.toString(), 10)].id === (obj.id + "_connector")) {
                        this.connectors[parseInt(i.toString(), 10)].isBpmnAnnotationConnector = true;
                        isbpmnTextConnector = true;
                        break;
                    }
                }
                if (!isbpmnTextConnector) {
                    this.addBpmnAnnotationConnector(obj, canvas);
                }
            }
        }
        if (obj instanceof Node && obj.container && (obj.width < canvas.outerBounds.width || obj.height < canvas.outerBounds.height) &&
            canvas.bounds.x <= canvas.outerBounds.x && canvas.bounds.y <= canvas.outerBounds.y) {
            obj.width = canvas.width = canvas.outerBounds.width;
            obj.height = canvas.height = canvas.outerBounds.height;
            canvas.measure(new Size(obj.width, obj.height));
            canvas.arrange(canvas.desiredSize);
        }
        if (obj.container && obj.container.type === 'Grid' && obj.children && obj.children.length > 0) {
            this.updateChildPosition(obj);
        }
    };
    Diagram.prototype.applyWrapperFlip = function (obj) {
        obj.wrapper.flip = obj.flip;
        obj.wrapper.flipMode = obj.flipMode;
        obj.wrapper.children[0].flip = obj.flip;
        obj.wrapper.children[0].flipMode = obj.flipMode;
        for (var i = 0; i < obj.wrapper.children.length; i++) {
            var wrapperChild = obj.wrapper.children[i];
            if (wrapperChild instanceof Canvas) {
                //To update the flip and flipmode for the node wrapper childs.
                this.applyWrapperCanvasFlip(wrapperChild, obj);
            }
            else {
                wrapperChild.flip = obj.flip;
                wrapperChild.flipMode = obj.flipMode;
            }
        }
    };
    Diagram.prototype.applyWrapperCanvasFlip = function (wrapper, obj) {
        for (var i = 0; i < wrapper.children.length; i++) {
            var wrapperChild = wrapper.children[parseInt(i.toString(), 10)];
            if (wrapperChild instanceof Canvas) {
                this.applyWrapperCanvasFlip(wrapperChild, obj);
            }
            else if (obj.flipMode !== 'None') {
                wrapperChild.flip = obj.flip;
                wrapperChild.flipMode = obj.flipMode;
            }
        }
    };
    Diagram.prototype.addBpmnAnnotationConnector = function (node, wrapper) {
        if (node.parentObj instanceof Diagram || node.parentObj instanceof Lane) {
            var bpmnAnnotation = node.shape;
            var direction = bpmnAnnotation.textAnnotation.textAnnotationDirection;
            var hasTarget = (bpmnAnnotation.textAnnotation.textAnnotationTarget !== '' && this.nameTable[bpmnAnnotation.textAnnotation.textAnnotationTarget]);
            var targetNode = hasTarget ? this.nameTable[bpmnAnnotation.textAnnotation.textAnnotationTarget] : null;
            var targetWrapper = targetNode != null ? targetNode.wrapper : null;
            var port = node.ports[0];
            var sourcePoint = { x: 0, y: 0 };
            switch (direction) {
                case 'Left':
                    port.offset = { x: 0, y: 0.5 };
                    sourcePoint.x = wrapper.bounds.left - 40;
                    sourcePoint.y = wrapper.bounds.bottom + 30;
                    break;
                case 'Right':
                    port.offset = { x: 1, y: 0.5 };
                    sourcePoint.x = wrapper.bounds.right + 40;
                    sourcePoint.y = wrapper.bounds.bottom + 30;
                    break;
                case 'Top':
                    port.offset = { x: 0.5, y: 0 };
                    sourcePoint.x = wrapper.bounds.right + 30;
                    sourcePoint.y = wrapper.bounds.top - 40;
                    break;
                case 'Bottom':
                    port.offset = { x: 0.5, y: 1 };
                    sourcePoint.x = wrapper.bounds.right + 30;
                    sourcePoint.y = wrapper.bounds.bottom + 40;
                    break;
                default:
                    port.offset = { x: 0, y: 0.5 };
                    sourcePoint.x = wrapper.bounds.left - 40;
                    sourcePoint.y = wrapper.bounds.bottom + 30;
                    if (hasTarget && wrapper != null && targetWrapper != null) {
                        if (wrapper.bounds.left > targetWrapper.bounds.right) {
                            port.offset = { x: 0, y: 0.5 };
                        }
                        else if (wrapper.bounds.right < targetWrapper.bounds.left) {
                            port.offset = { x: 1, y: 0.5 };
                        }
                        else if (wrapper.bounds.bottom > targetWrapper.bounds.top) {
                            port.offset = { x: 0.5, y: 0 };
                        }
                        else if (wrapper.bounds.top < targetWrapper.bounds.bottom) {
                            port.offset = { x: 0.5, y: 1 };
                        }
                    }
                    break;
            }
            var connector = new Connector(this, 'connectors', {
                id: node.id + "_connector",
                targetID: node.id,
                targetPortID: port.id,
                type: 'Straight',
                shape: {
                    type: "Bpmn", flow: 'Association'
                },
                constraints: ConnectorConstraints.Default & ~(ConnectorConstraints.DragTargetEnd | ConnectorConstraints.Delete),
                isBpmnAnnotationConnector: true,
            }, true);
            if (hasTarget) {
                connector.sourceID = bpmnAnnotation.textAnnotation.textAnnotationTarget;
            }
            else {
                connector.sourcePoint = sourcePoint;
            }
            var oldProtectOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            node.constraints |= NodeConstraints.InConnect;
            this.connectors.push(connector);
            if (!(this.bpmnModule).bpmnTextAnnotationConnector) {
                (this.bpmnModule).bpmnTextAnnotationConnector = [];
            }
            (this.bpmnModule).bpmnTextAnnotationConnector.push(connector);
            var shadowSet = (node.constraints & NodeConstraints.Shadow) !== 0;
            var allowMovingSet = (node.constraints & NodeConstraints.AllowMovingOutsideLane) !== 0;
            node.constraints = NodeConstraints.Default & ~(NodeConstraints.OutConnect | NodeConstraints.InConnect);
            if (shadowSet) {
                node.constraints |= NodeConstraints.Shadow;
            }
            if (allowMovingSet) {
                node.constraints |= NodeConstraints.AllowMovingOutsideLane;
            }
            this.isProtectedOnChange = oldProtectOnChange;
        }
    };
    /** @private */
    Diagram.prototype.getBPMNTextAnnotation = function (node, diagram, annotation, isDynamic) {
        // create new text annotation node
        var obj = {
            id: annotation.id || randomId(),
            height: annotation.height || 100,
            width: annotation.width || 100,
            annotations: [{ id: (annotation.id ? annotation.id : randomId()) + annotation.text, content: annotation.text }],
            offsetX: node.offsetX + annotation.length *
                Math.cos(annotation.angle * (Math.PI / 180)),
            offsetY: node.offsetY + annotation.length *
                Math.sin(annotation.angle * (Math.PI / 180)),
            shape: { type: 'Bpmn', shape: 'TextAnnotation', textAnnotation: { textAnnotationDirection: 'Auto', textAnnotationTarget: node.id } },
            constraints: NodeConstraints.Default & ~(NodeConstraints.OutConnect | NodeConstraints.InConnect)
        };
        var parentBounds = node.wrapper.bounds;
        var position = { x: obj.offsetX, y: obj.offsetY };
        var direction = getPortDirection(position, parentBounds, parentBounds, false);
        var segment;
        switch (direction) {
            case 'Right':
                segment = {
                    x1: parentBounds.right, y1: parentBounds.top,
                    x2: parentBounds.right, y2: parentBounds.bottom
                };
                break;
            case 'Left':
                segment = {
                    x1: parentBounds.left, y1: parentBounds.top,
                    x2: parentBounds.left, y2: parentBounds.bottom
                };
                break;
            case 'Bottom':
                segment = {
                    x1: parentBounds.right, y1: parentBounds.bottom,
                    x2: parentBounds.left, y2: parentBounds.bottom
                };
                break;
            case 'Top':
                segment = {
                    x1: parentBounds.right, y1: parentBounds.top,
                    x2: parentBounds.left, y2: parentBounds.top
                };
                break;
        }
        var center = parentBounds.center;
        var endPoint = Point.transform(position, annotation.angle, Math.max(parentBounds.width, parentBounds.height));
        var point = getIntersectionPoints(segment, [center, endPoint], false, center);
        if (annotation.length !== undefined && annotation.angle !== undefined && point) {
            point = Point.transform(point, annotation.angle, annotation.length);
            obj.offsetX = point.x;
            obj.offsetY = point.y;
        }
        if (direction === 'Right') {
            obj.offsetX += obj.width / 2;
        }
        else if (direction === 'Left') {
            obj.offsetX -= obj.width / 2;
        }
        else if (direction === 'Bottom') {
            obj.offsetY += obj.height / 2;
        }
        else {
            obj.offsetY -= obj.height / 2;
        }
        if (isDynamic) {
            this.add(obj);
        }
        else {
            var bpmnTextNode = new Node(this, 'nodes', obj, true);
            diagram.initObject(bpmnTextNode, undefined, undefined, true);
            diagram.nodes.push(bpmnTextNode);
        }
    };
    /* eslint-enable */
    /**
     * updateDiagramElementQuad method \
     *
     * @returns { void }     updateDiagramElementQuad method .\
     *
     * @private
     */
    Diagram.prototype.updateDiagramElementQuad = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[parseInt(i.toString(), 10)].wrapper && (this.nodes[parseInt(i.toString(), 10)].wrapper instanceof Container)) {
                this.updateQuad(this.nodes[parseInt(i.toString(), 10)]);
            }
        }
    };
    Diagram.prototype.onLoadImageSize = function (id, size) {
        var obj = this.getObject(id);
        var image = document.getElementById(id + 'sf-imageNode');
        if (image) {
            image.parentNode.removeChild(image);
        }
        this.nodePropertyChange(obj, {}, { width: size.width, height: size.height });
        var args = { element: cloneObject(obj), size: size };
        this.triggerEvent(DiagramEvent.onImageLoad, args);
    };
    Diagram.prototype.updateChildPosition = function (obj) {
        for (var i = 0; i < obj.children.length; i++) {
            var child = this.getObject(obj.children[parseInt(i.toString(), 10)]);
            child.offsetX = child.wrapper.offsetX;
            child.offsetY = child.wrapper.offsetY;
            if (child.children && child.children.length > 0) {
                this.updateChildPosition(child);
            }
        }
    };
    Diagram.prototype.canExecute = function () {
        return true;
    };
    Diagram.prototype.updateStackProperty = function (obj, child, index) {
        if (obj.container && obj.container.type === 'Stack') {
            if (!child.width) {
                child.wrapper.horizontalAlignment = 'Stretch';
                child.horizontalAlignment = 'Stretch';
            }
            if (!child.height) {
                child.verticalAlignment = 'Stretch';
                child.wrapper.verticalAlignment = 'Stretch';
            }
            if (index && obj.shape.type === 'UmlClassifier') {
                child.umlIndex = index;
            }
        }
    };
    Diagram.prototype.initViews = function () {
        if (!this.isLoading) {
            this.views.push(this.element.id);
            this.views[this.element.id] = this;
        }
    };
    Diagram.prototype.initCommands = function () {
        var i;
        var newCommands = this.commandManager.commands;
        var commands = {
            'copy': {
                execute: this.copyCommand.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }
            },
            'paste': {
                execute: this.pasteCommand.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }
            },
            'cut': {
                execute: this.cutCommand.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }
            },
            'delete': {
                execute: this.removeCommand.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Delete }
            },
            'selectAll': {
                execute: this.selectAll.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.A, keyModifiers: KeyModifiers.Control }
            },
            'undo': {
                execute: this.undo.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }
            },
            'redo': {
                execute: this.redo.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }
            },
            'nudgeUp': {
                execute: this.nudgeCommand.bind(this, 'Up'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Up },
                parameter: 'up'
            },
            'nudgeRight': {
                execute: this.nudgeCommand.bind(this, 'Right'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Right },
                parameter: 'right'
            },
            'nudgeDown': {
                execute: this.nudgeCommand.bind(this, 'Down'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Down },
                parameter: 'down'
            },
            'nudgeLeft': {
                execute: this.nudgeCommand.bind(this, 'Left'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Left },
                parameter: 'left'
            },
            'startEdit': {
                execute: this.startEditCommad.bind(this),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.F2 }
            },
            'endEdit': {
                execute: this.endEditCommand.bind(this),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Escape }
            },
            //EJ2-866418-keyboard shortcut keys
            'focusToNextItem': {
                execute: this.navigateItems.bind(this, true),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Tab }
            },
            'focusToPreviousItem': {
                execute: this.navigateItems.bind(this, false), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Tab, keyModifiers: KeyModifiers.Shift }
            },
            'selectFocusedItem': {
                execute: this.startEditCommad.bind(this),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Enter }
            },
            'bold': {
                execute: this.fontStyleCommand.bind(this, 'bold'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control }
            },
            'italic': {
                execute: this.fontStyleCommand.bind(this, 'italic'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.I, keyModifiers: KeyModifiers.Control }
            },
            'underline': {
                execute: this.fontStyleCommand.bind(this, 'underline'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }
            },
            'duplicate': {
                execute: this.duplicateCommand.bind(this), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.D, keyModifiers: KeyModifiers.Control }
            },
            'group': {
                execute: this.groupCommand.bind(this, 'group'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }
            },
            'ungroup': {
                execute: this.groupCommand.bind(this, 'ungroup'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'rotateClockwise': {
                execute: this.rotateCommand.bind(this, 'clockwise'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.R, keyModifiers: KeyModifiers.Control }
            },
            'rotateAntiClockwise': {
                execute: this.rotateCommand.bind(this, 'antiClockwise'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.L, keyModifiers: KeyModifiers.Control }
            },
            'flipHorizontal': {
                execute: this.flipCommand.bind(this, 'horizontal'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.H, keyModifiers: KeyModifiers.Control }
            },
            'flipVertical': {
                execute: this.flipCommand.bind(this, 'vertical'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.J, keyModifiers: KeyModifiers.Control }
            },
            'pointerTool': {
                execute: this.toolCommand.bind(this, 'pointer'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number1, keyModifiers: KeyModifiers.Control }
            },
            'textTool': {
                execute: this.toolCommand.bind(this, 'text'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number2, keyModifiers: KeyModifiers.Control }
            },
            'connectTool': {
                execute: this.toolCommand.bind(this, 'connect'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number3, keyModifiers: KeyModifiers.Control }
            },
            'freeForm': {
                execute: this.toolCommand.bind(this, 'freeForm'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number5, keyModifiers: KeyModifiers.Control }
            },
            'lineTool': {
                execute: this.toolCommand.bind(this, 'line'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number6, keyModifiers: KeyModifiers.Control }
            },
            'rectangleTool': {
                execute: this.toolCommand.bind(this, 'rectangle'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number8, keyModifiers: KeyModifiers.Control }
            },
            'ellipseTool': {
                execute: this.toolCommand.bind(this, 'ellipse'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Number9, keyModifiers: KeyModifiers.Control }
            },
            'zoomIn': {
                execute: this.zoomCommand.bind(this, 'zoomIn'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Plus, keyModifiers: KeyModifiers.Control }
            },
            'zoomOut': {
                execute: this.zoomCommand.bind(this, 'zoomOut'), canExecute: this.canExecute.bind(this),
                gesture: { key: Keys.Minus, keyModifiers: KeyModifiers.Control }
            },
            'shiftUp': {
                execute: this.shiftCommand.bind(this, 'Up'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Up, keyModifiers: KeyModifiers.Shift }
            },
            'shiftDown': {
                execute: this.shiftCommand.bind(this, 'Down'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Down, keyModifiers: KeyModifiers.Shift }
            },
            'shiftLeft': {
                execute: this.shiftCommand.bind(this, 'Left'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Left, keyModifiers: KeyModifiers.Shift }
            },
            'shiftRight': {
                execute: this.shiftCommand.bind(this, 'Right'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.Right, keyModifiers: KeyModifiers.Shift }
            },
            'alignTextCenter': {
                execute: this.alignCommand.bind(this, 'center'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'alignTextLeft': {
                execute: this.alignCommand.bind(this, 'right'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.L, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'alignTextRight': {
                execute: this.alignCommand.bind(this, 'left'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.R, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'alignTextTop': {
                execute: this.alignCommand.bind(this, 'top'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.E, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'alignTextCenterVertical': {
                execute: this.alignCommand.bind(this, 'centerVertical'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.M, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'alignTextBottom': {
                execute: this.alignCommand.bind(this, 'bottom'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'alignJustify': {
                execute: this.alignCommand.bind(this, 'justify'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.J, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'sendToBack': {
                execute: this.orderCommand.bind(this, 'sendToBack'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'bringToFront': {
                execute: this.orderCommand.bind(this, 'bringToFront'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.F, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }
            },
            'sendBackward': {
                execute: this.orderCommand.bind(this, 'sendBackward'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.BracketLeft, keyModifiers: KeyModifiers.Control }
            },
            'bringForward': {
                execute: this.orderCommand.bind(this, 'bringForward'),
                canExecute: this.canExecute.bind(this), gesture: { key: Keys.BracketRight, keyModifiers: KeyModifiers.Control }
            }
        };
        this.initCommandManager(newCommands, commands);
    };
    Diagram.prototype.overrideCommands = function (newCommand, commands) {
        var command;
        for (var _i = 0, _a = Object.keys(commands); _i < _a.length; _i++) {
            var key = _a[_i];
            command = commands["" + key];
            if (newCommand.gesture.key === command.gesture.key && newCommand.gesture.keyModifiers === command.gesture.keyModifiers) {
                delete commands["" + key];
                break;
            }
        }
    };
    Diagram.prototype.initCommandManager = function (newCommands, commands) {
        var i = 0;
        if (newCommands) {
            for (i = 0; i < newCommands.length; i++) {
                if (commands[newCommands[parseInt(i.toString(), 10)].name] && newCommands[parseInt(i.toString(), 10)]) {
                    if (newCommands[parseInt(i.toString(), 10)].canExecute) {
                        commands[newCommands[parseInt(i.toString(), 10)].name].canExecute
                            = newCommands[parseInt(i.toString(), 10)].canExecute;
                    }
                    if (newCommands[parseInt(i.toString(), 10)].execute) {
                        commands[newCommands[parseInt(i.toString(), 10)].name].execute
                            = newCommands[parseInt(i.toString(), 10)].execute;
                    }
                    if (newCommands[parseInt(i.toString(), 10)].gesture.key
                        || newCommands[parseInt(i.toString(), 10)].gesture.keyModifiers) {
                        commands[newCommands[parseInt(i.toString(), 10)].name].gesture
                            = newCommands[parseInt(i.toString(), 10)].gesture;
                    }
                    if (newCommands[parseInt(i.toString(), 10)].parameter !== '') {
                        commands[newCommands[parseInt(i.toString(), 10)].name].parameter
                            = newCommands[parseInt(i.toString(), 10)].parameter;
                    }
                }
                else {
                    this.overrideCommands(newCommands[parseInt(i.toString(), 10)], commands);
                    commands[newCommands[parseInt(i.toString(), 10)].name] = {
                        execute: newCommands[parseInt(i.toString(), 10)].execute,
                        canExecute: newCommands[parseInt(i.toString(), 10)].canExecute,
                        gesture: newCommands[parseInt(i.toString(), 10)].gesture,
                        parameter: newCommands[parseInt(i.toString(), 10)].parameter
                    };
                }
            }
        }
        this.commands = commands;
    };
    /**
     * updateNodeEdges method \
     *
     * @returns { void }     updateNodeEdges method .\
     * @param {Node} node - provide the source value.
     *
     * @private
     */
    Diagram.prototype.updateNodeEdges = function (node) {
        for (var _i = 0, _a = node.inEdges; _i < _a.length; _i++) {
            var edge = _a[_i];
            if (this.nameTable["" + edge]) {
                this.nameTable["" + edge].targetID = '';
            }
        }
        for (var _b = 0, _c = node.outEdges; _b < _c.length; _b++) {
            var edge = _c[_b];
            if (this.nameTable["" + edge]) {
                this.nameTable["" + edge].sourceID = '';
            }
        }
        node.inEdges = [];
        node.outEdges = [];
    };
    /**
     * updateIconVisibility method \
     *
     * @returns { void }     updateIconVisibility method .\
     * @param {Node} node - provide the source value.
     * @param {boolean} visibility - provide the source value.
     *
     * @private
     */
    Diagram.prototype.updateIconVisibility = function (node, visibility) {
        for (var i = 0; i < node.wrapper.children.length; i++) {
            var child = node.wrapper.children[parseInt(i.toString(), 10)];
            if (child.id) {
                var id = child.id.split(node.id)[1];
                if (id && id.match('^_icon')) {
                    child.visible = visibility;
                    this.updateDiagramContainerVisibility(child, visibility);
                }
            }
        }
    };
    /**
     * updateEdges method \
     *
     * @returns { void }     updateEdges method .\
     * @param {Connector} obj - provide the source value.
     *
     * @private
     */
    Diagram.prototype.updateEdges = function (obj) {
        if (obj.sourceID !== undefined && obj.sourceID !== '') {
            var object = this.nameTable[obj.sourceID];
            if (object && object.outEdges && object.outEdges.length === 0) {
                object.outEdges = [];
            }
            if (object && object.outEdges && object.outEdges.indexOf(obj.id) === -1) {
                object.outEdges.push(obj.id);
            }
            this.updatePortEdges(object, obj, false);
        }
        if (obj.targetID !== undefined && obj.targetID !== '') {
            var node = this.nameTable[obj.targetID];
            if (node && node.inEdges && node.inEdges.length === 0) {
                node.inEdges = [];
            }
            if (node && node.inEdges && node.inEdges.indexOf(obj.id) === -1) {
                node.inEdges.push(obj.id);
            }
            this.updatePortEdges(node, obj, true);
            if (node && node.visible && node.outEdges) {
                var value = node.outEdges.length === 0 ? false : true;
                this.updateIconVisibility(node, value);
            }
        }
    };
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
    Diagram.prototype.updatePortEdges = function (node, obj, isInEdges) {
        if (node) {
            for (var i = 0; i < node.ports.length; i++) {
                var port = node.ports[parseInt(i.toString(), 10)];
                var portId = (isInEdges) ? obj.targetPortID : obj.sourcePortID;
                if (port.id === portId) {
                    var portEdges = (isInEdges) ? port.inEdges : port.outEdges;
                    if (portEdges.indexOf(obj.id) === -1) {
                        portEdges.push(obj.id);
                    }
                }
            }
        }
    };
    /**
     * refreshDiagram method \
     *
     * @returns { void }     refreshDiagram method .\
     *
     * @private
     */
    Diagram.prototype.refreshDiagram = function () {
        this.initLayerObjects();
        this.doLayout();
        this.updateBridging();
        this.scroller.setSize();
        this.addBlazorDiagramObjects();
        //Removed isBlazor code
        this.updateFitToPage();
    };
    Diagram.prototype.updateCanupdateStyle = function (element, value) {
        for (var j = 0; j < element.length; j++) {
            if (element[parseInt(j.toString(), 10)].children) {
                this.updateCanupdateStyle(element[parseInt(j.toString(), 10)].children, value);
            }
            element[parseInt(j.toString(), 10)].canApplyStyle = value;
        }
    };
    Diagram.prototype.getZindexPosition = function (obj, viewId) {
        var objects = [];
        var index = undefined;
        objects = objects.concat(this.nodes);
        objects = objects.concat(this.connectors);
        var type;
        var greaterIndex;
        if (obj.children) {
            greaterIndex = this.commandHandler.findMaxZIndex(obj);
        }
        else {
            greaterIndex = obj.zIndex;
        }
        if (obj.zIndex !== Number.MIN_VALUE) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[parseInt(i.toString(), 10)].zIndex > greaterIndex) {
                    if (obj.shape.type === 'HTML' || obj.shape.type === 'Native') {
                        type = obj.shape.type === 'HTML' ? 'html' : 'native';
                    }
                    index = getDomIndex(viewId, objects[parseInt(i.toString(), 10)].id, type);
                    break;
                }
            }
        }
        return index;
    };
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
    Diagram.prototype.updateDiagramObject = function (obj, canIgnoreIndex, isUpdateObject) {
        var view;
        var domTable = 'domTable';
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            view = this.views["" + temp];
            if (this.diagramActions) {
                if (view.mode === 'SVG') {
                    var hasLayers = this.layers.length > 1;
                    var layer = void 0;
                    if (hasLayers) {
                        layer = this.commandHandler.getObjectLayer(obj.id);
                    }
                    if ((layer === undefined || (layer && layer.visible)) || isUpdateObject) {
                        var htmlLayer = getHTMLLayer(this.element.id);
                        if (!window["" + domTable][view.element.id + '_diagramLayer']) {
                            window["" + domTable][view.element.id + '_diagramLayer'] =
                                document.getElementById(view.element.id + '_diagramLayer');
                        }
                        var diagramElementsLayer = window["" + domTable][view.element.id + '_diagramLayer'];
                        if (this.diagramActions & DiagramAction.Interactions) {
                            this.updateCanupdateStyle(obj.wrapper.children, true);
                        }
                        var centerPoint = this.getMidPoint(obj);
                        this.diagramRenderer.updateNode(obj.wrapper, diagramElementsLayer, htmlLayer, undefined, canIgnoreIndex ? undefined : this.getZindexPosition(obj, view.element.id), centerPoint, this.portCenterPoint);
                        this.updateCanupdateStyle(obj.wrapper.children, true);
                    }
                }
            }
        }
    };
    //Method used to apply margin for Bezier Curve points.
    Diagram.prototype.applyMarginBezier = function (obj, centerPoint) {
        centerPoint.cx = centerPoint.cx + obj.margin.left;
        centerPoint.cx = centerPoint.cx - obj.margin.right;
        centerPoint.cy = centerPoint.cy + obj.margin.top;
        centerPoint.cy = centerPoint.cy - obj.margin.bottom;
    };
    //Method used to get mid point of Bezier Curve
    Diagram.prototype.getMidPoint = function (obj) {
        var finalPoint;
        if (obj instanceof Connector && obj.type === 'Bezier') {
            finalPoint = [];
            var totalPoints = this.getBezierPoints(obj);
            var totalLength = Point.getLengthFromListOfPoints(totalPoints);
            // Bug 905077: Fixed improper positioning of multiple annotations for Bezier connectors.
            // Iterated through annotations and ports to correctly determine their positions.
            for (var i = 0; i < obj.annotations.length; i++) {
                var centerPoint = obj.annotations[parseInt(i.toString(), 10)].offset;
                var absoluteLength = centerPoint * totalLength;
                var position = this.commandHandler.getPointAtLength(absoluteLength, totalPoints, 0);
                var annotationPosition = { cx: position.x, cy: position.y };
                // EJ2-64114 -Horizontal and Vertical alignment not applied properly for the bezier connector annotation
                for (var j = 0; j < obj.wrapper.children.length; j++) {
                    if (obj.wrapper && obj.wrapper.children[parseInt(j.toString(), 10)] instanceof TextElement) {
                        if (obj.wrapper.children[parseInt(j.toString(), 10)].id === obj.id + '_' + obj.annotations[parseInt(i.toString(), 10)].id) {
                            this.applyMarginBezier(obj.wrapper.children[parseInt(j.toString(), 10)], annotationPosition);
                            finalPoint[obj.id + '_' + obj.annotations[parseInt(i.toString(), 10)].id] =
                                this.applyAlignment(obj.wrapper.children[parseInt(j.toString(), 10)], annotationPosition, obj.annotations[parseInt(i.toString(), 10)].displacement);
                        }
                    }
                }
            }
            // Bug 835525: Connector Port feature. Below code is used to get the port position for bezier connector.
            for (var i = 0; i < obj.ports.length; i++) {
                var portOffset = obj.ports[parseInt(i.toString(), 10)].offset;
                var length_1 = portOffset * totalLength;
                var portPosition = this.commandHandler.getPointAtLength(length_1, totalPoints, 0);
                var portPoint = { cx: portPosition.x, cy: portPosition.y };
                for (var j = 0; j < obj.wrapper.children.length; j++) {
                    if (obj.wrapper && obj.wrapper.children[parseInt(j.toString(), 10)] instanceof PathElement &&
                        obj.wrapper.children[parseInt(j.toString(), 10)].isPathPort) {
                        if (obj.wrapper.children[parseInt(j.toString(), 10)].id === obj.id + '_' + obj.ports[parseInt(i.toString(), 10)].id) {
                            this.applyMarginBezier(obj.wrapper.children[parseInt(j.toString(), 10)], portPoint);
                            this.portCenterPoint[obj.id + '_' + obj.ports[parseInt(i.toString(), 10)].id] =
                                this.applyAlignment(obj.wrapper.children[parseInt(j.toString(), 10)], portPoint, obj.ports[parseInt(i.toString(), 10)].displacement);
                        }
                    }
                }
            }
        }
        return finalPoint;
    };
    /**
     * Apply alignment to bezier port
     * @returns {PointModel} return the port alignment points
     * @param {PathElement | TextElement} child - provide the obj value.
     * @param {any} finalPoint - provide final point value.
     * @param {PointModel} displacement - provide displacement value.
     */
    Diagram.prototype.applyAlignment = function (child, finalPoint, displacement) {
        switch (child.horizontalAlignment) {
            case 'Auto':
            case 'Left':
                finalPoint.cx = child.inversedAlignment ? finalPoint.cx : (finalPoint.cx - child.desiredSize.width);
                finalPoint.cx += displacement.x;
                break;
            case 'Stretch':
            case 'Center':
                finalPoint.cx -= child.desiredSize.width * child.pivot.x;
                break;
            case 'Right':
                finalPoint.cx = child.inversedAlignment ? (finalPoint.cx - child.desiredSize.width) : finalPoint.cx;
                finalPoint.cx -= displacement.x;
                break;
        }
        switch (child.verticalAlignment) {
            case 'Auto':
            case 'Top':
                finalPoint.cy = child.inversedAlignment ? finalPoint.cy : (finalPoint.cy - child.desiredSize.height);
                finalPoint.cy += displacement.y;
                break;
            case 'Stretch':
            case 'Center':
                finalPoint.cy -= child.desiredSize.height * child.pivot.y;
                break;
            case 'Bottom':
                finalPoint.cy = child.inversedAlignment ? (finalPoint.cy - child.desiredSize.height) : finalPoint.cy;
                finalPoint.cy -= displacement.y;
                break;
        }
        return finalPoint;
    };
    //(EJ2-62683) Method used to get total points in bezier connector
    Diagram.prototype.getBezierPoints = function (obj) {
        var points = [];
        var i;
        var source = { x: obj.sourcePoint.x, y: obj.sourcePoint.y };
        points.push(source);
        for (i = 0; i < obj.segments.length; i++) {
            var total = obj.segments[parseInt(i.toString(), 10)].getPoints(obj.segments[parseInt(i.toString(), 10)], source);
            // 878719: Resolve ESLint errors
            // eslint-disable-next-line prefer-spread
            points.push.apply(points, total);
            source = points[points.length - 1];
        }
        return points;
    };
    /**
     *updateGridContainer method \
     *
     * @returns { void } updateGridContainer method .\
     * @param { GridPanel } grid - provide the objectArray value.
     *
     * @private
     */
    Diagram.prototype.updateGridContainer = function (grid) {
        var view;
        var htmlLayer = getHTMLLayer(this.element.id);
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            view = this.views["" + temp];
            if (view.mode === 'SVG' && this.diagramActions) {
                var diagramElementsLayer = document.getElementById(view.element.id + '_diagramLayer');
                this.diagramRenderer.updateNode(grid, diagramElementsLayer, htmlLayer, undefined);
            }
            else {
                this.refreshCanvasDiagramLayer(view);
            }
        }
    };
    /**
     *Retrieves the node or connector with the given id. \
     *
     * @returns { (NodeModel | ConnectorModel)[] } Retrieves the node or connector with the given id.\
     * @param { string[] } objectArray - The id of the node or connector to be retrieved.
     *
     * @private
     */
    Diagram.prototype.getObjectsOfLayer = function (objectArray) {
        var nodeArray = [];
        for (var _i = 0, objectArray_1 = objectArray; _i < objectArray_1.length; _i++) {
            var obj = objectArray_1[_i];
            if (this.nameTable["" + obj]) {
                nodeArray.push(this.nameTable["" + obj]);
            }
        }
        return nodeArray;
    };
    /**
     *refreshDiagramLayer method \
     *
     * @returns { void } refreshDiagramLayer method .\
     *
     * @private
     */
    Diagram.prototype.refreshDiagramLayer = function () {
        var view;
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var temp = _a[_i];
            view = this.views["" + temp];
            switch (view.mode) {
                case 'SVG':
                    this.refreshSvgDiagramLayer(view);
                    break;
                case 'Canvas':
                    this.refreshCanvasLayers(view);
                    break;
            }
        }
    };
    /**
     *refreshCanvasLayers method \
     *
     * @returns { void } refreshCanvasLayers method .\
     * @param { View } view - provide the view value.
     *
     * @private
     */
    Diagram.prototype.refreshCanvasLayers = function (view) {
        if (!view) {
            for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
                var temp = _a[_i];
                var view_1 = this.views["" + temp];
                this.refreshCanvasDiagramLayer(view_1);
            }
        }
        else {
            this.refreshCanvasDiagramLayer(view);
        }
    };
    Diagram.prototype.renderBasicElement = function (view) {
        var htmlLayer = getHTMLLayer(view.element.id);
        for (var i = 0; i < this.basicElements.length; i++) {
            var element = this.basicElements[parseInt(i.toString(), 10)];
            if (element instanceof Container) {
                element.prevRotateAngle = 0;
            }
            element.measure(new Size(element.width, element.height));
            element.arrange(element.desiredSize);
            view.diagramRenderer.renderElement(element, view.diagramLayer, htmlLayer);
        }
    };
    Diagram.prototype.refreshElements = function (view) {
        var isOverView = false;
        if (!this.isDestroyed) {
            this.clearCanvas(view);
            if (view instanceof Diagram) {
                view.diagramLayer.getContext('2d').setTransform(view.scroller.currentZoom, 0, 0, view.scroller.currentZoom, 0, 0);
                view.diagramLayer.getContext('2d').scale(1.5, 1.5);
            }
            else {
                isOverView = true;
                var element = document.getElementById(view.element.id + '_nativeLayer');
                if (element.children.length > 0) {
                    view.updateView(view);
                }
            }
            var htmlLayer = getHTMLLayer(view.element.id);
            //const bounds: Rect = this.spatialSearch.getPageBounds();
            this.renderDiagramElements(view.diagramLayer, view.diagramRenderer, htmlLayer, undefined, undefined, isOverView);
            for (var i = 0; i < this.basicElements.length; i++) {
                var element = this.basicElements[parseInt(i.toString(), 10)];
                element.measure(new Size(element.width, element.height));
                element.arrange(element.desiredSize);
                view.diagramRenderer.renderElement(element, view.diagramLayer, htmlLayer);
            }
            if (view instanceof Diagram) {
                view.diagramLayer.style.transform = 'scale(' + (2 / 3) + ')';
                view.diagramLayer.style.transformOrigin = '0 0';
            }
            this.renderTimer = null;
        }
    };
    /**
     *refreshCanvasDiagramLayer method \
     *
     * @returns { void } refreshCanvasDiagramLayer method .\
     * @param { View } view - provide the view value.
     *
     * @private
     */
    Diagram.prototype.refreshCanvasDiagramLayer = function (view) {
        var _this = this;
        if (view.mode !== 'SVG' && !this.isDestroyed) {
            if (this.basicElements.length > 0) {
                this.renderBasicElement(view);
            }
            if ((!this.diagramActions || (this.diagramActions & DiagramAction.Render) === 0)
                || (DiagramAction.ToolAction & this.diagramActions) || canVitualize(this) || (this.scroller.currentZoom !== 1)) {
                this.refreshElements(view);
            }
            else if (!this.renderTimer) {
                this.renderTimer = setTimeout(function () {
                    _this.refreshElements(view);
                }, 40);
            }
        }
    };
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
    Diagram.prototype.updatePortVisibility = function (obj, portVisibility, inverse) {
        var portElement;
        var drawingObject = !(this.drawingObject && this.drawingObject.shape) ? true : false;
        if ((obj instanceof Node || obj instanceof Connector) && drawingObject && canMove(obj)) {
            var ports = obj.ports;
            var changed = false;
            for (var i = 0; i < ports.length; i++) {
                portElement = this.getWrapper(obj.wrapper, ports[parseInt(i.toString(), 10)].id);
                if ((portVisibility & PortVisibility.Hover || portVisibility & PortVisibility.Connect)) {
                    if (checkPortRestriction(ports[parseInt(i.toString(), 10)], portVisibility)) {
                        portElement.visible = !inverse;
                        changed = true;
                    }
                }
            }
            if (changed) {
                this.updateDiagramObject(obj);
            }
            //EJ2-59672 - Added the below code to render the ports while hovering over the node
            if (this.mode === 'Canvas') {
                this.refreshCanvasLayers();
            }
        }
    };
    /**
     *refreshSvgDiagramLayer method \
     *
     * @returns { void } refreshSvgDiagramLayer method .\
     * @param { View } view - provide the object value.
     *
     * @private
     */
    Diagram.prototype.refreshSvgDiagramLayer = function (view) {
        var element;
        var diagramElementsLayer = document.getElementById(view.element.id + '_diagramLayer');
        var htmlLayer = getHTMLLayer(view.element.id);
        if (!canVitualize(this)) {
            for (var i = 0; i < this.basicElements.length; i++) {
                element = this.basicElements[parseInt(i.toString(), 10)];
                element.measure(new Size(element.width, element.height));
                element.arrange(element.desiredSize, (!(this.diagramActions & DiagramAction.Render) ? true : false));
                this.diagramRenderer.renderElement(element, diagramElementsLayer, htmlLayer);
            }
            this.renderDiagramElements(diagramElementsLayer, this.diagramRenderer, htmlLayer);
        }
        else {
            this.scroller.virtualizeElements();
        }
    };
    /**
     *removeVirtualObjects method \
     *
     * @returns { void } removeVirtualObjects method .\
     * @param { Object } clearIntervalVal - provide the object value.
     *
     * @private
     */
    Diagram.prototype.removeVirtualObjects = function (clearIntervalVal) {
        if (this.deleteVirtualObject) {
            for (var i = 0; i < this.scroller.removeCollection.length; i++) {
                var obj = this.nameTable[this.scroller.removeCollection[parseInt(i.toString(), 10)]];
                //EJ2-840437 - Exception occurs When Removing connector with Virtualization Enabled
                if (obj !== undefined) {
                    this.removeElements(obj);
                }
            }
            this.deleteVirtualObject = false;
        }
        clearInterval(clearIntervalVal);
    };
    /**
     *updateTextElementValue method \
     *
     * @returns { void } updateTextElementValue method .\
     * @param {  NodeModel | ConnectorModel } object - provide the object value.
     *
     * @private
     */
    Diagram.prototype.updateTextElementValue = function (object) {
        for (var j = 0; j < object.wrapper.children.length; j++) {
            var element = object.wrapper.children[parseInt(j.toString(), 10)];
            if (element instanceof TextElement) {
                element.canMeasure = true;
                //866384-Annotation Alignment is wrong when virtualisation constraints enabled
                var viewPortHeight = this.scroller.viewPortHeight;
                var viewPortWidth = this.scroller.viewPortWidth;
                var measureText = false;
                if (object.offsetX < viewPortWidth && object.offsetY < viewPortHeight) {
                    measureText = true;
                }
                if (measureText && canVitualize(this) && element.actualSize.height === undefined
                    && element.actualSize.width === undefined) {
                    object.wrapper.measure(new Size(object.width, object.height), object.id, this.onLoadImageSize.bind(this));
                    object.wrapper.arrange(object.wrapper.desiredSize);
                }
                element.measure(new Size(object.width, object.height));
                element.arrange(element.desiredSize);
            }
        }
    };
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
    Diagram.prototype.updateVirtualObjects = function (collection, remove, tCollection) {
        var diagramElementsLayer = document.getElementById(this.element.id + '_diagramLayer');
        var htmlLayer = getHTMLLayer(this.element.id);
        if (this.mode === 'SVG') {
            for (var i = 0; i < collection.length; i++) {
                var index = this.scroller.removeCollection.indexOf(collection[parseInt(i.toString(), 10)]);
                if (index >= 0) {
                    this.scroller.removeCollection.splice(index, 1);
                }
                var object = this.nameTable[collection[parseInt(i.toString(), 10)]];
                this.updateTextElementValue(object);
                this.diagramRenderer.renderElement(object.wrapper, diagramElementsLayer, htmlLayer, undefined, undefined, undefined, undefined, object.zIndex);
            }
            for (var k = 0; k < tCollection.length; k++) {
                this.scroller.removeCollection.push(tCollection[parseInt(k.toString(), 10)]);
            }
            if (this.scroller.currentZoom !== 1) {
                this.eventHandler.updateVirtualization();
            }
        }
        else if (this.diagramActions) {
            this.refreshDiagramLayer();
        }
    };
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
    Diagram.prototype.renderDiagramElements = function (canvas, renderer, htmlLayer, transform, fromExport, isOverView) {
        if (transform === void 0) { transform = true; }
        var pageBounds = this.scroller.getPageBounds();
        pageBounds.x *= this.scroller.currentZoom;
        pageBounds.y *= this.scroller.currentZoom;
        pageBounds.width *= this.scroller.currentZoom;
        pageBounds.height *= this.scroller.currentZoom;
        var difX = -this.scroller.horizontalOffset - pageBounds.x;
        var difY = -this.scroller.verticalOffset - pageBounds.y;
        var getCenterPoint;
        for (var _i = 0, _a = Object.keys(this.layerZIndexTable); _i < _a.length; _i++) {
            var layerId = _a[_i];
            var layer = this.commandHandler.getLayer(this.layerZIndexTable["" + layerId]);
            var left = void 0;
            var top_1 = void 0;
            if (this.mode === 'Canvas' && canVitualize(this) && !this.diagramActions) {
                this.scroller.virtualizeElements();
            }
            var id = (this.mode === 'Canvas' && canVitualize(this) &&
                this.scroller.oldCollectionObjects.length > 0) ?
                this.scroller.oldCollectionObjects : undefined;
            // Sort layer objects to arrange nodes with negative zIndex values at the beginning of the array.
            // Due to the new implementation with order commands, the zIndex of a node may become negative.
            // Therefore, we need to sort the zIndex values, with the least negative values coming first, followed by positive values.
            var layerObjects = Object.keys(id || layer.zIndexTable);
            layerObjects.sort(function (a, b) { return parseInt("" + a, 10) - parseInt("" + b, 10); });
            for (var _b = 0, layerObjects_1 = layerObjects; _b < layerObjects_1.length; _b++) {
                var node = layerObjects_1[_b];
                var renderNode = id ? this.nameTable[id["" + node]] : this.nameTable[layer.zIndexTable["" + node]];
                if (renderNode && !(renderNode.parentId) && layer.visible &&
                    (!(renderNode.processId) || this.refreshing)) {
                    //EJ2-68738 - Overview content not updated properly on zoom out the diagram
                    var transformValue = void 0;
                    //828826 - In canvas mode diagram transform values are not updated properly while Zoom out action
                    if (this.scroller.currentZoom < 1 && this.mode === 'SVG') {
                        transformValue = {
                            tx: (-pageBounds.x) / this.scroller.currentZoom,
                            ty: (-pageBounds.y) / this.scroller.currentZoom,
                            scale: this.scroller.transform.scale
                        };
                    }
                    else {
                        transformValue = {
                            tx: this.scroller.transform.tx,
                            ty: this.scroller.transform.ty,
                            scale: this.scroller.transform.scale
                        };
                    }
                    // Bug 880945: Overview is not updated properly with 4k monitor.
                    //To render the overview elements based on the pageBounds.
                    if (isOverView) {
                        transformValue = {
                            tx: (-pageBounds.x) / this.scroller.currentZoom,
                            ty: (-pageBounds.y) / this.scroller.currentZoom,
                            scale: this.scroller.transform.scale
                        };
                    }
                    if (canVitualize(this)) {
                        if (this.scroller.currentZoom < 1) {
                            if (pageBounds.x < 0 || this.scroller.horizontalOffset < 0) {
                                var verticalValue = this.scroller.verticalOffset < 0 ? this.scroller.verticalOffset : 0;
                                left = (difX > 0 ? difX : 0) + 'px';
                                top_1 = ((this.realActions & RealAction.vScrollbarMoved) ? 0 : -verticalValue) + 'px';
                            }
                            else {
                                left = 0 + 'px';
                                top_1 = 0 + 'px';
                            }
                            if (this.realActions & RealAction.hScrollbarMoved) {
                                this.realActions = this.realActions & ~RealAction.hScrollbarMoved;
                            }
                            if (this.realActions & RealAction.vScrollbarMoved) {
                                this.realActions = this.realActions & ~RealAction.vScrollbarMoved;
                            }
                        }
                        else {
                            left = (pageBounds.x < 0 ? difX : -this.scroller.horizontalOffset) + 'px';
                            top_1 = (pageBounds.y < 0 ? difY : -this.scroller.verticalOffset) + 'px';
                        }
                        this.diagramLayer.style.left = left;
                        this.diagramLayer.style.top = top_1;
                        //EJ2-69578 - Overview is not updated properly when we enable virtualization.
                        transformValue.tx = (-pageBounds.x) / transformValue.scale;
                        transformValue.ty = (-pageBounds.y) / transformValue.scale;
                    }
                    var status_1 = true;
                    if (fromExport) {
                        status_1 = false;
                    }
                    this.updateTextElementValue(renderNode);
                    if (this.refreshing) {
                        if (renderNode.shape.activity && renderNode.shape.activity.subProcess
                            && renderNode.shape.activity.subProcess.processes) {
                            for (var i = 0; i < renderNode.shape.activity.subProcess.processes.length; i++) {
                                var process = renderNode.shape.activity.subProcess.processes[parseInt(i.toString(), 10)];
                                renderNode.wrapper.children.push(this.nameTable["" + process].wrapper);
                            }
                            renderNode.wrapper.measure(new Size(renderNode.wrapper.bounds.width, renderNode.wrapper.bounds.height));
                            renderNode.wrapper.arrange(renderNode.wrapper.desiredSize);
                        }
                    }
                    if (renderNode instanceof Connector && renderNode.type === 'Bezier') {
                        getCenterPoint = this.getMidPoint(renderNode);
                        // (EJ2-58802) - Added the below code to add the transform x and y values to center point value in canvas mode
                        if (this.mode === 'Canvas' && transform) {
                            getCenterPoint.cx += transformValue.tx;
                            getCenterPoint.cy += transformValue.ty;
                        }
                    }
                    else {
                        getCenterPoint = null;
                    }
                    renderer.renderElement(renderNode.wrapper, canvas, htmlLayer, (!renderer.isSvgMode && transform) ? transformValue : undefined, undefined, undefined, status_1 && (!this.diagramActions || isOverView), undefined, undefined, getCenterPoint, this.portCenterPoint);
                }
            }
        }
    };
    /**
     *updateBridging method \
     *
     * @returns { void } updateBridging method .\
     * @param {string} isLoad - provide the isLoad value.
     *
     * @private
     */
    Diagram.prototype.updateBridging = function (isLoad) {
        if (this.bridgingModule) {
            for (var i = 0; i < this.connectors.length; i++) {
                var connector = this.connectors[parseInt(i.toString(), 10)];
                this.bridgingModule.updateBridging(connector, this);
                var canvas = this.connectors[parseInt(i.toString(), 10)].wrapper;
                if (canvas && canvas.children && canvas.children.length > 0) {
                    var pathSegment = canvas.children[0];
                    var data = pathSegment.data;
                    if (connector.isBezierEditing && this.selectedItems.connectors[0].id === connector.id || connector.type !== 'Bezier') {
                        connector.getSegmentElement(connector, pathSegment, this.layout.type === 'ComplexHierarchicalTree' || this.layout.type === 'HierarchicalTree' ?
                            this.layout.orientation : undefined, undefined, false);
                    }
                    if (pathSegment.data !== data) {
                        canvas.measure(new Size());
                        canvas.arrange(canvas.desiredSize);
                        if (this.mode === 'SVG' && !isLoad) {
                            this.updateDiagramObject(connector);
                        }
                    }
                }
            }
        }
        else if (this.constraints & DiagramConstraints.Bridging) {
            console.warn('[WARNING] :: Module "ConnectorBridging" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
        }
    };
    /**
     *setCursor method \
     *
     * @returns { void } setCursor method .\
     * @param {string} cursor - provide the width value.
     *
     * @private
     */
    Diagram.prototype.setCursor = function (cursor) {
        this.diagramRenderer.setCursor(this.diagramCanvas, cursor);
    };
    /**
     *clearCanvas method \
     *
     * @returns { void } clearCanvas method .\
     * @param {View} view - provide the width value.
     *
     * @private
     */
    Diagram.prototype.clearCanvas = function (view) {
        //let width: number;
        //let height: number;
        var width = view.contentWidth || view.diagramLayer.width / this.scroller.currentZoom;
        var height = view.contentHeight || view.diagramLayer.height / this.scroller.currentZoom;
        if (view.mode !== 'SVG') {
            var ctx = CanvasRenderer.getContext(view.diagramLayer);
            ctx.clearRect(0, 0, width, height);
        }
    };
    /**
     *updateScrollOffset method \
     *
     * @returns { void } updateScrollOffset method .\
     *
     * @private
     */
    Diagram.prototype.updateScrollOffset = function () {
        this.scroller.setScrollOffset(this.diagramCanvas.scrollLeft, this.diagramCanvas.scrollTop);
        updateRuler(this);
        if (canVitualize(this)) {
            this.scroller.virtualizeElements();
        }
    };
    /**
     *setOffset method \
     *
     * @returns { void } setOffset method .\
     * @param {number} offsetX - provide the width value.
     * @param {number} offsetY - provide the height value.
     *
     * @private
     */
    Diagram.prototype.setOffset = function (offsetX, offsetY) {
        var domTable = 'domTable';
        if (!window["" + domTable][this.element.id + 'content']) {
            window["" + domTable][this.element.id + 'content'] = document.getElementById(this.element.id + 'content');
        }
        var container = window["" + domTable][this.element.id + 'content'];
        if (container) {
            container.scrollLeft = offsetX;
            container.scrollTop = offsetY;
        }
    };
    /**
     *setSize method \
     *
     * @returns { void } setSize method .\
     * @param {number} width - provide the width value.
     * @param {number} height - provide the height value.
     *
     * @private
     */
    Diagram.prototype.setSize = function (width, height) {
        if (this.diagramLayer && !this.preventDiagramUpdate) {
            var position = getRulerSize(this);
            width -= position.width;
            height -= position.height;
            var bounds = this.spatialSearch.getPageBounds();
            bounds.x *= this.scroller.currentZoom;
            bounds.y *= this.scroller.currentZoom;
            bounds.width *= this.scroller.currentZoom;
            bounds.height *= this.scroller.currentZoom;
            var factor = this.mode === 'SVG' ? 1 : 1.5;
            var diagramLayer = this.mode === 'SVG' ?
                getDiagramLayerSvg(this.element.id) : this.diagramLayer;
            var w = (this.mode === 'Canvas' &&
                (this.constraints & DiagramConstraints.Virtualization)) ? this.scroller.viewPortWidth : width;
            var h = (this.mode === 'Canvas' &&
                (this.constraints & DiagramConstraints.Virtualization)) ? this.scroller.viewPortHeight : height;
            diagramLayer.setAttribute('width', (factor * w).toString());
            diagramLayer.setAttribute('height', (factor * h).toString());
            var hiddenUserHandleTemplate = document.getElementById(this.element.id + '_diagramUserHandleLayer');
            if (hiddenUserHandleTemplate) {
                hiddenUserHandleTemplate.style.width = width + 'px';
                hiddenUserHandleTemplate.style.height = height + 'px';
            }
            var attr = { 'width': width.toString(), 'height': height.toString() };
            this.diagramLayerDiv.style.width = width + 'px';
            this.diagramLayerDiv.style.height = height + 'px';
            setAttributeSvg(getNativeLayerSvg(this.element.id), attr);
            setAttributeSvg(getPortLayerSvg(this.element.id), attr);
            var adornerSVG = getAdornerLayerSvg(this.element.id);
            setAttributeSvg(adornerSVG, attr);
            adornerSVG.parentNode.style.width = width + 'px';
            adornerSVG.parentNode.style.height = height + 'px';
            var gridLayer = getGridLayerSvg(this.element.id);
            setAttributeSvg(gridLayer, attr);
            this.diagramRenderer.updateGrid(this.snapSettings, gridLayer, this.scroller.transform, this.rulerSettings, this.hRuler, this.vRuler);
            setAttributeSvg(getBackgroundLayerSvg(this.element.id), attr);
            this.htmlLayer.style.width = width + 'px';
            this.htmlLayer.style.height = height + 'px';
            if (this.mode !== 'SVG' && !(canVitualize(this))) {
                this.refreshDiagramLayer();
            }
            if (this.mode === 'SVG' && canVitualize(this)) {
                this.scroller.virtualizeElements();
            }
        }
    };
    /**
     *transformLayers method \
     *
     * @returns { void } Defines how to remove the Page breaks .\
     *
     * @private
     */
    Diagram.prototype.transformLayers = function () {
        var bounds = this.spatialSearch.getPageBounds();
        bounds.x *= this.scroller.currentZoom;
        bounds.y *= this.scroller.currentZoom;
        bounds.width *= this.scroller.currentZoom;
        bounds.height *= this.scroller.currentZoom;
        this.diagramRenderer.updateGrid(this.snapSettings, getGridLayerSvg(this.element.id), this.scroller.transform, this.rulerSettings, this.hRuler, this.vRuler);
        this.diagramRenderer.transformLayers(this.scroller.transform, this.mode === 'SVG');
        if (!(this.diagramActions & DiagramAction.DragUsingMouse)) {
            this.updateSelector();
        }
        this.renderPageBreaks(bounds);
    };
    /**
     *Defines how to remove the Page breaks \
     *
     * @returns { void } Defines how to remove the Page breaks .\
     *
     * @private
     */
    Diagram.prototype.removePageBreaks = function () {
        if (this.diagramLayer) {
            var line = getBackgroundLayer(this.element.id);
            if (line && line.childNodes) {
                var length_2 = line.childNodes.length;
                for (var i = 0; i < length_2; i++) {
                    line.removeChild(line.childNodes[0]);
                }
            }
        }
    };
    /**
     * Defines how the page breaks has been rendered \
     *
     * @returns { void } Defines how the page breaks has been rendered .\
     * @param {Rect} bounds - provide the overview value.
     *
     * @private
     */
    Diagram.prototype.renderPageBreaks = function (bounds) {
        this.removePageBreaks();
        var backgroundLayer = getBackgroundLayer(this.element.id);
        if (backgroundLayer) {
            var i = 0;
            bounds = this.scroller.getPageBounds(true);
            var x = (this.scroller.transform.tx + bounds.x) * this.scroller.currentZoom;
            var y = (this.scroller.transform.ty + bounds.y) * this.scroller.currentZoom;
            var height = bounds.height * this.scroller.currentZoom;
            var width = bounds.width * this.scroller.currentZoom;
            DiagramRenderer.renderSvgBackGroundImage(this.pageSettings.background, this.element, x, y, width, height);
            var options = {
                id: backgroundLayer.id + 'rect', x: x,
                y: y,
                height: height,
                width: width, angle: 0, stroke: '', strokeWidth: 1,
                fill: this.pageSettings.background.color, opacity: 1,
                pivotX: 0, pivotY: 0, visible: true, dashArray: '0'
            };
            this.diagramRenderer.drawRect(backgroundLayer, options);
            if (this.pageSettings.showPageBreaks) {
                var collection = this.scroller.getPageBreak(bounds);
                for (i = 0; i < collection.length; i++) {
                    this.diagramRenderer.drawLine(backgroundLayer, {
                        class: 'e-diagram-page-break',
                        fill: 'none', stroke: '#aaaaaa', strokeWidth: 1, dashArray: '10 10',
                        opacity: 2, x: 0, y: 0, width: 0, height: 0, angle: 0, pivotX: 0, pivotY: 0, visible: true,
                        startPoint: {
                            x: (collection[parseInt(i.toString(), 10)].x1 + this.scroller.transform.tx) * this.scroller.currentZoom,
                            y: (collection[parseInt(i.toString(), 10)].y1 + this.scroller.transform.ty) * this.scroller.currentZoom
                        },
                        endPoint: {
                            x: (collection[parseInt(i.toString(), 10)].x2 + this.scroller.transform.tx) * this.scroller.currentZoom,
                            y: (collection[parseInt(i.toString(), 10)].y2 + this.scroller.transform.ty) * this.scroller.currentZoom
                        }, id: collection[parseInt(i.toString(), 10)].y1 === collection[parseInt(i.toString(), 10)].y2 ? 'HorizontalLines' : 'VerticalLines'
                    });
                }
            }
        }
    };
    Diagram.prototype.validatePageSize = function () {
        var temp = 0;
        if (this.pageSettings.orientation === 'Portrait') {
            if (this.pageSettings.width > this.pageSettings.height) {
                temp = this.pageSettings.height;
                this.pageSettings.height = this.pageSettings.width;
                this.pageSettings.width = temp;
            }
        }
        else {
            if (this.pageSettings.height > this.pageSettings.width) {
                temp = this.pageSettings.width;
                this.pageSettings.width = this.pageSettings.height;
                this.pageSettings.height = temp;
            }
        }
    };
    /**
     * setOverview method \
     *
     * @returns { void }     setOverview method .\
     * @param {View} overview - provide the overview value.
     * @param {string} id - provide the boolean value.
     *
     * @private
     */
    Diagram.prototype.setOverview = function (overview, id) {
        if (overview) {
            if (overview) {
                this.views.push(overview.id);
                this.views[overview.id] = overview;
                overview.renderDocument(overview);
                overview.diagramRenderer.setLayers();
                overview.updateView(overview);
                this.renderNodes(overview);
            }
        }
        else {
            for (var i = 0; i < this.views.length; i++) {
                if (this.views[parseInt(i.toString(), 10)] === id) {
                    overview = (this.views["" + id]);
                }
            }
            this.views["" + id] = undefined;
            var index = this.views.indexOf(id);
            this.views.splice(index, 1);
        }
    };
    Diagram.prototype.renderNodes = function (overview) {
        if (overview) {
            var renderer = new DiagramRenderer(overview.id, new SvgRenderer(), false);
            var g = document.getElementById(overview.element.id + '_diagramLayer');
            var htmlLayer = getHTMLLayer(overview.element.id);
            this.renderDiagramElements(g, overview.diagramRenderer || renderer, htmlLayer, undefined, undefined, true);
        }
    };
    Diagram.prototype.updateThumbConstraints = function (node, selectorModel, canInitialize) {
        var state = 0;
        var length = node.length;
        for (var i = 0; i < length; i++) {
            var obj = node[parseInt(i.toString(), 10)];
            var hideRotate = false;
            var hideResize = false;
            var thumbConstraints = selectorModel.thumbsConstraints;
            var isInsideSwimlane = false;
            if (this.nameTable[obj.parentId]) {
                var lane = this.nameTable[obj.parentId];
                isInsideSwimlane = lane.isLane;
            }
            if (obj instanceof Node) {
                //Bug 913796: Multiselect swimlane with outside node, drag, rotate is not proper.
                //Hided rotate thumb for swimlane
                hideRotate = (obj.shape.type === 'Bpmn' && (obj.shape.shape === 'Activity' &&
                    (obj.shape.activity.subProcess.collapsed === false))) || obj.shape.type === 'SwimLane' || isInsideSwimlane;
                // hideResize = (obj.shape.type === 'Bpmn' && (obj.shape as BpmnShapeModel).shape === 'TextAnnotation');
                if (!canRotate(obj) || !(thumbConstraints & ThumbsConstraints.Rotate) || hideRotate) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.Rotate;
                }
                if (!canResize(obj, 'SouthEast') || !(thumbConstraints & ThumbsConstraints.ResizeSouthEast) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeSouthEast;
                }
                if (!canResize(obj, 'NorthWest') || !(thumbConstraints & ThumbsConstraints.ResizeNorthWest) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeNorthWest;
                }
                if (!canResize(obj, 'East') || !(thumbConstraints & ThumbsConstraints.ResizeEast) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeEast;
                }
                if (!canResize(obj, 'West') || !(thumbConstraints & ThumbsConstraints.ResizeWest) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeWest;
                }
                if (!canResize(obj, 'North') || !(thumbConstraints & ThumbsConstraints.ResizeNorth) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeNorth;
                }
                if (!canResize(obj, 'South') || !(thumbConstraints & ThumbsConstraints.ResizeSouth) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeSouth;
                }
                if (!canResize(obj, 'NorthEast') || !(thumbConstraints & ThumbsConstraints.ResizeNorthEast) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeNorthEast;
                }
                if (!canResize(obj, 'SouthWest') || !(thumbConstraints & ThumbsConstraints.ResizeSouthWest) || hideResize) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ResizeSouthWest;
                }
            }
            else if (obj instanceof Connector) {
                if (!canInitialize) {
                    thumbConstraints = thumbConstraints | ThumbsConstraints.Default;
                }
                if (canDragSourceEnd(obj)) {
                    thumbConstraints = thumbConstraints | ThumbsConstraints.ConnectorSource;
                }
                else {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ConnectorSource;
                }
                if (canDragTargetEnd(obj)) {
                    thumbConstraints = thumbConstraints | ThumbsConstraints.ConnectorTarget;
                }
                else {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.ConnectorTarget;
                }
            }
            else {
                if (!canInitialize) {
                    thumbConstraints = thumbConstraints | ThumbsConstraints.Default;
                }
                if (!canResize(obj)) {
                    thumbConstraints = thumbConstraints & ~(ThumbsConstraints.ResizeSouthEast | ThumbsConstraints.ResizeSouthWest |
                        ThumbsConstraints.ResizeSouth | ThumbsConstraints.ResizeEast | ThumbsConstraints.ResizeWest |
                        ThumbsConstraints.ResizeNorth | ThumbsConstraints.ResizeNorthEast | ThumbsConstraints.ResizeNorthWest);
                }
                if (!canRotate(obj)) {
                    thumbConstraints = thumbConstraints & ~ThumbsConstraints.Rotate;
                }
            }
            selectorModel.thumbsConstraints = thumbConstraints;
        }
    };
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
    Diagram.prototype.renderSelector = function (multipleSelection, isSwimLane, canvas) {
        var isProtectedOnChangeValue = this.isProtectedOnChange;
        //Removed isBlazor code
        var size = new Size();
        var selectorModel = this.selectedItems;
        var selectorConstraints = selectorModel.constraints;
        var rendererActions = this.diagramRenderer.rendererActions;
        var innertemplate = document.getElementsByClassName('blazor-inner-template');
        var i;
        var div;
        this.diagramRenderer.rendererActions = this.currentSymbol ?
            this.addConstraints(rendererActions, RendererAction.DrawSelectorBorder) :
            this.removeConstraints(rendererActions, RendererAction.DrawSelectorBorder);
        this.clearSelectorLayer();
        if (this.commandHandler.hasSelection()) {
            if (selectorModel.nodes.length === 1 && selectorModel.connectors.length === 0) {
                selectorModel.rotateAngle = selectorModel.nodes[0].rotateAngle;
                selectorModel.pivot = selectorModel.nodes[0].pivot;
            }
            selectorModel.wrapper.measure(size);
            selectorModel.wrapper.arrange(selectorModel.wrapper.desiredSize);
            selectorModel.width = selectorModel.wrapper.actualSize.width;
            selectorModel.height = selectorModel.wrapper.actualSize.height;
            selectorModel.offsetX = selectorModel.wrapper.offsetX;
            selectorModel.offsetY = selectorModel.wrapper.offsetY;
            if (selectorModel.rotateAngle !== 0) {
                for (var _i = 0, _a = selectorModel.nodes; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    obj.offsetX = obj.wrapper.offsetX;
                    obj.offsetY = obj.wrapper.offsetY;
                }
                for (var _b = 0, _c = selectorModel.connectors; _b < _c.length; _b++) {
                    var conn = _c[_b];
                    //update connections
                }
            }
            var bounds = this.spatialSearch.getPageBounds();
            //let selectorElement: (SVGElement | HTMLCanvasElement);
            var selectorElement = getSelectorElement(this.element.id);
            //let diagramUserHandlelayer: (SVGElement | HTMLElement);
            var diagramUserHandlelayer = getUserHandleLayer(this.element.id);
            selectorModel.thumbsConstraints = ThumbsConstraints.Default;
            if (selectorModel.annotation) {
                this.updateThumbConstraints([selectorModel.annotation], selectorModel);
            }
            else {
                this.updateThumbConstraints(selectorModel.nodes, selectorModel);
                this.updateThumbConstraints(selectorModel.connectors, selectorModel, true);
            }
            if (selectorModel.annotation) {
                this.renderSelectorForAnnotation(selectorModel, selectorElement);
            }
            else if (selectorModel.nodes.length + selectorModel.connectors.length === 1 || this.nameTable['helper']) {
                if (selectorModel.nodes[0] instanceof Node) {
                    var node = selectorModel.nodes[0];
                    if (checkParentAsContainer(this, node)) {
                        if (!isSwimLane && (node.shape.type !== 'UmlClassifier' && !(node.parentId &&
                            this.nameTable[node.parentId]
                            && this.nameTable[node.parentId].shape.type === 'UmlClassifier'))) {
                            selectorModel.thumbsConstraints &= ~ThumbsConstraints.Rotate;
                        }
                    }
                    var constraints = isSwimLane ? true : ((node.constraints & NodeConstraints.HideThumbs) ? true : false);
                    var swimlane = (node.shape.type === 'SwimLane' || node.isLane || node.isPhase || isSwimLane) ? true : false;
                    this.diagramRenderer.renderResizeHandle(isSwimLane ? canvas : selectorModel.wrapper.children[0], selectorElement, selectorModel.thumbsConstraints, this.scroller.currentZoom, selectorModel.constraints, this.scroller.transform, undefined, canMove(node), constraints, swimlane, selectorModel.handleSize);
                }
                else if (selectorModel.connectors[0] instanceof Connector && canDrawThumbs(this.diagramRenderer.rendererActions)) {
                    var connector = selectorModel.connectors[0];
                    this.diagramRenderer.renderEndPointHandle(connector, selectorElement, selectorModel.thumbsConstraints, selectorModel.constraints, this.scroller.transform, connector.sourceWrapper !== undefined, connector.targetWrapper !== undefined, (this.connectorEditingToolModule && canDragSegmentThumb(connector)) ? true : false, this.connectorEditingToolModule ? true : false, selectorModel.handleSize);
                }
            }
            else {
                this.diagramRenderer.renderResizeHandle(selectorModel.wrapper, selectorElement, selectorModel.thumbsConstraints, this.scroller.currentZoom, selectorModel.constraints, this.scroller.transform, undefined, canMove(selectorModel), null, null, selectorModel.handleSize);
            }
            if (!(selectorModel.annotation) && !this.currentSymbol) {
                this.diagramRenderer.renderUserHandler(selectorModel, selectorElement, this.scroller.transform, diagramUserHandlelayer, this.eventHandler.currentAction, this.eventHandler.inAction);
                //Removed isBlazor code
            }
        }
        // EJ2-56919 - Add below code to render the selection rectangle for node if selected objects length is greater than one
        if (this.selectedItems.selectedObjects.length > 1) {
            this.updateSelectionRectangle();
        }
        this.isProtectedOnChange = isProtectedOnChangeValue;
    };
    Diagram.prototype.updateSelectionRectangle = function () {
        var selectorElement = getSelectorElement(this.element.id);
        var isFirst = false;
        for (var i = 0; i < this.selectedItems.selectedObjects.length; i++) {
            // EJ2-56919 - For first selected object we need to set stroke as 2, so check below condition as i is zero or not
            // For first element we passed isFirst argument(last arg) as true in both render selection line and rectangle method
            isFirst = i === 0 ? true : false;
            if (getObjectType(this.selectedItems.selectedObjects[parseInt(i.toString(), 10)]) === Connector) {
                // EJ2-56919 - If selected object type is connector means then render selection line for connector
                this.diagramRenderer.renderSelectionLine(this.selectedItems.selectedObjects[parseInt(i.toString(), 10)].wrapper.children[0], selectorElement, this.scroller.transform, isFirst);
            }
            else {
                // EJ2-56919 - If selected object type is node means then render selection rectangle for node
                this.diagramRenderer.renderSelectionRectangle(this.selectedItems.selectedObjects[parseInt(i.toString(), 10)].wrapper, selectorElement, this.scroller.transform, isFirst);
            }
        }
    };
    /**
     * updateSelector method \
     *
     * @returns { void }     updateSelector method .\
     *
     * @private
     */
    Diagram.prototype.updateSelector = function () {
        var severDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        var size = new Size();
        var selector = this.selectedItems;
        var selectorConstraints = selector.constraints;
        var innertemplate = document.getElementsByClassName('blazor-inner-template');
        var i;
        var div;
        if (!(this.diagramActions & DiagramAction.ToolAction) && this.selectedItems.nodes.length === 1) {
            this.selectedItems.rotateAngle = this.selectedItems.nodes[0].rotateAngle;
            this.selectedItems.wrapper.rotateAngle = this.selectedItems.nodes[0].rotateAngle;
        }
        if (this.selectedItems !== undefined) {
            this.clearSelectorLayer();
            if (selector.wrapper !== null && selector.wrapper.children && selector.wrapper.children.length) {
                var canUpdate = true;
                var canRender = true;
                if (selectionHasConnector(this, selector)) {
                    var eventHandler = 'eventHandler';
                    var rotate = this["" + eventHandler].action;
                    var isRotate = rotate.includes('Rotate');
                    var isSelect = rotate.includes('None') || rotate.includes('Select') || rotate.includes('Drag');
                    if (isRotate || isSelect) {
                        canRender = false;
                    }
                    if (!isSelect) {
                        canUpdate = false;
                    }
                }
                if (canUpdate) {
                    selector.wrapper.measure(size);
                    selector.wrapper.arrange(selector.wrapper.desiredSize);
                }
                if (selector.rotateAngle !== 0 || selector.rotateAngle !== selector.wrapper.prevRotateAngle) {
                    for (var _i = 0, _a = selector.nodes; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        obj.offsetX = obj.wrapper.offsetX;
                        obj.offsetY = obj.wrapper.offsetY;
                    }
                }
                selector.width = selector.wrapper.actualSize.width;
                selector.height = selector.wrapper.actualSize.height;
                selector.offsetX = selector.wrapper.offsetX;
                selector.offsetY = selector.wrapper.offsetY;
                //let selectorEle: (SVGElement | HTMLCanvasElement);
                var selectorEle = getSelectorElement(this.element.id);
                //let diagramUserHandlelayer: (SVGElement | HTMLElement);
                var diagramUserHandlelayer = getUserHandleLayer(this.element.id);
                var canHideResizers = this.eventHandler.canHideResizers();
                selector.thumbsConstraints = ThumbsConstraints.Default;
                if (selector.annotation) {
                    this.updateThumbConstraints([selector.annotation], selector);
                }
                else {
                    this.updateThumbConstraints(selector.nodes, selector);
                    this.updateThumbConstraints(selector.connectors, selector, true);
                }
                if ((this.selectedItems.constraints & SelectorConstraints.UserHandle) && (!(selector.annotation)) && !this.currentSymbol) {
                    this.diagramRenderer.renderUserHandler(selector, selectorEle, this.scroller.transform, diagramUserHandlelayer, this.eventHandler.currentAction, this.eventHandler.inAction);
                    //Removed isBlazor code
                }
                if (selector.annotation) {
                    this.renderSelectorForAnnotation(selector, selectorEle);
                }
                else if (selector.nodes.length + selector.connectors.length === 1) {
                    if (selector.connectors[0] instanceof Connector && canDrawThumbs(this.diagramRenderer.rendererActions)) {
                        var connector = selector.connectors[0];
                        this.diagramRenderer.renderEndPointHandle(connector, selectorEle, selector.thumbsConstraints, selectorConstraints, this.scroller.transform, connector.sourceWrapper !== undefined, connector.targetWrapper !== undefined, (this.connectorEditingToolModule && canDragSegmentThumb(connector)) ? true : false, this.connectorEditingToolModule ? true : false, selector.handleSize);
                    }
                    else if (selector.nodes[0] instanceof Node) {
                        var stackPanel = selector.nodes[0];
                        if (checkParentAsContainer(this, selector.nodes[0])) {
                            if (stackPanel.shape.type !== 'UmlClassifier' && !(stackPanel.parentId &&
                                this.nameTable[stackPanel.parentId]
                                && this.nameTable[stackPanel.parentId].shape.type === 'UmlClassifier')) {
                                selector.thumbsConstraints &= ~ThumbsConstraints.Rotate;
                            }
                        }
                        var swimlane = (stackPanel.shape.type === 'SwimLane' || stackPanel.isLane ||
                            stackPanel.isPhase) ? true : false;
                        this.diagramRenderer.renderResizeHandle(selector.wrapper.children[0], selectorEle, selector.thumbsConstraints, this.scroller.currentZoom, selector.constraints, this.scroller.transform, canHideResizers, canMove(selector.nodes[0]), (selector.nodes[0].constraints & NodeConstraints.HideThumbs) ? true : false, swimlane, selector.handleSize);
                    }
                }
                else {
                    if (this.diagramActions & DiagramAction.Interactions) {
                        this.diagramRenderer.rendererActions = this.diagramRenderer.rendererActions | RendererAction.PreventRenderSelector;
                    }
                    if (!(selectionHasConnector(this, selector) && canRender)) {
                        this.diagramRenderer.renderResizeHandle(selector.wrapper, selectorEle, selector.thumbsConstraints, this.scroller.currentZoom, selector.constraints, this.scroller.transform, canHideResizers, canMove(selector), null, null, selector.handleSize);
                    }
                    this.diagramRenderer.rendererActions = this.diagramRenderer.rendererActions & ~RendererAction.PreventRenderSelector;
                }
            }
        }
        // EJ2-56919 - Add below code to render selection rectangle for node if selected objects length is greater than one
        if (this.selectedItems.selectedObjects.length > 1) {
            this.updateSelectionRectangle();
        }
        this.enableServerDataBinding(severDataBind);
    };
    /**
     * renderSelectorForAnnotation method \
     *
     * @returns { void }     renderSelectorForAnnotation method .\
     * @param {Selector} selectorModel - provide the x value.
     * @param {(SVGElement | HTMLCanvasElement)} selectorElement - provide the y value.
     *
     * @private
     */
    //(EJ2-66036)- Annotation interaction not rendered properly
    Diagram.prototype.renderSelectorForAnnotation = function (selectorModel, selectorElement) {
        this.diagramRenderer.renderResizeHandle(selectorModel.wrapper.children[0], selectorElement, selectorModel.thumbsConstraints, this.scroller.currentZoom, selectorModel.constraints, this.scroller.transform, undefined, canMove(selectorModel.annotation), undefined, undefined, selectorModel.handleSize);
    };
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
    Diagram.prototype.drawSelectionRectangle = function (x, y, width, height) {
        this.clearSelectorLayer();
        this.diagramRenderer.drawSelectionRectangle(x, y, width, height, this.adornerLayer, this.scroller.transform);
    };
    /**
     * renderHighlighter method \
     *
     * @returns { void }     renderHighlighter method .\
     * @param {DiagramElement} element - provide the node value.
     *
     * @private
     */
    Diagram.prototype.renderHighlighter = function (element) {
        var adornerSvg = getAdornerLayerSvg(this.element.id);
        this.diagramRenderer.renderHighlighter(element, adornerSvg, this.scroller.transform);
    };
    /**
     * clearHighlighter method \
     *
     * @returns { void }     clearHighlighter method .\
     *
     * @private
     */
    Diagram.prototype.clearHighlighter = function () {
        var adornerSvg = getAdornerLayerSvg(this.element.id);
        var highlighter = adornerSvg.getElementById(adornerSvg.id + '_highlighter');
        if (highlighter) {
            highlighter.parentNode.removeChild(highlighter);
        }
    };
    /**
     * getNodesConnectors method \
     *
     * @returns { (NodeModel | ConnectorModel)[] }     getNodesConnectors method .\
     * @param {(NodeModel | ConnectorModel)[]} selectedItems - provide the node value.
     *
     * @private
     */
    Diagram.prototype.getNodesConnectors = function (selectedItems) {
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[parseInt(i.toString(), 10)];
            selectedItems.push(node);
        }
        for (var i = 0; i < this.connectors.length; i++) {
            var conn = this.connectors[parseInt(i.toString(), 10)];
            selectedItems.push(conn);
        }
        return selectedItems;
    };
    /**
     * clearSelectorLayer method \
     *
     * @returns { void }     clearSelectorLayer method .\
     *
     * @private
     */
    Diagram.prototype.clearSelectorLayer = function () {
        var adornerSvg = getAdornerLayerSvg(this.element.id);
        var innertemplate = document.getElementsByClassName('blazor-inner-template');
        var i;
        var div;
        var j;
        if (!this.currentSymbol) {
            var selectionRect = adornerSvg.getElementById(this.adornerLayer.id + '_selected_region');
            if (selectionRect) {
                selectionRect.parentNode.removeChild(selectionRect);
            }
            this.clearHighlighter();
            var childNodes = getSelectorElement(this.element.id).childNodes;
            var child = void 0;
            //Bug 914365: Node is not resizable using touch interaction
            //Added below code to get the target which we are dragging using touch interaction
            var handleId = this.eventHandler.touchArgs ? this.eventHandler.touchArgs.target.id : undefined;
            if (handleId && handleId.includes('bezierLine')) {
                handleId = undefined;
            }
            for (var i_3 = childNodes.length; i_3 > 0; i_3--) {
                //Added below code to prevent the removal of target element from DOM while doing touch move interaction
                if (this.eventHandler && this.eventHandler.touchArgs && this.eventHandler.touchArgs.type === 'touchmove') {
                    this.diagramRenderer.touchMove = true;
                    if (!(handleId && handleId === childNodes[i_3 - 1].id)) {
                        child = childNodes[i_3 - 1];
                        child.parentNode.removeChild(child);
                    }
                }
                else {
                    child = childNodes[i_3 - 1];
                    child.parentNode.removeChild(child);
                }
            }
            //Removed isBlazor code
            if (!isBlazor()) {
                var templates = getUserHandleLayer(this.element.id).childNodes;
                for (i = templates.length; i > 0; i--) {
                    templates[i - 1].parentNode.removeChild(templates[i - 1]);
                }
            }
        }
        else {
            var symbolBorder = adornerSvg.getElementById('borderRect_symbol');
            if (symbolBorder) {
                symbolBorder.parentNode.removeChild(symbolBorder);
            }
        }
    };
    /**
     * getWrapper method \
     *
     * @returns { void }     getWrapper method .\
     * @param {Container} nodes - provide the node value.
     * @param {string} id - provide the childernCollection value.
     *
     * @private
     */
    Diagram.prototype.getWrapper = function (nodes, id) {
        var wrapper;
        id = nodes.id + '_' + id;
        var container = nodes instanceof Canvas ? nodes : this.getPortContainer(this.nameTable[nodes.id]);
        for (var i = 0; i < container.children.length; i++) {
            if (id === container.children[parseInt(i.toString(), 10)].id) {
                wrapper = container.children[parseInt(i.toString(), 10)];
            }
        }
        return wrapper;
    };
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
    Diagram.prototype.getEndNodeWrapper = function (node, connector, source) {
        if (node.shape.type === 'Bpmn' && node.wrapper.children[0] instanceof Canvas) {
            if ((!isBlazor() && node.shape.shape === 'Activity')) {
                if (source && node.shape.activity.subProcess.type === 'Transaction'
                    && connector.sourcePortID) {
                    var portId = connector.sourcePortID;
                    var parent_5 = node.wrapper.children[0].children[0].children[2];
                    if (parent_5.children) {
                        for (var _i = 0, _a = parent_5.children; _i < _a.length; _i++) {
                            var child = _a[_i];
                            if (child.visible && child.id === node.id + '_' + portId) {
                                return child.children[0];
                            }
                        }
                    }
                }
                return node.wrapper.children[0].children[0].children[0];
            }
            if (node.shape.shape === 'Group') {
                return node.wrapper.children[0];
            }
            return node.wrapper.children[0].children[0];
        }
        if (!this.containsMargin(node.wrapper.children[0])) {
            if (!node.children) {
                return node.wrapper.children[0];
            }
        }
        return node.wrapper;
    };
    Diagram.prototype.containsMargin = function (node) {
        return node.margin && (node.margin.left !== 0 || node.margin.top !== 0 || node.margin.right !== 0 || node.margin.bottom !== 0);
    };
    Diagram.prototype.focusOutEdit = function () {
        this.endEdit();
        // EJ2-57743 - Added below code to refresh the diagram layer after the annotation gets edited in canvas mode.
        if (this.mode === 'Canvas' && this.scroller.currentZoom !== 1) {
            this.refreshDiagramLayer();
        }
    };
    Diagram.prototype.endEditCommand = function () {
        this.endEdit();
        this.textEditing = false;
        // EJ2-57743 - Added below code to refresh the diagram layer after the annotation gets edited in canvas mode.
        if (this.mode === 'Canvas' && this.scroller.currentZoom !== 1) {
            this.refreshDiagramLayer();
        }
    };
    // EJ2-866418-keyboard shortcut keys method starting
    //Change the text style of nodes,swimlane,textnode
    Diagram.prototype.fontStyleCommand = function (format) {
        for (var i = 0; i < this.selectedItems.nodes.length; i++) {
            var node = this.selectedItems.nodes[parseInt(i.toString(), 10)];
            if (node.shape.type === 'SwimLane') {
                if (node.shape.hasHeader) {
                    this.applyStyleText(format, node.shape.header.annotation);
                }
            }
            if (node.isLane) {
                var laneHeader = this.getObject(node.shape.header[0].id);
                this.applyStyle(format, laneHeader.annotations);
            }
            if (node.shape.type === 'Text') {
                var textNode = node;
                this.applyStyleText(format, textNode);
            }
            if (node.annotations.length > 0) {
                var annotationLength = node.annotations;
                this.applyStyle(format, annotationLength);
            }
        }
        for (var i = 0; i < this.selectedItems.connectors.length; i++) {
            if (this.selectedItems.connectors[parseInt(i.toString(), 10)].annotations.length > 0) {
                var annotationLength = this.selectedItems.connectors[parseInt(i.toString(), 10)].annotations;
                this.applyStyle(format, annotationLength);
            }
        }
    };
    Diagram.prototype.applyStyle = function (format, annotationLength) {
        for (var j = 0; j < annotationLength.length; j++) {
            switch (format) {
                case 'bold':
                    annotationLength[parseInt(j.toString(), 10)].style.bold = !annotationLength[parseInt(j.toString(), 10)].style.bold;
                    break;
                case 'italic':
                    annotationLength[parseInt(j.toString(), 10)].style.italic = !annotationLength[parseInt(j.toString(), 10)].style.italic;
                    break;
                case 'underline':
                    if (annotationLength[parseInt(j.toString(), 10)].style.textDecoration === 'None') {
                        annotationLength[parseInt(j.toString(), 10)].style.textDecoration = 'Underline';
                    }
                    else if (annotationLength[parseInt(j.toString(), 10)].style.textDecoration === 'Underline') {
                        annotationLength[parseInt(j.toString(), 10)].style.textDecoration = 'None';
                    }
                    break;
            }
        }
        this.dataBind();
    };
    Diagram.prototype.applyStyleText = function (format, textNode) {
        switch (format) {
            case 'bold':
                textNode.style.bold = !textNode.style.bold;
                break;
            case 'italic':
                textNode.style.italic = !textNode.style.italic;
                break;
            case 'underline':
                if (textNode.style.textDecoration === 'None') {
                    textNode.style.textDecoration = 'Underline';
                }
                else if (textNode.style.textDecoration === 'Underline') {
                    textNode.style.textDecoration = 'None';
                }
                break;
        }
        this.dataBind();
    };
    //To duplicate the elements on clicking Ctrl+D
    Diagram.prototype.duplicateCommand = function () {
        var selectedItems = [];
        selectedItems = selectedItems.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        this.copy();
        this.paste();
    };
    //To group and ungroup the elements
    Diagram.prototype.groupCommand = function (group) {
        switch (group) {
            case 'group':
                this.group();
                break;
            case 'ungroup':
                this.unGroup();
                break;
        }
    };
    //To rotate clockwise and anti-clockwise the elements
    Diagram.prototype.rotateCommand = function (rotateValue) {
        var selectedItems = this.selectedItems;
        switch (rotateValue) {
            case 'clockwise':
                this.rotate(selectedItems, 90);
                break;
            case 'antiClockwise':
                this.rotate(selectedItems, -90);
                break;
        }
    };
    //To flip horizontally and vertically the elements
    Diagram.prototype.flipCommand = function (flipValue) {
        var selectedItems = [];
        selectedItems = selectedItems.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        for (var i = 0; i < selectedItems.length; i++) {
            switch (flipValue) {
                case 'horizontal':
                    selectedItems[parseInt(i.toString(), 10)].flip = FlipDirection.Horizontal;
                    break;
                case 'vertical':
                    selectedItems[parseInt(i.toString(), 10)].flip = FlipDirection.Vertical;
                    break;
            }
        }
        this.dataBind();
    };
    //To exceute the tool commands
    Diagram.prototype.toolCommand = function (tool) {
        switch (tool) {
            case 'pointer': {
                this.tool = DiagramTools.Default;
                this.dataBind();
                break;
            }
            case 'text': {
                var textnode = {
                    shape: { type: 'Text' }
                };
                this.drawingObject = textnode;
                this.tool = DiagramTools.DrawOnce;
                this.dataBind();
                break;
            }
            case 'connect': {
                var connectors = {
                    id: 'connector1',
                    type: 'Straight'
                };
                this.drawingObject = connectors;
                this.tool = DiagramTools.DrawOnce;
                this.dataBind();
                break;
            }
            case 'freeForm': {
                var freeform = { id: 'connector1', type: 'Freehand' };
                this.drawingObject = freeform;
                this.tool = DiagramTools.DrawOnce;
                this.dataBind();
                break;
            }
            case 'line': {
                var polyline = { id: 'connector1', type: 'Polyline' };
                this.drawingObject = polyline;
                this.tool = DiagramTools.DrawOnce;
                this.dataBind();
                break;
            }
            case 'rectangle': {
                var drawingshape = { type: 'Basic', shape: 'Rectangle' };
                var basicNode = {
                    shape: drawingshape
                };
                this.drawingObject = basicNode;
                this.tool = DiagramTools.DrawOnce;
                this.dataBind();
                break;
            }
            case 'ellipse': {
                var drawingNode = { type: 'Basic', shape: 'Ellipse' };
                var ellipseNode = {
                    shape: drawingNode
                };
                this.drawingObject = ellipseNode;
                this.tool = DiagramTools.DrawOnce;
                this.dataBind();
                break;
            }
        }
    };
    //To zoomin and zoom-out the diagram
    Diagram.prototype.zoomCommand = function (zoomValue) {
        switch (zoomValue) {
            case 'zoomIn':
                this.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                break;
            case 'zoomOut':
                this.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                break;
        }
    };
    //To move the diagram elements five pixel based on the arrow keys
    Diagram.prototype.shiftCommand = function (direction) {
        for (var i = 0; i < this.selectedItems.nodes.length; i++) {
            var pixel = 5;
            if (direction === 'Up') {
                this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetY
                    = this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetY - pixel;
            }
            else if (direction === 'Down') {
                this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetY
                    = this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetY + pixel;
            }
            else if (direction === 'Left') {
                this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetX
                    = this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetX - pixel;
            }
            else if (direction === 'Right') {
                this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetX
                    = this.selectedItems.nodes[parseInt(i.toString(), 10)].offsetX + pixel;
            }
        }
        for (var i = 0; i < this.selectedItems.connectors.length; i++) {
            var connector = this.selectedItems;
            if (direction === 'Up') {
                this.drag(connector, 0, -5);
            }
            else if (direction === 'Down') {
                this.drag(connector, 0, 5);
            }
            else if (direction === 'Left') {
                this.drag(connector, -5, 0);
            }
            else if (direction === 'Right') {
                this.drag(connector, 5, 0);
            }
        }
    };
    //To execute the text align
    Diagram.prototype.alignCommand = function (alignDirection) {
        if (this.selectedItems.nodes.length > 0) {
            for (var i = 0; i < this.selectedItems.nodes.length; i++) {
                this.updateNodesAndConnectorAnnotation(this.selectedItems.nodes[parseInt(i.toString(), 10)], alignDirection);
            }
        }
    };
    Diagram.prototype.updateNodesAndConnectorAnnotation = function (object, alignDirection) {
        var annotation;
        for (var i = 0; i < object.annotations.length; i++) {
            annotation = object.annotations[parseInt(i.toString(), 10)];
            switch (alignDirection) {
                case 'left':
                    annotation.horizontalAlignment = 'Left';
                    break;
                case 'center':
                    annotation.horizontalAlignment = 'Center';
                    break;
                case 'right':
                    annotation.horizontalAlignment = 'Right';
                    break;
                case 'justify':
                    annotation.style.textAlign = 'Justify';
                    break;
                case 'top':
                    annotation.verticalAlignment = 'Top';
                    break;
                case 'centerVertical':
                    annotation.verticalAlignment = 'Center';
                    break;
                case 'bottom':
                    annotation.verticalAlignment = 'Bottom';
                    break;
            }
            this.dataBind();
        }
    };
    //To execute ordercommands using keyboard shortcuts
    Diagram.prototype.orderCommand = function (orderCommand) {
        switch (orderCommand) {
            case 'sendToBack':
                this.sendToBack();
                break;
            case 'bringToFront':
                this.bringToFront();
                break;
            case 'sendBackward':
                this.sendBackward();
                break;
            case 'bringForward':
                this.moveForward();
                break;
        }
    };
    //To execute the selection of elements on clicking tab key
    Diagram.prototype.navigateItems = function (tabCommand) {
        var currentSelectedNodeIndex = 0;
        var lastZIndex = this.activeLayer.objectZIndex;
        var selectedItems = [];
        var selectables = [];
        selectedItems = selectedItems.concat(this.selectedItems.nodes, this.selectedItems.connectors);
        selectables = selectables.concat(this.nodes, this.connectors);
        if (selectedItems.length > 0) {
            currentSelectedNodeIndex = selectedItems[0].zIndex + (tabCommand ? 1 : -1);
        }
        else {
            currentSelectedNodeIndex = tabCommand ? 0 : lastZIndex;
        }
        if (currentSelectedNodeIndex < 0) {
            currentSelectedNodeIndex = lastZIndex;
        }
        else if (currentSelectedNodeIndex > lastZIndex) {
            currentSelectedNodeIndex = 0;
        }
        var isSelected = false;
        do {
            for (var i = 0; i < selectables.length; i++) {
                var nextObject = selectables[parseInt(i.toString(), 10)];
                if (currentSelectedNodeIndex === nextObject.zIndex) {
                    this.clearSelection();
                    this.select([nextObject]);
                    isSelected = true;
                    break; // Exit the loop once a node or connector is selected
                }
            }
            if (!isSelected) {
                if (tabCommand) {
                    currentSelectedNodeIndex++; // If no selection has been made, increment currentSelectedNodeIndex for Tab command
                }
                else {
                    currentSelectedNodeIndex--; // If no selection has been made, decrement currentSelectedNodeIndex for shift + Tab
                }
            }
        } while (!isSelected);
    };
    /**
     * @private
     */
    /* tslint:disable */
    Diagram.prototype.endEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blazor, blazorInterop, oldValues, changedvalues, annotations, textArea, text, element, node, annotation, args, textWrapper, index, deleteNode, contentModified, index, changesAnnotation, nodeIndex, oldnodes, newnodes, clonedObject, selectedNode, swimLaneNode, laneHeader, phaseHeader, collection, j;
            return __generator(this, function (_a) {
                if (this.diagramActions & DiagramAction.TextEdit) {
                    blazor = 'Blazor';
                    blazorInterop = 'sfBlazor';
                    oldValues = void 0;
                    changedvalues = void 0;
                    annotations = {};
                    this.enableServerDataBinding(false);
                    textArea = document.getElementById(this.element.id + '_editBox');
                    if (!isBlazor()) {
                        text = textArea.value;
                        EventHandler.remove(textArea, 'input', this.eventHandler.inputChange);
                        EventHandler.remove(textArea, 'focusout', this.focusOutEdit);
                        element = document.getElementById(this.element.id + '_editTextBoxDiv');
                        node = void 0;
                        node = this.nameTable[this.activeLabel.parentId];
                        annotation = findAnnotation(node, this.activeLabel.id);
                        args = { oldValue: this.activeLabel.text, newValue: text, cancel: false, element: node, annotation: annotation };
                        //Removed isBlazor code
                        element.parentNode.removeChild(element);
                        textWrapper = void 0;
                        if (annotation && !(annotation instanceof Text)) {
                            index = findObjectIndex(node, annotation.id, true);
                            annotations["" + index] = { content: annotation.content };
                            oldValues = { annotations: annotations };
                        }
                        else {
                            //Removed isBlazor code
                            oldValues = { shape: { content: node.shape.content } };
                        }
                        deleteNode = false;
                        if (this.eventHandler['currentAction'] === 'Draw') {
                            deleteNode = this.eventHandler.isAddTextNode(node, true);
                        }
                        if (!deleteNode && (element.textContent !== text || text !== this.activeLabel.text)) {
                            //Removed isBlaor code
                            this.triggerEvent(DiagramEvent.textEdit, args);
                        }
                        if (!textWrapper) {
                            textWrapper = this.getWrapper(node.wrapper, this.activeLabel.id);
                        }
                        contentModified = false;
                        if (annotation.content !== text && !args.cancel) {
                            contentModified = true;
                            if (!this.activeLabel.isGroup) {
                                this.startGroupAction();
                            }
                            if (node.parentId && this.nameTable[node.parentId].shape.type === 'UmlClassifier'
                                && text.indexOf('+') === -1 && text.indexOf('-') === -1 && text.indexOf('#') === -1
                                && text.indexOf('~') === -1 && node.id.indexOf('_umlClass_header') === -1) {
                                text = ' + ' + text;
                            }
                            if (node.isLane || node.isPhase) {
                                this.protectPropertyChange(true);
                            }
                            if (!(annotation instanceof Text)) {
                                index = findObjectIndex(node, annotation.id, true);
                                changesAnnotation = {};
                                changesAnnotation["" + index] = { content: text };
                                changedvalues = { annotations: changesAnnotation };
                            }
                            else {
                                //Removed isBlazor code
                                changedvalues = { shape: { content: text } };
                            }
                            nodeIndex = this.getIndex(node, node.id);
                            if (nodeIndex) {
                                oldnodes = {};
                                oldnodes["" + nodeIndex] = oldValues;
                                newnodes = {};
                                newnodes["" + nodeIndex] = changedvalues;
                                if (getObjectType(node) === Node) {
                                    this.onPropertyChanged({ nodes: newnodes }, { nodes: oldnodes });
                                }
                                else {
                                    this.onPropertyChanged({ connectors: newnodes }, { connectors: oldnodes });
                                }
                            }
                            this.protectPropertyChange(true);
                            //Removed isBlazor code
                            annotation.content = text;
                            this.protectPropertyChange(false);
                            this.updateSelector();
                            if (node.isLane || node.isPhase) {
                                this.protectPropertyChange(false);
                            }
                        }
                        if (deleteNode) {
                            this.removeObjectsFromLayer(node);
                            this.removeFromAQuad(node);
                            delete this.nameTable[this.activeLabel.parentId];
                            if (text !== '') {
                                this.clearSelection();
                                clonedObject = cloneObject(node);
                                node = this.add(clonedObject);
                                this.updateDiagramObject(node);
                                this.commandHandler.oldSelectedObjects = cloneSelectedObjects(this);
                                this.commandHandler.select(this.nameTable[node.id]);
                                // this.commandHandler.updateBlazorSelector();
                            }
                        }
                        if (this.selectedItems.nodes.length) {
                            selectedNode = this.nameTable[this.activeLabel.parentId];
                            swimLaneNode = this.nameTable[selectedNode.parentId];
                            if ((swimLaneNode && swimLaneNode.shape.type === 'SwimLane') || (selectedNode.shape.type === 'SwimLane')) {
                                laneHeader = 'LaneHeaderParent';
                                phaseHeader = 'PhaseHeaderParent';
                                if ((selectedNode.shape.type === 'SwimLane')) {
                                    swimLaneNode = this.nameTable[this.activeLabel.parentId];
                                    selectedNode = node;
                                }
                                if ((selectedNode.isLane || selectedNode.isPhase)) {
                                    collection = selectedNode.isLane ?
                                        swimLaneNode.shape.lanes : swimLaneNode.shape.phases;
                                    for (j = 0; j < collection.length; j++) {
                                        if (collection[parseInt(j.toString(), 10)].id === (selectedNode["" + laneHeader] || selectedNode["" + phaseHeader])) {
                                            collection[parseInt(j.toString(), 10)].header.annotation.content = selectedNode.annotations[0].content;
                                        }
                                    }
                                }
                                else if (selectedNode.isHeader && swimLaneNode.shape.hasHeader) {
                                    swimLaneNode.shape.header.annotation.content = selectedNode.annotations[0].content;
                                }
                            }
                            this.dataBind();
                        }
                        textWrapper.visible = true;
                        this.updateDiagramObject(node);
                        this.diagramActions = this.diagramActions & ~DiagramAction.TextEdit;
                        if (this.activeLabel.isGroup || contentModified) {
                            this.endGroupAction();
                        }
                        this.activeLabel = { id: '', parentId: '', isGroup: false, text: undefined };
                        this.commandHandler.getBlazorOldValues();
                        //Removed isBlazor code
                        this.enableServerDataBinding(true);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * getIndex method \
     *
     * @returns { void }     getIndex method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     * @param {string} id - provide the childernCollection value.
     *
     * @private
     */
    Diagram.prototype.getIndex = function (node, id) {
        //let index: number;
        var collection = (getObjectType(node) === Node) ? this.nodes : this.connectors;
        for (var i = 0; i < collection.length; i++) {
            if (collection[parseInt(i.toString(), 10)].id.toString() === id.toString()) {
                return i.toString();
            }
        }
        return null;
    };
    /* tslint:enable */
    //Removed getBlazorTextEditArgs method
    /**
     * canLogChange method \
     *
     * @returns { void }     canLogChange method .\
     *
     * @private
     */
    Diagram.prototype.canLogChange = function () {
        if ((this.diagramActions & DiagramAction.Render) && (!(this.diagramActions & DiagramAction.ToolAction)) &&
            (!(this.diagramActions & DiagramAction.UndoRedo)) && (!(this.diagramActions & DiagramAction.PublicMethod))) {
            return true;
        }
        else {
            return false;
        }
    };
    Diagram.prototype.modelChanged = function (newProp, oldProp) {
        if (newProp.connectors || oldProp.connectors || newProp.nodes || oldProp.connectors
            || newProp.pageSettings || oldProp.pageSettings || newProp.bridgeDirection || oldProp.bridgeDirection) {
            return true;
        }
        return false;
    };
    Diagram.prototype.resetDiagramActions = function (action) {
        var isAction = action ? true : false;
        if (this.diagramActions & DiagramAction.UndoRedo && (!isAction || (action === DiagramAction.UndoRedo))) {
            this.diagramActions = this.diagramActions & ~DiagramAction.UndoRedo;
        }
        if (this.diagramActions & DiagramAction.PublicMethod && (!isAction || action === DiagramAction.PublicMethod)) {
            this.diagramActions = this.diagramActions & ~DiagramAction.PublicMethod;
        }
    };
    /**
     * removeNode method \
     *
     * @returns { void }     removeNode method .\
     * @param {NodeModel} node - provide the node value.
     * @param {NodeModel} childrenCollection - provide the childrenCollection value.
     *
     * @private
     */
    Diagram.prototype.removeNode = function (node, childrenCollection) {
        this.removeObjectsFromLayer(node);
        this.removeFromAQuad(this.nameTable[node.id]);
        var groupElement = document.getElementById(node.id + '_groupElement');
        delete this.nameTable[node.id];
        if (node.children) {
            delete this.groupTable[node.id];
        }
        //Removed isBlazor code
        this.nodes.splice(this.nodes.indexOf(node), 1);
        if (groupElement && groupElement.children && groupElement.children.length > 0) {
            var beforeElement = undefined;
            for (var j = groupElement.children.length - 1; j >= 0; j--) {
                var childElement = groupElement.children[parseInt(j.toString(), 10)];
                //EJ2-863636 - Nodes Removed from Diagram upon Ungrouping
                if (childrenCollection.length > 0 && childrenCollection.indexOf(childElement.id.split('_groupElement')[0]) !== -1) {
                    if (!beforeElement) {
                        groupElement.parentNode.insertBefore(childElement, groupElement);
                    }
                    else {
                        groupElement.parentNode.insertBefore(childElement, beforeElement);
                    }
                    beforeElement = childElement;
                }
            }
        }
        if (groupElement) {
            groupElement.parentNode.removeChild(groupElement);
        }
    };
    /**
     * deleteGroup method \
     *
     * @returns { void }     deleteGroup method .\
     * @param {NodeModel} node - provide the source value.
     *
     * @private
     */
    Diagram.prototype.deleteGroup = function (node) {
        var elements = [];
        var tempNode = [];
        if (node.children) {
            tempNode = this.commandHandler.getChildren(node, elements);
        }
        this.UpdateBlazorDiagramModelCollection(node);
        for (var _i = 0, tempNode_1 = tempNode; _i < tempNode_1.length; _i++) {
            var nodes = tempNode_1[_i];
            if (nodes && this.nameTable[nodes.id]) {
                this.remove(nodes);
            }
        }
    };
    //helper methods - end region
    //property changes - start region
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
    Diagram.prototype.updateObject = function (actualObject, oldObject, changedProp) {
        if (!(this.diagramActions & DiagramAction.ToolAction)) {
            var bound = actualObject.wrapper.children[0].bounds;
            var checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, bound, true);
            if (!checkBoundaryConstraints) {
                if (actualObject instanceof Node) {
                    var oldNode = oldObject;
                    for (var _i = 0, _a = Object.keys(changedProp); _i < _a.length; _i++) {
                        var key = _a[_i];
                        switch (key) {
                            case 'width':
                                actualObject.width = oldNode.width;
                                break;
                            case 'height':
                                actualObject.height = oldNode.height;
                                break;
                            case 'offsetX':
                                actualObject.offsetX = oldNode.offsetX;
                                break;
                            case 'offsetY':
                                actualObject.offsetY = oldNode.offsetY;
                                break;
                            case 'rotateAngle':
                                actualObject.rotateAngle = oldNode.rotateAngle;
                                break;
                        }
                    }
                    this.nodePropertyChange(actualObject, changedProp, oldObject);
                }
                else {
                    for (var _b = 0, _c = Object.keys(changedProp); _b < _c.length; _b++) {
                        var key = _c[_b];
                        var oldConnector = oldObject;
                        var actualSourcePoint = actualObject.sourcePoint;
                        var actualTargetPoint = actualObject.targetPoint;
                        switch (key) {
                            case 'sourcePoint':
                                actualSourcePoint.x = oldConnector.sourcePoint.x || actualSourcePoint.x;
                                actualSourcePoint.y = oldConnector.sourcePoint.y || actualSourcePoint.y;
                                break;
                            case 'targetPoint':
                                actualTargetPoint.x = oldConnector.targetPoint.x || actualTargetPoint.x;
                                actualTargetPoint.y = oldConnector.targetPoint.y || actualTargetPoint.y;
                        }
                    }
                    this.connectorPropertyChange(actualObject, changedProp, oldObject);
                }
            }
        }
    };
    Diagram.prototype.nodePropertyChangeExtend = function (actualObject, oldObject, node, update) {
        if (node.style !== undefined && actualObject.shape.type !== 'Bpmn') {
            updateStyle(node.style, actualObject.wrapper.children[0]);
            update = true;
        }
        if (node.shadow !== undefined) {
            this.updateShadow(actualObject.shadow, node.shadow);
            update = true;
        }
        if (node.constraints !== undefined) {
            if ((oldObject.constraints & NodeConstraints.Select) &&
                (!(node.constraints & NodeConstraints.Select)) && isSelected(this, actualObject)) {
                this.clearSelection();
            }
            else {
                this.updateThumbConstraints(this.selectedItems.nodes, this.selectedItems);
                this.updateSelector();
                update = true;
            }
        }
        this.updateTextAnnotationInSwimlane(actualObject, node);
        this.swimLaneNodePropertyChange(actualObject, oldObject, node, update);
        return update;
    };
    //To update text annotation node inside swimlane while dragging the text annotation parent.
    Diagram.prototype.updateTextAnnotationInSwimlane = function (actualObject, node) {
        if (actualObject.hasTextAnnotation && this.isPositionUndo) {
            for (var i = 0; i < actualObject.outEdges.length; i++) {
                var con = this.nameTable[actualObject.outEdges[parseInt(i.toString(), 10)]];
                if (con.isBpmnAnnotationConnector) {
                    var textNode = this.nameTable[con.targetID];
                    this.isProtectedOnChange = true;
                    if (actualObject.laneMargin && textNode) {
                        var dx = actualObject.margin.left - actualObject.laneMargin.left;
                        var dy = actualObject.margin.top - actualObject.laneMargin.top;
                        textNode.margin.left += dx;
                        textNode.margin.top += dy;
                        textNode.offsetX += dx;
                        textNode.offsetY += dy;
                        textNode.wrapper.offsetX += dx;
                        textNode.wrapper.offsetY += dy;
                        textNode.wrapper.measure(new Size(textNode.wrapper.width, textNode.wrapper.height));
                        textNode.wrapper.arrange(textNode.wrapper.desiredSize);
                        this.updateDiagramObject(textNode);
                    }
                    this.isProtectedOnChange = false;
                }
            }
        }
    };
    /* tslint:disable */
    Diagram.prototype.swimLaneNodePropertyChange = function (actualObject, oldObject, node, update) {
        if (actualObject.shape.type === 'SwimLane' && !this.currentSymbol) {
            if (oldObject.shape) {
                var shape = node.shape;
                var actualShape = actualObject.shape;
                var orientation_1 = (actualShape.orientation === 'Horizontal') ? true : false;
                var padding = actualShape.padding;
                var oldShape = oldObject.shape;
                var grid = actualObject.wrapper.children[0];
                var oldObjects = void 0;
                var newObjects = void 0;
                var id = void 0;
                if (oldShape.lanes || oldShape.phases) {
                    if (oldShape.lanes) {
                        for (var _i = 0, _a = Object.keys(shape.lanes); _i < _a.length; _i++) {
                            var count = _a[_i];
                            var indexValue = Number(count);
                            var lane = oldShape.lanes[parseInt(indexValue.toString(), 10)];
                            var laneIndex = void 0;
                            var newLane = shape.lanes[parseInt(indexValue.toString(), 10)];
                            if (newLane && newLane.header) {
                                id = actualShape.lanes[parseInt(indexValue.toString(), 10)].header.id;
                                oldObjects = lane.header;
                                newObjects = newLane.header;
                                // EJ2-913790  Save Load for header font change won't be as saved
                                if (newObjects.annotation && newObjects.annotation.content) {
                                    this.nameTable["" + id].annotations[0].content = newObjects.annotation.content;
                                }
                                if (newObjects.annotation && newObjects.annotation.style) {
                                    this.nameTable["" + id].annotations[0].style = newObjects.annotation.style;
                                }
                                this.nodePropertyChange(this.nameTable["" + id], oldObjects, newObjects);
                            }
                            if (lane.children) {
                                for (var _b = 0, _c = Object.keys(lane.children); _b < _c.length; _b++) {
                                    var childNodeIndex = _c[_b];
                                    id = actualShape.lanes[parseInt(indexValue.toString(), 10)].children[Number(childNodeIndex)].id;
                                    var node_1 = this.nameTable["" + id];
                                    oldObjects = lane.children[Number(childNodeIndex)];
                                    newObjects = newLane.children[Number(childNodeIndex)];
                                    this.nodePropertyChange(node_1, oldObjects, newObjects);
                                }
                            }
                            if (lane.width && !orientation_1) {
                                laneIndex = (actualShape.phases && actualShape.phaseSize) ? indexValue + 1 : indexValue;
                                grid.updateColumnWidth(laneIndex, newLane.width, true, padding);
                                this.updateDiagramElementQuad();
                            }
                            if (lane.height && orientation_1) {
                                laneIndex = (actualShape.header && actualShape.hasHeader) ? indexValue + 1 : indexValue;
                                laneIndex += (actualShape.phases && actualShape.phaseSize) ? 1 : 0;
                                grid.updateRowHeight(laneIndex, newLane.height, true, padding);
                                this.updateDiagramElementQuad();
                            }
                        }
                    }
                    if (shape.phases) {
                        for (var _d = 0, _e = Object.keys(shape.phases); _d < _e.length; _d++) {
                            var key = _e[_d];
                            var indexValue = Number(key);
                            var phase = shape.phases[parseInt(indexValue.toString(), 10)];
                            var size = void 0;
                            var rowIndex = (actualShape.header && actualShape.hasHeader) ? 1 : 0;
                            if (phase && phase.header) {
                                id = actualShape.phases[parseInt(indexValue.toString(), 10)].header.id;
                                oldObjects = oldShape.phases[parseInt(indexValue.toString(), 10)].header;
                                newObjects = phase.header;
                                // EJ2-913790  Save Load for header font change won't be as saved
                                if (newObjects.annotation && newObjects.annotation.content) {
                                    this.nameTable["" + id].annotations[0].content = newObjects.annotation.content;
                                }
                                if (newObjects.annotation && newObjects.annotation.style) {
                                    this.nameTable["" + id].annotations[0].style = newObjects.annotation.style;
                                }
                                this.nodePropertyChange(this.nameTable["" + id], oldObjects, newObjects);
                            }
                            if (phase.offset) {
                                if (indexValue === 0) {
                                    size = phase.offset;
                                }
                                else {
                                    var previousPhase = actualShape.phases[indexValue - 1];
                                    size = phase.offset - previousPhase.offset;
                                    if (size <= 0) {
                                        size = phase.offset;
                                    }
                                }
                                if (orientation_1) {
                                    grid.updateColumnWidth(indexValue, size, true, padding);
                                    updatePhaseMaxWidth(actualObject, this, grid.rows[parseInt(rowIndex.toString(), 10)].cells[parseInt(indexValue.toString(), 10)], indexValue);
                                }
                                else {
                                    grid.updateRowHeight(rowIndex + indexValue, size, true, padding);
                                }
                            }
                        }
                    }
                }
                if (shape.phaseSize !== undefined && actualShape.phases.length) {
                    if (shape.phaseSize === 0 || oldShape.phaseSize === 0) {
                        if (oldShape.phaseSize) {
                            if (orientation_1) {
                                grid.removeRow((actualShape.header && actualShape.hasHeader) ? 1 : 0);
                                actualObject.height = actualObject.wrapper.height = grid.height;
                            }
                            else {
                                if (actualShape.header && actualShape.hasHeader) {
                                    grid.rows[0].cells[1].children = grid.rows[0].cells[0].children;
                                    grid.rows[0].cells[1].columnSpan = grid.rows[0].cells[0].columnSpan - 1;
                                    grid.rows[0].cells[0].children = [];
                                }
                                grid.removeColumn(0);
                            }
                        }
                        else {
                            if (orientation_1) {
                                var rowDef = new RowDefinition();
                                rowDef.height = shape.phaseSize;
                                grid.addRow((actualShape.header && actualShape.hasHeader) ? 1 : 0, rowDef, true);
                                actualObject.height = actualObject.wrapper.height += shape.phaseSize;
                            }
                            else {
                                var colDef = new ColumnDefinition();
                                colDef.width = shape.phaseSize;
                                grid.addColumn(0, colDef, true);
                                if (actualShape.header && actualShape.hasHeader) {
                                    grid.rows[0].cells[0].children = grid.rows[0].cells[1].children;
                                    grid.rows[0].cells[1].children = [];
                                    grid.rows[0].cells[1].columnSpan = 1;
                                    grid.rows[0].cells[1].minWidth = undefined;
                                    grid.rows[0].cells[0].columnSpan = actualShape.lanes.length + 1;
                                }
                            }
                            for (var k = 0; k < actualShape.phases.length; k++) {
                                if (actualShape.phases[parseInt(k.toString(), 10)].id === '') {
                                    actualShape.phases[parseInt(k.toString(), 10)].id = randomId();
                                }
                                phaseDefine(grid, this, actualObject, (actualShape.header && actualShape.hasHeader) ? 1 : 0, orientation_1, k);
                            }
                        }
                    }
                    else {
                        if (orientation_1) {
                            grid.updateRowHeight((actualShape.header && actualShape.hasHeader) ? 1 : 0, shape.phaseSize, false);
                        }
                        else {
                            grid.updateColumnWidth(0, shape.phaseSize, false);
                        }
                    }
                }
                if (actualShape.header && actualShape.hasHeader && oldShape.header) {
                    var id_1 = grid.rows[0].cells[0].children[0].id;
                    var headerNode = this.nameTable["" + id_1];
                    this.nodePropertyChange(headerNode, (oldShape.header), shape.header);
                }
                actualObject.height = actualObject.wrapper.height = grid.height;
                actualObject.width = actualObject.wrapper.width = grid.width;
            }
            else if (oldObject.constraints) {
                var oldSelectConstraints = (oldObject.constraints & NodeConstraints.Select);
                var newSelectConstraints = (node.constraints & NodeConstraints.Select);
                if (oldSelectConstraints !== newSelectConstraints) {
                    var shape = actualObject.shape;
                    // Header - constraints
                    var headerNode = this.nameTable[actualObject.id + shape.header.id];
                    headerNode.constraints = (!newSelectConstraints) ? headerNode.constraints & ~NodeConstraints.Select :
                        headerNode.constraints | NodeConstraints.Select;
                    // Phase - Constraints
                    var phaseNode = void 0;
                    if (shape.phaseSize > 0) {
                        for (var i = 0; i < shape.phases.length; i++) {
                            phaseNode = this.nameTable[actualObject.id + shape.phases[parseInt(i.toString(), 10)].id + '_header'];
                            phaseNode.constraints = (!newSelectConstraints) ? phaseNode.constraints & ~NodeConstraints.Select :
                                phaseNode.constraints | NodeConstraints.Select;
                        }
                    }
                    // Header - Constraints
                    var laneNode = void 0;
                    var laneHeader = void 0;
                    var value = shape.phases.length || 1;
                    for (var i = 0; i < shape.lanes.length; i++) {
                        for (var l = 0; l < value; l++) {
                            laneNode = this.nameTable[actualObject.id + shape.lanes[parseInt(i.toString(), 10)].id + l];
                            laneNode.constraints = (!newSelectConstraints) ? laneNode.constraints & ~NodeConstraints.Select :
                                laneNode.constraints | NodeConstraints.Select;
                            if (l === 0) {
                                laneHeader = this.nameTable[actualObject.id + shape.lanes[parseInt(i.toString(), 10)].id + '_' + l + '_header'];
                                laneHeader.constraints = (!newSelectConstraints) ? laneHeader.constraints & ~NodeConstraints.Select :
                                    laneHeader.constraints | NodeConstraints.Select;
                            }
                        }
                    }
                }
            }
            update = true;
        }
        return update;
    };
    /** @private */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Diagram.prototype.insertValue = function (oldNodeObject, isNode) {
        if (!(this.blazorActions & BlazorAction.GroupClipboardInProcess)) {
            var value = void 0;
            var oldObjects = isNode ? this.oldNodeObjects : this.oldConnectorObjects;
            for (var i = 0; i < oldObjects.length; i++) {
                if (oldObjects[parseInt(i.toString(), 10)].id === oldNodeObject.id) {
                    value = true;
                }
            }
            if (!value) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isNode ? (this.oldNodeObjects.push(oldNodeObject)) : this.oldConnectorObjects.push(oldNodeObject);
            }
        }
    };
    /* tslint:disable */
    /** @private */
    // eslint-disable-next-line max-len
    Diagram.prototype.nodePropertyChange = function (actualObject, oldObject, node, isLayout, rotate, propertyChange) {
        if (this.canEnableBlazorObject && actualObject.id !== 'helper') {
            var node_2 = cloneObject(actualObject);
            this.insertValue(node_2, true);
        }
        var existingBounds = actualObject.wrapper.outerBounds;
        var existingInnerBounds = actualObject.wrapper.bounds;
        var updateConnector = false;
        var i;
        var j;
        var offsetX;
        var offsetY;
        var update;
        var tx;
        var ty;
        var oldBpmnOffsetX = 0;
        var newBpmnOffsetX = 0;
        var oldBpmnOffsetY = 0;
        var newBpmnOffsetY = 0;
        var sizeChanged = false;
        var offsetChanged = false;
        var angleChanged = false;
        if (node.width !== undefined) {
            if (!actualObject.children) {
                actualObject.wrapper.children[0].width = node.width;
                update = true;
                updateConnector = true;
            }
            else if (!actualObject.container) {
                this.scaleObject(actualObject, node.width, true);
            }
            else {
                actualObject.wrapper.width = node.width;
            }
            sizeChanged = true;
        }
        if (node.height !== undefined) {
            if (!actualObject.children) {
                actualObject.wrapper.children[0].height = node.height;
                update = true;
                updateConnector = true;
            }
            else if (!actualObject.container) {
                this.scaleObject(actualObject, node.height, false);
            }
            else {
                actualObject.wrapper.height = node.height;
            }
            sizeChanged = true;
        }
        update = this.nodePropertyChangeExtend(actualObject, oldObject, node, update);
        if (node.constraints !== undefined && canShadow(oldObject) !== canShadow(node)) {
            actualObject.wrapper.children[0].shadow = canShadow(actualObject) ? actualObject.shadow : null;
        }
        if (node.offsetX !== undefined) {
            oldBpmnOffsetX = oldObject.offsetX;
            newBpmnOffsetX = node.offsetX;
            if (actualObject.wrapper.flip !== FlipDirection.None) {
                if (actualObject.offsetX !== actualObject.wrapper.offsetX && oldObject.offsetX !== undefined) {
                    var offsetX_1 = node.offsetX - oldObject.offsetX;
                    actualObject.wrapper.offsetX = actualObject.wrapper.offsetX + offsetX_1;
                    this.updateFlipOffset(actualObject.wrapper, offsetX_1, 0, actualObject.wrapper.flip);
                }
                //EJ2-895070: Flipping and moving the node are not working properly
                else {
                    actualObject.wrapper.offsetX = node.offsetX;
                }
            }
            else {
                actualObject.wrapper.offsetX = node.offsetX;
            }
            update = true;
            updateConnector = true;
            offsetChanged = true;
        }
        if (node.offsetY !== undefined) {
            oldBpmnOffsetY = oldObject.offsetY;
            newBpmnOffsetY = node.offsetY;
            if (actualObject.wrapper.flip !== FlipDirection.None) {
                if (actualObject.offsetY !== actualObject.wrapper.offsetY && oldObject.offsetY !== undefined) {
                    var offsetY_1 = node.offsetY - oldObject.offsetY;
                    actualObject.wrapper.offsetY = actualObject.wrapper.offsetY + offsetY_1;
                    this.updateFlipOffset(actualObject.wrapper, 0, offsetY_1, actualObject.wrapper.flip);
                }
                //EJ2-895070: Flipping and moving the node are not working properly
                else {
                    actualObject.wrapper.offsetY = node.offsetY;
                }
            }
            else {
                actualObject.wrapper.offsetY = node.offsetY;
            }
            update = true;
            updateConnector = true;
            offsetChanged = true;
        }
        if (node.padding !== undefined) {
            actualObject.wrapper.padding.left = node.padding.left !== undefined ? node.padding.left : actualObject.wrapper.padding.left;
            actualObject.wrapper.padding.right = node.padding.right !== undefined ? node.padding.right : actualObject.wrapper.padding.right;
            actualObject.wrapper.padding.top = node.padding.top !== undefined ? node.padding.top : actualObject.wrapper.padding.top;
            actualObject.wrapper.padding.bottom = node.padding.bottom !== undefined ? node.padding.bottom
                : actualObject.wrapper.padding.bottom;
            update = true;
        }
        if (node.pivot !== undefined) {
            actualObject.wrapper.pivot = node.pivot;
            update = true;
        }
        if (node.minWidth !== undefined) {
            actualObject.wrapper.minWidth = actualObject.wrapper.children[0].minWidth = node.minWidth;
            update = true;
            updateConnector = true;
            sizeChanged = true;
        }
        if (node.minHeight !== undefined) {
            actualObject.wrapper.minHeight = actualObject.wrapper.children[0].minHeight = node.minHeight;
            update = true;
            updateConnector = true;
            sizeChanged = true;
        }
        if (node.maxWidth !== undefined) {
            actualObject.wrapper.maxWidth = node.maxWidth;
            update = true;
            updateConnector = true;
            sizeChanged = true;
        }
        if (node.maxHeight !== undefined) {
            actualObject.wrapper.maxHeight = node.maxHeight;
            update = true;
            updateConnector = true;
            sizeChanged = true;
        }
        if (node.flip !== undefined) {
            var horizontal = ((node.flip & FlipDirection.Horizontal) ^
                (actualObject.wrapper.flip & FlipDirection.Horizontal)) === FlipDirection.Horizontal;
            var vertical = ((node.flip & FlipDirection.Vertical) ^
                (actualObject.wrapper.flip & FlipDirection.Vertical)) === FlipDirection.Vertical;
            if (horizontal) {
                actualObject.wrapper.flip ^= FlipDirection.Horizontal;
            }
            if (vertical) {
                actualObject.wrapper.flip ^= FlipDirection.Vertical;
            }
            update = true;
            updateConnector = true;
            alignElement(actualObject.wrapper, actualObject.offsetX, actualObject.offsetY, this, undefined, horizontal, vertical);
            //To update the port and text wrapper element flip
            this.updateWrapperChildFlip(actualObject);
        }
        if (node.flipMode !== undefined) {
            var changeFlipMode = '';
            changeFlipMode = actualObject.wrapper.flipMode = node.flipMode;
            update = true;
            updateConnector = true;
            //To update the port and text wrapper element flip mode
            this.updateWrapperChildFlip(actualObject, changeFlipMode);
        }
        if (node.rotateAngle !== undefined && (actualObject.constraints & NodeConstraints.Rotate)) {
            if (actualObject.children && rotate) {
                // eslint-disable-next-line max-len
                this.commandHandler.rotateObjects(actualObject, [actualObject], actualObject.rotateAngle - actualObject.wrapper.rotateAngle, { x: actualObject.offsetX, y: actualObject.offsetY }, false);
            }
            actualObject.wrapper.rotateAngle = node.rotateAngle;
            update = true;
            updateConnector = true;
            angleChanged = true;
        }
        if (node.backgroundColor !== undefined) {
            actualObject.wrapper.style.fill = node.backgroundColor;
        }
        if (node.visible !== undefined) {
            this.updateElementVisibility(actualObject.wrapper, actualObject, actualObject.visible);
        }
        if (node.shape !== undefined && actualObject.shape.type !== 'Bpmn') {
            update = true;
            updateShape(node, actualObject, oldObject, this);
            updateConnector = true;
        }
        if (node.margin) {
            update = true;
            this.updateMargin(actualObject, node);
            updateConnector = true;
            offsetChanged = true;
        }
        if ((((node.shape !== undefined && (node.shape.type === undefined)) || node.width !== undefined || node.height !== undefined ||
            node.style !== undefined) && actualObject.shape.type === 'Bpmn' && this.bpmnModule)) {
            update = true;
            updateConnector = true;
            this.bpmnModule.updateBPMN(node, oldObject, actualObject, this);
        }
        if (actualObject.shape.type === 'UmlActivity' && ((!isBlazor() && actualObject.shape.shape === 'FinalNode'))) {
            update = true;
            updateConnector = true;
            this.updateUMLActivity(node, oldObject, actualObject, this);
        }
        if ((actualObject.shape && actualObject.shape.type === 'UmlClassifier') || (actualObject.parentId &&
            this.nameTable[actualObject.parentId] && this.nameTable[actualObject.parentId].shape.type === 'UmlClassifier')) {
            update = true;
            updateConnector = true;
        }
        if (node.ports !== undefined) {
            for (var _i = 0, _a = Object.keys(node.ports); _i < _a.length; _i++) {
                var key = _a[_i];
                var index = Number(key);
                update = true;
                var changedObject = node.ports["" + key];
                var actualPort = actualObject.ports[parseInt(index.toString(), 10)];
                this.updatePort(changedObject, actualPort, actualObject.wrapper);
                if (actualObject.flip !== FlipDirection.None) {
                    if (actualObject.flipMode === 'Port' || actualObject.flipMode === 'PortAndLabel' || actualObject.flipMode === 'PortAndLabelText' || actualObject.flipMode === 'All') {
                        this.updatePorts(actualObject, actualObject.flip);
                    }
                }
                updateConnector = true;
            }
        }
        if (node.annotation !== undefined || node.annotations !== undefined || node.width !== undefined) {
            for (var _b = 0, _c = Object.keys(node.annotations || actualObject.annotations); _b < _c.length; _b++) {
                var key = _c[_b];
                var index = Number(key);
                update = true;
                var changedObject = void 0;
                if (node.annotation) {
                    changedObject = node.annotation;
                }
                else {
                    changedObject = node.annotations ? node.annotations["" + key] : actualObject.annotations;
                }
                var actualAnnotation = actualObject.annotations[parseInt(index.toString(), 10)];
                if (actualAnnotation) {
                    var updateSize = actualObject.width ? true : false;
                    this.updateAnnotation(changedObject, actualAnnotation, actualObject.wrapper, actualObject, updateSize);
                    var swimLaneNode = this.nameTable[actualObject.parentId];
                    if ((swimLaneNode && swimLaneNode.shape.type === 'SwimLane')) {
                        var laneHeader = 'LaneHeaderParent';
                        var phaseHeader = 'PhaseHeaderParent';
                        if ((actualObject.isLane || actualObject.isPhase)) {
                            var collection = actualObject.isLane ?
                                swimLaneNode.shape.lanes : swimLaneNode.shape.phases;
                            for (var j_2 = 0; j_2 < collection.length; j_2++) {
                                if (collection[parseInt(j_2.toString(), 10)].id === (actualObject["" + laneHeader] || actualObject["" + phaseHeader])) {
                                    collection[parseInt(j_2.toString(), 10)].header.annotation.content = actualObject.annotations[0].content;
                                    collection[parseInt(j_2.toString(), 10)].header.annotation.style = actualObject.annotations[0].style;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (node.expandIcon !== undefined || node.collapseIcon !== undefined || node.isExpanded !== undefined) {
            this.updateIcon(actualObject);
            this.updateDefaultLayoutIcons(actualObject);
            if (node.isExpanded !== undefined) {
                this.canExpand = true;
                //EJ2-844814 - Expand and collapse not working properly at runtime
                this.diagramActions |= DiagramAction.PreventIconsUpdate;
                this.commandHandler.expandNode(actualObject, this);
                this.diagramActions = this.diagramActions & ~DiagramAction.PreventIconsUpdate;
            }
            update = true;
            this.canExpand = false;
        }
        if (node.fixedUserHandles !== undefined) {
            var index = void 0;
            var changedObject = void 0;
            var actualfixedUserHandle = void 0;
            for (var _d = 0, _e = Object.keys(node.fixedUserHandles); _d < _e.length; _d++) {
                var key = _e[_d];
                index = Number(key);
                update = true;
                if (node.fixedUserHandles[parseInt(index.toString(), 10)]) {
                    changedObject = node.fixedUserHandles[parseInt(index.toString(), 10)];
                }
                actualfixedUserHandle = actualObject.fixedUserHandles[parseInt(index.toString(), 10)];
                if (actualfixedUserHandle) {
                    this.updateNodefixedUserHandle(changedObject, actualfixedUserHandle, actualObject.wrapper, actualObject);
                }
            }
        }
        if (node.tooltip !== undefined) {
            this.updateTooltip(actualObject, node);
        }
        if (update) {
            if (this.bpmnModule !== undefined && (offsetChanged || sizeChanged) && !angleChanged) {
                // eslint-disable-next-line max-len
                this.updateBpmnAnnotationPosition(oldBpmnOffsetX, oldBpmnOffsetY, newBpmnOffsetX, newBpmnOffsetY, actualObject, actualObject.wrapper, actualObject.shape, actualObject.shape.shape === 'TextAnnotation', oldObject, sizeChanged, this.sizeUndo);
            }
            if (this.checkSelectedItem(actualObject) && actualObject.wrapper.children[0] instanceof TextElement) {
                actualObject.wrapper.children[0].refreshTextElement();
            }
            actualObject.wrapper.measure(new Size(actualObject.wrapper.bounds.width, actualObject.wrapper.bounds.height), actualObject.id, this.onLoadImageSize.bind(this));
            actualObject.wrapper.arrange(actualObject.wrapper.desiredSize);
            this.updateObject(actualObject, oldObject, node);
            if (actualObject.shape.type === 'SwimLane' && !this.currentSymbol && !(this.diagramActions & DiagramAction.ToolAction)) {
                updateHeaderMaxWidth(this, actualObject);
                var grid = actualObject.wrapper.children[0];
                var shape = actualObject.shape;
                var column = grid.columnDefinitions().length;
                if (shape.orientation === 'Horizontal') {
                    var index = (shape.header && shape.hasHeader) ? 1 : 0;
                    updatePhaseMaxWidth(actualObject, this, grid.rows[parseInt(index.toString(), 10)].cells[column - 1], column - 1);
                }
                actualObject.wrapper.measure(new Size(actualObject.wrapper.bounds.width, actualObject.wrapper.bounds.height));
                actualObject.wrapper.arrange(actualObject.wrapper.desiredSize);
            }
            if ((!(this.diagramActions & DiagramAction.ToolAction)) || (this.diagramActions & DiagramAction.UndoRedo)) {
                if (this.checkSelectedItem(actualObject)) {
                    this.updateSelector();
                }
            }
            if (existingBounds.equals(existingBounds, actualObject.wrapper.outerBounds) === false) {
                this.updateQuad(actualObject);
                // EJ2-57436 - Added the below code to check if node has parent id or not.
                // If node has parentId means then send the parent node to updatequad method to add the parent node in negative quadrant
                if (actualObject.parentId && this.nameTable[actualObject.parentId]) {
                    var parentNode = this.nameTable[actualObject.parentId];
                    this.updateQuad(parentNode);
                }
            }
            if (!isLayout) {
                // eslint-disable-next-line max-len
                this.commandHandler.connectorSegmentChange(actualObject, existingInnerBounds, (node.rotateAngle !== undefined) ? true : false);
                // if (updateConnector) {
                //     this.updateConnectorEdges(actualObject);
                // }
            }
            else {
                if (actualObject && actualObject.visible && actualObject.outEdges) {
                    this.updateIconVisibility(actualObject, (actualObject.outEdges.length === 0 ? false : true));
                }
            }
            if (this.bpmnModule !== undefined) {
                this.bpmnModule.updateDocks(actualObject, this);
            }
            if ((!node.annotations || !actualObject.processId) && node.flip === undefined) {
                this.updateGroupOffset(actualObject);
            }
            // if (existingBounds.equals(existingBounds, actualObject.wrapper.outerBounds) === false) { this.updateQuad(actualObject); }
            // EJ2-42005 - The parent of the actualObject is not measured and arranged when a node or connector is selected.
            // The condition restricts the measure and arrange of the actualObject whenever a node or connector is selected.
            // Commented @Dheepshiva
            // let objects: (NodeModel | ConnectorModel)[] = [];
            // objects = objects.concat(this.selectedItems.nodes, this.selectedItems.connectors);
            // if (objects.length === 0) {
            if (actualObject.parentId && this.nameTable[actualObject.parentId]) {
                var parent_6 = this.nameTable[actualObject.parentId];
                parent_6.wrapper.measure(new Size(parent_6.wrapper.width, actualObject.wrapper.height));
                parent_6.wrapper.arrange(parent_6.wrapper.desiredSize);
                parent_6.offsetX = parent_6.wrapper.offsetX;
                parent_6.offsetY = parent_6.wrapper.offsetY;
            }
            // }
            if (existingInnerBounds.equals(existingInnerBounds, actualObject.wrapper.bounds) === false) {
                if (this.eventHandler.currentAction !== 'Drag') {
                    this.updateGroupSize(actualObject);
                }
                if (actualObject.children) {
                    this.updateGroupOffset(actualObject);
                }
            }
            if (actualObject.shape.type === 'SwimLane' && !this.currentSymbol && (this.diagramActions & DiagramAction.Render)) {
                var connectors = getConnectors(this, actualObject.wrapper.children[0], undefined, true);
                updateConnectorsProperties(connectors, this);
            }
            if (!this.preventNodesUpdate) {
                if (!canVitualize(this) || (canVitualize(this) && this.scroller.oldCollectionObjects.indexOf(actualObject.id) > -1)) {
                    if (this.diagramActions & DiagramAction.PreventZIndexOnDragging) {
                        this.updateDiagramObject(actualObject, true);
                    }
                    else {
                        this.updateDiagramObject(actualObject);
                    }
                    if (actualObject.parentId) {
                        var parent_7 = this.nameTable[actualObject.parentId];
                        if (parent_7.shape.type !== 'BPMN') {
                            if (this.diagramActions & DiagramAction.PreventZIndexOnDragging) {
                                this.updateDiagramObject(parent_7, true);
                            }
                            else {
                                this.updateDiagramObject(parent_7);
                            }
                        }
                    }
                }
                if (!isLayout && updateConnector) {
                    if (this.lineRoutingModule && this.diagramActions && (this.constraints & DiagramConstraints.LineRouting) && actualObject.id !== 'helper') {
                        if (!(this.diagramActions & DiagramAction.ToolAction)) {
                            this.lineRoutingModule.renderVirtualRegion(this, true);
                        }
                    }
                    else if (this.diagramActions && (this.constraints & DiagramConstraints.LineRouting) && actualObject.id !== 'helper') {
                        console.warn('[WARNING] :: Module "LineRouting" is not available in Diagram component! You either misspelled the module name or forgot to load it.');
                    }
                    this.updateConnectorEdges(actualObject);
                    if (actualObject.id !== 'helper' && !(this.diagramActions & DiagramAction.ToolAction)) {
                        var objects = this.spatialSearch.findObjects(actualObject.wrapper.outerBounds);
                        for (var i_4 = 0; i_4 < objects.length; i_4++) {
                            var object = objects[parseInt(i_4.toString(), 10)];
                            if (object instanceof Connector) {
                                this.connectorPropertyChange(objects[parseInt(i_4.toString(), 10)], {}, {
                                    sourceID: object.sourceID,
                                    targetID: object.targetID,
                                    sourcePortID: object.sourcePortID,
                                    targetPortID: object.targetPortID,
                                    sourcePoint: object.sourcePoint,
                                    targetPoint: object.targetPoint
                                });
                            }
                        }
                    }
                }
            }
            if (actualObject.status !== 'New' && this.diagramActions) {
                actualObject.status = 'Update';
            }
        }
        if (!propertyChange) {
            var element = actualObject;
            var args = {
                element: element, cause: this.diagramActions, diagramAction: this.getDiagramAction(this.diagramActions),
                oldValue: oldObject, newValue: node
            };
            //Removed isBlazor code
            this.triggerEvent(DiagramEvent.propertyChange, args);
        }
    };
    Diagram.prototype.updateWrapperChildFlip = function (actualObject, changeFlipMode) {
        if (actualObject && actualObject.children && actualObject.children.length > 0) {
            for (var i = 0; i < actualObject.children.length; i++) {
                var child = actualObject.children[parseInt(i.toString(), 10)];
                var updateNode = this.nameTable["" + child];
                var modifiedFlipMode = '';
                if (!changeFlipMode) {
                    modifiedFlipMode = updateNode.flipMode;
                }
                else {
                    modifiedFlipMode = changeFlipMode;
                    updateNode.wrapper.flipMode = modifiedFlipMode;
                    updateNode.flipMode = modifiedFlipMode;
                }
                if (modifiedFlipMode === 'None' || modifiedFlipMode === 'Label' || modifiedFlipMode === 'LabelText' || modifiedFlipMode === 'LabelAndLabelText') {
                    this.updatePorts(updateNode, FlipDirection.None);
                }
                else {
                    this.updatePorts(updateNode, updateNode.wrapper.flip);
                }
                //To update the wrapper of node with flip and flip mode.
                this.updateWrapperFlip(updateNode.wrapper, updateNode);
            }
        }
        changeFlipMode = actualObject.flipMode;
        if (changeFlipMode === 'None' || changeFlipMode === 'Label' || changeFlipMode === 'LabelText' || changeFlipMode === 'LabelAndLabelText') {
            this.updatePorts(actualObject, FlipDirection.None);
        }
        else {
            this.updatePorts(actualObject, actualObject.wrapper.flip);
        }
        var wrapperCanvas;
        if (actualObject.children) {
            wrapperCanvas = actualObject.wrapper.children[actualObject.wrapper.children.length - 1];
        }
        else {
            wrapperCanvas = actualObject.wrapper;
        }
        wrapperCanvas.flip = actualObject.wrapper.flip;
        wrapperCanvas.flipMode = actualObject.flipMode;
        //To update the wrapper of node with flip and flip mode.
        this.updateWrapperFlip(wrapperCanvas, actualObject);
    };
    Diagram.prototype.updateWrapperFlip = function (wrapperCanvas, obj) {
        for (var k = 0; k < wrapperCanvas.children.length; k++) {
            var wrapperChild = wrapperCanvas.children[parseInt(k.toString(), 10)];
            if (wrapperChild instanceof TextElement) {
                if (obj.flipMode !== 'None' && obj.flipMode !== 'Port') {
                    wrapperChild.flip = obj.wrapper.flip;
                    wrapperChild.flipMode = obj.flipMode;
                }
                else {
                    wrapperChild.flip = FlipDirection.None;
                }
            }
            else if (wrapperChild instanceof Canvas) {
                this.applyWrapperCanvasFlip(wrapperChild, obj);
            }
        }
    };
    //Get resize handle name based on the old and new size properties of node.
    Diagram.prototype.getResizeHandle = function (oldX, oldY, oldWidth, oldHeight, newX, newY, newWidth, newHeight) {
        var dx = newX - oldX;
        var dy = newY - oldY;
        var dw = newWidth - oldWidth;
        var dh = newHeight - oldHeight;
        if (dh === 0 && ((dx > 0 && dw > 0) || (dx < 0 && dw < 0))) {
            return 'ResizeEast';
        }
        if (dh === 0 && ((dx > 0 && dw < 0) || (dx < 0 && dw > 0))) {
            return 'ResizeWest';
        }
        // **North & South Handles (Height Change Only)**
        if (dw === 0 && ((dy > 0 && dh < 0) || (dy < 0 && dh > 0))) {
            return 'ResizeNorth';
        }
        if (dw === 0 && ((dy > 0 && dh > 0) || (dy < 0 && dh < 0))) {
            return 'ResizeSouth';
        }
        // **Diagonal Resizing (Both Width & Height Change)**
        if (((dx > 0 && dw > 0) || (dx < 0 && dw < 0)) && ((dy > 0 && dh > 0) || (dy < 0 && dh < 0))) {
            return 'ResizeSouthEast'; // Bottom-right
        }
        if (((dx > 0 && dw < 0) || (dx < 0 && dw > 0)) && ((dy > 0 && dh > 0) || (dy < 0 && dh < 0))) {
            return 'ResizeSouthWest'; // Bottom-left
        }
        if (((dx > 0 && dw > 0) || (dx < 0 && dw < 0)) && ((dy > 0 && dh < 0) || (dy < 0 && dh > 0))) {
            return 'ResizeNorthEast'; // Top-right
        }
        if (((dx > 0 && dw < 0) || (dx < 0 && dw > 0)) && ((dy > 0 && dh < 0) || (dy < 0 && dh > 0))) {
            return 'ResizeNorthWest'; // Top-left
        }
        return null;
    };
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
    Diagram.prototype.getTextAnnotationOffset = function (actualObject, textAnnotation, oldObject, oldBpmnOffsetX, oldBpmnOffsetY) {
        var sx = actualObject.width - oldObject.width;
        var sy = actualObject.height - oldObject.height;
        var side = this.getTextAnnotationQuadrant(actualObject, textAnnotation);
        var resizeSide = this.getResizeHandle(oldObject.offsetX, oldObject.offsetY, oldObject.width, oldObject.height, actualObject.offsetX, actualObject.offsetY, actualObject.width, actualObject.height);
        var dx = 0;
        var dy = 0;
        var needsXAdjustment = function (side) {
            if (resizeSide === 'ResizeEast' || resizeSide === 'ResizeNorthEast' || resizeSide === 'ResizeSouthEast') {
                return side.includes('East');
            }
            if (resizeSide === 'ResizeWest' || resizeSide === 'ResizeNorthWest' || resizeSide === 'ResizeSouthWest') {
                return side.includes('West');
            }
            return false;
        };
        var needsYAdjustment = function (side) {
            if (resizeSide === 'ResizeSouth' || resizeSide === 'ResizeSouthWest' || resizeSide === 'ResizeSouthEast') {
                return side.includes('South');
            }
            if (resizeSide === 'ResizeNorth' || resizeSide === 'ResizeNorthWest' || resizeSide === 'ResizeNorthEast') {
                return side.includes('North');
            }
            return false;
        };
        if (needsXAdjustment(side)) {
            dx = (resizeSide.includes('West') ? -sx : sx);
        }
        if (needsYAdjustment(side)) {
            dy = (resizeSide.includes('North') ? -sy : sy);
        }
        return { x: oldBpmnOffsetX + dx, y: oldBpmnOffsetY + dy };
    };
    //To get which side the text annotation node is placed based on its parent node
    Diagram.prototype.getTextAnnotationQuadrant = function (parent, textAnnotation) {
        var left = parent.wrapper.bounds.left;
        var right = parent.wrapper.bounds.right;
        var top = parent.wrapper.bounds.top;
        var bottom = parent.wrapper.bounds.bottom;
        var textX = textAnnotation.wrapper.bounds.center.x;
        var textY = textAnnotation.wrapper.bounds.center.y;
        // Check if exactly aligned with any edge
        if (textX >= left && textX <= right) {
            if (textY < top) {
                return 'North';
            }
            if (textY > bottom) {
                return 'South';
            }
        }
        if (textY >= top && textY <= bottom) {
            if (textX < left) {
                return 'West';
            }
            if (textX > right) {
                return 'East';
            }
        }
        // Quadrants
        if (textX < left && textY < top) {
            return 'NorthWest';
        }
        if (textX > right && textY < top) {
            return 'NorthEast';
        }
        if (textX < left && textY > bottom) {
            return 'SouthWest';
        }
        if (textX > right && textY > bottom) {
            return 'SouthEast';
        }
        return '';
    };
    //To update text annotation position while dragging the text annotation's parent node.
    Diagram.prototype.updateBpmnAnnotationPosition = function (oldX, oldY, newX, newY, node, wrapper, shape, isTextAnnotation, oldObject, sizeChanged, isUndo) {
        var x = newX > oldX ? Math.abs(newX - oldX) : Math.abs(oldX - newX);
        var y = newY > oldY ? Math.abs(newY - oldY) : Math.abs(oldY - newY);
        var laneX;
        var laneY;
        if ((x === 0 && y === 0) || (Number.isNaN(x) && Number.isNaN(y))) {
            if (node.laneMargin) {
                laneX = node.margin.left - node.laneMargin.left;
                laneY = node.margin.top - node.laneMargin.top;
            }
        }
        var width = node.width;
        var height = node.height;
        var bounds = new Rect(0, 0, 0, 0);
        if (width !== 0 && height !== 0) {
            bounds = new Rect((newX !== 0 ? newX : node.offsetX) - width / 2, (newY !== 0 ? newY : node.offsetY) - height / 2, width, height);
        }
        //To update text annotation position
        if (isTextAnnotation) {
            var bpmnAnnotation = shape;
            var hasTarget = bpmnAnnotation.textAnnotation.textAnnotationTarget !== '' && this.nameTable[bpmnAnnotation.textAnnotation.textAnnotationTarget];
            var selectedNode = this.selectedItems.nodes ? this.selectedItems.nodes[0] : undefined;
            var isTextNodeSelected = selectedNode && selectedNode.shape && selectedNode.shape.shape === 'TextAnnotation';
            if (hasTarget) {
                //To check whether the text annotation inside the swimlane
                if (node.parentId === '' || isTextNodeSelected) {
                    if (bpmnAnnotation.textAnnotation.textAnnotationDirection === 'Auto') {
                        if (wrapper.children[0] instanceof Canvas && wrapper.children[0].children[0] instanceof PathElement) {
                            var diagramCanvas = wrapper.children[0];
                            var parentElement = document.getElementById(diagramCanvas.id + '_groupElement');
                            var elementToRemove = document.getElementById(diagramCanvas.children[0].id + '_groupElement');
                            parentElement.removeChild(elementToRemove);
                            diagramCanvas.children.splice(0, 1);
                            this.isProtectedOnChange = true;
                            this.bpmnModule.setAnnotationPath(bounds, diagramCanvas, node, bpmnAnnotation, bpmnAnnotation.textAnnotation.textAnnotationDirection, this);
                            this.isProtectedOnChange = false;
                        }
                    }
                }
                else {
                    this.isPositionUndo = true;
                    this.updateTextAnnotationInSwimlane(node, node);
                    this.isPositionUndo = false;
                }
            }
            else { //To update text annotation connector source point.
                if (node.inEdges.length > 0) {
                    var connectorID = node.inEdges[0];
                    var connector = this.nameTable["" + connectorID];
                    if (connector && connector.isBpmnAnnotationConnector) {
                        connector.sourcePoint =
                            {
                                x: newX > oldX ? connector.sourcePoint.x + x : connector.sourcePoint.x - x,
                                y: newY > oldY ? connector.sourcePoint.y + y : connector.sourcePoint.y - y
                            };
                    }
                }
            }
            var newValue = { ports: [{ offset: node.ports[0].offset }] };
            //To update port offset of text annotation node
            this.nodePropertyChange(node, {}, newValue);
        }
        else {
            for (var _i = 0, _a = node.outEdges; _i < _a.length; _i++) {
                var id = _a[_i];
                var connector = this.nameTable["" + id];
                if (connector && connector.isBpmnAnnotationConnector) {
                    var targetNode = this.nameTable[connector.targetID];
                    var textAnnotationTargetId = targetNode.shape.textAnnotation.textAnnotationTarget;
                    var textAnnotationTarget = this.nameTable["" + textAnnotationTargetId];
                    if (sizeChanged && !isUndo) {
                        var newResizeOffset = this.getTextAnnotationOffset(node, targetNode, oldObject, oldX, oldY);
                        newX = newResizeOffset.x;
                        newY = newResizeOffset.y;
                        x = newX > oldX ? Math.abs(newX - oldX) : Math.abs(oldX - newX);
                        y = newY > oldY ? Math.abs(newY - oldY) : Math.abs(oldY - newY);
                    }
                    if (targetNode.shape.shape === 'TextAnnotation' && !isSelected(this, targetNode)
                        && isSelected(this, textAnnotationTarget)) {
                        var oldValue = void 0;
                        var newValue = void 0;
                        if (node.isResized) {
                            oldValue = { margin: { left: targetNode.margin.left, top: targetNode.margin.top } };
                            var resizeOffset = node.resizeDif[targetNode.id];
                            if (resizeOffset) {
                                targetNode.margin.left += resizeOffset.x;
                                targetNode.margin.top += resizeOffset.y;
                                newValue = { margin: { left: targetNode.margin.left, top: targetNode.margin.top } };
                            }
                        }
                        else if (laneX !== undefined && laneY !== undefined) {
                            if (targetNode.parentId) {
                                oldValue = { margin: { left: targetNode.margin.left, top: targetNode.margin.top } };
                                targetNode.margin.left += laneX;
                                targetNode.margin.top += laneY;
                                newValue = { margin: { left: targetNode.margin.left, top: targetNode.margin.top } };
                            }
                            else {
                                oldValue = { offsetX: targetNode.offsetX, offsetY: targetNode.offsetY };
                                targetNode.offsetX += laneX;
                                targetNode.offsetY += laneY;
                                newValue = { offsetX: targetNode.offsetX, offsetY: targetNode.offsetY };
                            }
                        }
                        else {
                            oldValue = { offsetX: targetNode.offsetX, offsetY: targetNode.offsetY };
                            targetNode.offsetX = newX > oldX ? targetNode.offsetX + x : targetNode.offsetX - x;
                            targetNode.offsetY = newY > oldY ? targetNode.offsetY + y : targetNode.offsetY - y;
                            newValue = { offsetX: targetNode.offsetX, offsetY: targetNode.offsetY };
                        }
                        this.nodePropertyChange(targetNode, oldValue, newValue);
                    }
                }
            }
        }
    };
    Diagram.prototype.updatePorts = function (actualObject, flip) {
        if (actualObject && actualObject.ports.length > 0) {
            for (var _i = 0, _a = Object.keys(actualObject.ports); _i < _a.length; _i++) {
                var key = _a[_i];
                var index = Number(key);
                var actualPort = actualObject.ports[parseInt(index.toString(), 10)];
                var portWrapper = this.getWrapper(actualObject.wrapper, actualPort.id);
                portWrapper = updatePortEdges(portWrapper, flip, actualPort);
                portWrapper.relativeMode = 'Point';
                if (actualObject.wrapper.measureChildren === undefined) {
                    actualObject.wrapper.measureChildren = false;
                }
                portWrapper.measure(new Size(portWrapper.width, portWrapper.height));
                portWrapper.arrange(portWrapper.desiredSize);
            }
        }
    };
    Diagram.prototype.updateFlipOffset = function (element, diffX, diffY, flip) {
        if (element.hasChildren()) {
            for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (flip === FlipDirection.Horizontal || flip === FlipDirection.Both) {
                    child.flipOffset.x = child.flipOffset.x + diffX;
                }
                if (flip === FlipDirection.Vertical || flip === FlipDirection.Both) {
                    child.flipOffset.y = child.flipOffset.y + diffY;
                }
                if (child instanceof Canvas || child instanceof Container) {
                    this.updateFlipOffset(child, diffX, diffY, flip);
                }
            }
        }
    };
    Diagram.prototype.updateUMLActivity = function (changedProp, oldObject, actualObject, diagram) {
        var sizeChanged = changedProp.width !== undefined || changedProp.height !== undefined;
        if (sizeChanged) {
            var innerFinalNode = actualObject.wrapper.children[0].children[0];
            innerFinalNode.width = changedProp.width;
            innerFinalNode.height = changedProp.height;
            var outerFinalNode = actualObject.wrapper.children[0].children[1];
            outerFinalNode.width = changedProp.width / 1.5;
            outerFinalNode.height = changedProp.height / 1.5;
        }
    };
    Diagram.prototype.updateConnectorProperties = function (connector) {
        if (this.preventConnectorsUpdate) {
            var index = this.selectionConnectorsList.indexOf(connector);
            if (index === -1 && connector) {
                this.selectionConnectorsList.push(connector);
            }
        }
        else {
            var conn = {
                sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint, sourceID: connector.sourceID,
                targetID: connector.targetID, sourcePortID: connector.sourcePortID, targetPortID: connector.targetPortID
            };
            this.connectorPropertyChange(connector, {}, conn, undefined, true);
        }
    };
    /**
     * updateConnectorEdges method \
     *
     * @returns { void }     Updates the connectorPropertyChange of the diagram container .\
     * @param {Node} actualObject - provide the actualObject value.
     *
     * @private
     */
    Diagram.prototype.updateConnectorEdges = function (actualObject) {
        if (actualObject.inEdges.length > 0) {
            for (var j = 0; j < actualObject.inEdges.length; j++) {
                this.updateConnectorProperties(this.nameTable[actualObject.inEdges[parseInt(j.toString(), 10)]]);
            }
        }
        if (actualObject.outEdges.length > 0) {
            for (var k = 0; k < actualObject.outEdges.length; k++) {
                this.updateConnectorProperties(this.nameTable[actualObject.outEdges[parseInt(k.toString(), 10)]]);
            }
        }
        // Bug: 909563 - Max Call Stack exception upon dragging group's child connector end point
        if (!(actualObject instanceof Connector) && actualObject.parentId && this.nameTable[actualObject.parentId]) {
            this.updateConnectorEdges(this.nameTable[actualObject.parentId]);
        }
    };
    /* tslint:enable */
    Diagram.prototype.connectorProprtyChangeExtend = function (actualObject, oldProp, newProp, updateSelector) {
        if (newProp.type !== undefined && newProp.type !== oldProp.type) {
            if (actualObject.segments.length > 0 && newProp.segments === undefined) {
                actualObject.segments = [];
            }
        }
        if ((newProp.shape !== undefined) && actualObject.shape !== undefined &&
            actualObject.shape && actualObject.shape.type === 'Bpmn' && this.bpmnModule) {
            this.bpmnModule.updateBPMNConnector(actualObject, oldProp, newProp, this);
        }
        if (actualObject.constraints !== undefined) {
            this.updateThumbConstraints(this.selectedItems.connectors, this.selectedItems);
            return updateSelector = true;
        }
        return updateSelector;
    };
    /* tslint:disable */
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
    Diagram.prototype.connectorPropertyChange = function (actualObject, oldProp, newProp, disableBridging, propertyChange) {
        if (this.canEnableBlazorObject) {
            var node = cloneObject(actualObject);
            this.insertValue(node, false);
        }
        var existingBounds = actualObject.wrapper.bounds;
        var updateSelector = false;
        var points = [];
        updateSelector = this.connectorProprtyChangeExtend(actualObject, oldProp, newProp, updateSelector);
        var inPort;
        var outPort;
        var source;
        var target;
        if (newProp.visible !== undefined) {
            this.updateElementVisibility(actualObject.wrapper, actualObject, actualObject.visible);
        }
        if (newProp.sourcePoint !== undefined || newProp.targetPoint !== undefined
            || newProp.sourceID !== undefined || newProp.targetID !== undefined || newProp.targetPadding !== undefined ||
            newProp.sourcePortID !== undefined || newProp.targetPortID !== undefined || newProp.sourcePadding !== undefined ||
            newProp.type !== undefined || newProp.segments !== undefined || newProp.flip !== undefined) {
            if ((newProp.sourceID !== undefined && newProp.sourceID !== oldProp.sourceID) || newProp.sourcePortID) {
                var sourceNode = this.nameTable[actualObject.sourceID];
                outPort = this.findInOutConnectPorts(sourceNode, false);
                if (!sourceNode || (canOutConnect(sourceNode) || (actualObject.sourcePortID !== '' && canPortOutConnect(outPort)))) {
                    actualObject.sourceWrapper = sourceNode ? this.getEndNodeWrapper(sourceNode, actualObject, true) : undefined;
                    if (actualObject.sourcePortID && newProp.sourcePortID === undefined) {
                        actualObject.sourcePortWrapper = sourceNode ? this.getWrapper(sourceNode.wrapper, actualObject.sourcePortID) : undefined;
                    }
                    this.removePortEdges(this.nameTable[oldProp.sourceID] || sourceNode, oldProp.sourcePortID || actualObject.sourcePortID, actualObject.id, false);
                }
                if (newProp.sourceID !== undefined && oldProp.sourceID !== undefined && oldProp.sourceID !== '') {
                    var oldSource = this.nameTable[oldProp.sourceID];
                    if (oldSource !== undefined && oldSource.outEdges && oldSource.outEdges.indexOf(actualObject.id) !== -1) {
                        removeItem(oldSource.outEdges, actualObject.id);
                    }
                }
                this.updateEdges(actualObject);
            }
            if (newProp.targetID !== undefined && newProp.targetID !== oldProp.targetID) {
                var targetNode = this.nameTable[newProp.targetID];
                inPort = this.findInOutConnectPorts(targetNode, true);
                if (!targetNode || (canInConnect(targetNode) || (actualObject.targetPortID !== '' && canPortInConnect(inPort)))) {
                    actualObject.targetWrapper = targetNode ? this.getEndNodeWrapper(targetNode, actualObject, false) : undefined;
                    if (actualObject.targetPortID && newProp.targetPortID === undefined) {
                        actualObject.targetPortWrapper = targetNode ? this.getWrapper(targetNode.wrapper, actualObject.targetPortID) : undefined;
                    }
                    this.removePortEdges(this.nameTable[oldProp.targetID] || targetNode, oldProp.targetPortID || actualObject.targetPortID, actualObject.id, true);
                }
                if (oldProp !== undefined && oldProp.targetID !== undefined && oldProp.targetID !== '') {
                    var oldTarget = this.nameTable[oldProp.targetID];
                    if (oldTarget !== undefined && oldTarget.inEdges && oldTarget.inEdges.indexOf(actualObject.id) !== -1) {
                        removeItem(oldTarget.inEdges, actualObject.id);
                    }
                }
                this.updateEdges(actualObject);
            }
            if (newProp.sourcePortID !== undefined && newProp.sourcePortID !== oldProp.sourcePortID) {
                if (actualObject.sourceID && this.nameTable[actualObject.sourceID]) {
                    source = this.nameTable[actualObject.sourceID].wrapper;
                }
                var sourceNode = this.nameTable[actualObject.sourceID];
                if (!sourceNode || (canOutConnect(sourceNode) || (actualObject.sourcePortID !== '' && canPortOutConnect(outPort)))) {
                    actualObject.sourcePortWrapper = source ? this.getWrapper(source, newProp.sourcePortID) : undefined;
                }
                else if (actualObject.sourcePortID === '' && !canOutConnect(sourceNode)) {
                    actualObject.sourcePortWrapper = undefined;
                }
            }
            if (newProp.targetPortID !== undefined && newProp.targetPortID !== oldProp.targetPortID) {
                var targetNode = this.nameTable[actualObject.targetID];
                if (actualObject.targetID && this.nameTable[actualObject.targetID]) {
                    target = this.nameTable[actualObject.targetID].wrapper;
                }
                if (!targetNode || (canInConnect(targetNode) || (actualObject.targetPortID !== '' && canPortInConnect(inPort)))) {
                    actualObject.targetPortWrapper = target ? this.getWrapper(target, newProp.targetPortID) : undefined;
                }
                else if (actualObject.targetPortID === '' && !canInConnect(targetNode)) {
                    actualObject.targetPortWrapper = undefined;
                }
            }
            if (newProp.flip !== undefined) {
                actualObject.flip = newProp.flip;
                flipConnector(actualObject);
            }
            //EJ2-867479 - Performance issue in complexhierarchical layout due to linerouting injection
            if (actualObject.type === 'Orthogonal' && this.lineRoutingModule && this.diagramActions &&
                (this.constraints & DiagramConstraints.LineRouting) && !(this.diagramActions & DiagramAction.ToolAction) && this.layout.type !== 'ComplexHierarchicalTree') {
                this.lineRoutingModule.renderVirtualRegion(this, true);
                // EJ2-65876 - Exception occurs on line routing injection module
                if (actualObject.sourceID !== actualObject.targetID && actualObject.segments.length > 1) {
                    //EJ2-69573 - Excecption occurs when calling doLayout method with the lineRouting module
                    this.lineRoutingModule.refreshConnectorSegments(this, actualObject, false);
                }
            }
            points = this.getPoints(actualObject);
        } //Add prop change for zindex, alignments and margin
        if (newProp.style !== undefined) {
            updateStyle(newProp.style, actualObject.wrapper.children[0]);
        }
        if (points.length > 0 || newProp.sourceDecorator !== undefined || (newProp.targetDecorator !== undefined
            && (canMeasureDecoratorPath(Object.keys(newProp.targetDecorator)))) || newProp.cornerRadius !== undefined) {
            updateConnector(actualObject, points.length > 0 ? points : actualObject.intermediatePoints, this.diagramActions);
            if (newProp.type !== undefined) {
                updateSelector = true;
            }
            if (points.length > 0) {
                actualObject.wrapper.measure(new Size(actualObject.wrapper.width, actualObject.wrapper.height));
                actualObject.wrapper.arrange(actualObject.wrapper.desiredSize);
                // eslint-disable-next-line max-len
                this.updateConnectorAnnotation(actualObject);
                this.updateConnectorPort(actualObject);
                this.updateConnectorfixedUserHandles(actualObject);
                this.updateObject(actualObject, oldProp, newProp);
            } //work-around to update intersected connector bridging
        }
        if ((newProp.sourcePoint || newProp.targetPoint || newProp.segments)
            && this.diagramActions === DiagramAction.Render) {
            updateSelector = true;
        }
        if (actualObject.shape.type === 'Bpmn' && actualObject.shape.sequence === 'Default' && actualObject.shape.flow === 'Sequence') {
            this.commandHandler.updatePathElementOffset(actualObject);
        }
        // eslint-disable-next-line max-len
        if (!disableBridging) {
            this.updateBridging();
        }
        this.updateAnnotations(newProp, actualObject);
        this.updateConnectorPorts(newProp, actualObject);
        this.updatefixedUserHandle(newProp, actualObject);
        actualObject.wrapper.measure(new Size(actualObject.wrapper.width, actualObject.wrapper.height));
        actualObject.wrapper.arrange(actualObject.wrapper.desiredSize);
        if (existingBounds.equals(existingBounds, actualObject.wrapper.bounds) === false) {
            this.updateQuad(actualObject);
            if (this.eventHandler.currentAction !== 'Drag') {
                this.updateGroupSize(actualObject);
            }
        }
        if (updateSelector === true && this.checkSelectedItem(actualObject) && (!(this.diagramActions & DiagramAction.ToolAction)
            || (this.diagramActions & DiagramAction.UndoRedo))) {
            this.updateSelector();
        }
        if (!this.preventConnectorsUpdate) {
            if (!canVitualize(this) || (canVitualize(this) && this.scroller.oldCollectionObjects.indexOf(actualObject.id) > -1)) {
                if (this.diagramActions & DiagramAction.PreventZIndexOnDragging) {
                    this.updateDiagramObject(actualObject, true);
                }
                else {
                    this.updateDiagramObject(actualObject);
                }
            }
        }
        this.updateConnectorEdges(actualObject);
        if (this.diagramActions && actualObject.status !== 'New') {
            actualObject.status = 'Update';
        }
        this.triggerPropertyChange(propertyChange, actualObject, oldProp, newProp);
    };
    /* tslint:enable */
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
    Diagram.prototype.removePortEdges = function (node, portId, item, isInEdges) {
        if (node) {
            for (var i = 0; i < node.ports.length; i++) {
                var port = node.ports[parseInt(i.toString(), 10)];
                if (port.id === portId) {
                    var portEdge = (isInEdges) ? port.inEdges : port.outEdges;
                    removeItem(portEdge, item);
                }
            }
        }
    };
    //Removed blazor getpropertyChangeArgs method
    // Feature 826644: Support to add ports to the connector. Added below method to update connector ports
    // on connector property change.
    Diagram.prototype.updateConnectorPorts = function (newProp, actualObject) {
        if (newProp.ports !== undefined) {
            for (var _i = 0, _a = Object.keys(newProp.ports); _i < _a.length; _i++) {
                var key = _a[_i];
                var index = Number(key);
                var changedObject = newProp.ports["" + key];
                var actualPort = actualObject.ports[parseInt(index.toString(), 10)];
                this.updatePort(changedObject, actualPort, actualObject.wrapper, actualObject);
            }
        }
    };
    Diagram.prototype.triggerPropertyChange = function (propertyChange, actualObject, oldProp, newProp) {
        if (!propertyChange) {
            var element = actualObject;
            var args = {
                element: cloneBlazorObject(element), cause: this.diagramActions, diagramAction: this.getDiagramAction(this.diagramActions),
                oldValue: cloneBlazorObject(oldProp), newValue: cloneBlazorObject(newProp)
            };
            //Removed isBlazor code
            this.triggerEvent(DiagramEvent.propertyChange, args);
        }
    };
    Diagram.prototype.findInOutConnectPorts = function (node, isInconnect) {
        var port = {};
        if (node) {
            port = getInOutConnectPorts(node, isInconnect);
        }
        return port;
    };
    Diagram.prototype.getPoints = function (actualObject, points) {
        //let pts: PointModel[];
        //871158: Connector splitting point change with line distribution module injection
        var lineDistributionModule = (this.lineDistributionModule && this.layout.connectionPointOrigin === 'DifferentPoint') ? true : false;
        var pts = actualObject.getConnectorPoints(actualObject.type, points, this.layout.type === 'ComplexHierarchicalTree' || this.layout.type === 'HierarchicalTree' ?
            this.layout.orientation : undefined, lineDistributionModule);
        return pts;
    };
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
    Diagram.prototype.updateNodeProperty = function (element, visible, opacity) {
        if (visible === undefined) {
            this.updateElementVisibility(element, this.nameTable[element.id], visible);
        }
        else {
            element.style.opacity = opacity;
            for (var i = 0; i < element.children.length; i++) {
                if (element.children[parseInt(i.toString(), 10)] instanceof Container) {
                    this.updateNodeProperty(element.children[parseInt(i.toString(), 10)], undefined, opacity);
                }
                element.children[parseInt(i.toString(), 10)].style.opacity = opacity;
            }
        }
    };
    /**
     * checkSelected Item for Connector \
     *
     * @returns { void }  checkSelected Item for Connector .\
     * @param {Connector | Node} actualObject - provide the element value.
     *
     * @private
     */
    Diagram.prototype.checkSelectedItem = function (actualObject) {
        var selectorModel = this.selectedItems;
        var isSelected = false;
        var selItems = [];
        selItems = selItems.concat(selectorModel.nodes, selectorModel.connectors);
        if (selItems.length > 0) {
            if (actualObject.id === selItems[selItems.length - 1].id) {
                isSelected = true;
            }
        }
        return isSelected;
    };
    /**
     * Updates the visibility of the diagram container \
     *
     * @returns { void }     Updates the visibility of the diagram container .\
     * @param {DiagramElement} element - provide the element value.
     * @param {boolean} visible - provide the target value.
     *
     * @private
     */
    Diagram.prototype.updateDiagramContainerVisibility = function (element, visible) {
        if (element instanceof Container) {
            for (var i = 0; i < element.children.length; i++) {
                this.updateDiagramContainerVisibility(element.children[parseInt(i.toString(), 10)], visible);
            }
        }
        element.visible = visible;
    };
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
    Diagram.prototype.updateElementVisibility = function (element, obj, visible) {
        if (visible !== undefined) {
            element.visible = visible;
            if (obj instanceof Node) {
                //content
                if (!obj.children) {
                    element.children[0].visible = visible;
                    this.updateDiagramContainerVisibility(element.children[0], visible);
                    if (obj.shape.type === 'Bpmn' && this.bpmnModule) {
                        this.bpmnModule.updateElementVisibility(obj, visible, this);
                    }
                }
                else {
                    for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        this.updateElementVisibility(this.nameTable["" + child].wrapper, this.nameTable["" + child], visible);
                    }
                }
                if ((obj.shape.type === 'Bpmn') && obj.shape.shape === 'TextAnnotation' && this.diagramActions) {
                    var connector = this.nameTable[obj.inEdges[0]];
                    var oldValue = connector.visible;
                    connector.visible = visible;
                    this.connectorPropertyChange(connector, { visible: oldValue }, { visible: visible });
                }
                //ports
                if (obj.ports) {
                    for (var _b = 0, _c = obj.ports; _b < _c.length; _b++) {
                        var port = _c[_b];
                        if (port.visibility & PortVisibility.Visible) {
                            var wrapper = this.getWrapper(element, port.id);
                            wrapper.visible = visible;
                        }
                    }
                }
                if (obj.annotations) {
                    for (var _d = 0, _e = obj.annotations; _d < _e.length; _d++) {
                        var annotation = _e[_d];
                        var wrapper = this.getWrapper(element, annotation.id);
                        if (visible) {
                            wrapper.visible = wrapper.annotationVisibility === 'Visible' ? true : false;
                        }
                        else {
                            wrapper.visible = visible;
                        }
                    }
                }
            }
            else {
                //path and decorators
                //942121: Visibility of BPMN flow connector not correctly applied
                if (obj.shape.type === 'Bpmn') {
                    for (var i = 0; i < 4; i++) {
                        element.children[parseInt(i.toString(), 10)].visible = visible;
                    }
                }
                else {
                    for (var i = 0; i < 3; i++) {
                        element.children[parseInt(i.toString(), 10)].visible = visible;
                    }
                }
            }
            if (obj.annotations) {
                //annotations
                for (var _f = 0, _g = obj.annotations; _f < _g.length; _f++) {
                    var annotation = _g[_f];
                    var wrapper = this.getWrapper(element, annotation.id);
                    //Bug 855273: Annotation visible property is not working while changing node visibility at runtime.
                    if (visible) {
                        wrapper.visible = wrapper.annotationVisibility === 'Visible' ? true : false;
                    }
                    else {
                        wrapper.visible = visible;
                    }
                }
            }
            if (obj.expandIcon || obj.collapseIcon) {
                var wrapper = this.getWrapper(element, 'icon_content');
                if (wrapper) {
                    for (var i = 0; i < wrapper.children.length; i++) {
                        wrapper.children[parseInt(i.toString(), 10)].visible = visible;
                    }
                    wrapper.visible = visible;
                }
                if (obj && obj.visible && obj.outEdges) {
                    this.updateIconVisibility(obj, (obj.outEdges.length === 0 ? false : true));
                }
            }
            if (visible === false) {
                this.unSelect(this.nameTable[element.id]);
            }
            if ((obj instanceof Node && !this.preventNodesUpdate) || (obj instanceof Connector && !this.preventConnectorsUpdate)) {
                //Avoid calling updateDiagramObject method during rendering
                if (this.diagramActions) {
                    this.updateDiagramObject(this.nameTable[element.id], undefined, true);
                }
            }
        }
    };
    Diagram.prototype.updateAnnotations = function (newProp, actualObject) {
        if (newProp.annotations !== undefined) {
            for (var _i = 0, _a = Object.keys(newProp.annotations); _i < _a.length; _i++) {
                var key = _a[_i];
                var index = Number(key);
                var changedObject = newProp.annotations["" + key];
                var actualAnnotation = actualObject.annotations[parseInt(index.toString(), 10)];
                this.updateAnnotation(changedObject, actualAnnotation, actualObject.wrapper, actualObject);
            }
        }
    };
    Diagram.prototype.updatefixedUserHandle = function (newProp, actualObject) {
        if (newProp.fixedUserHandles !== undefined) {
            var index = void 0;
            var changedObject = void 0;
            var actualAnnotation = void 0;
            for (var _i = 0, _a = Object.keys(newProp.fixedUserHandles); _i < _a.length; _i++) {
                var key = _a[_i];
                index = Number(key);
                changedObject = newProp.fixedUserHandles["" + key];
                actualAnnotation = actualObject.fixedUserHandles[parseInt(index.toString(), 10)];
                this.updateConnectorfixedUserHandle(changedObject, actualAnnotation, actualObject.wrapper, actualObject);
            }
        }
    };
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
    Diagram.prototype.updateConnectorfixedUserHandle = function (changedObject, actualfixedUserHandle, nodes, actualObject, canUpdateSize) {
        var isMeasure = false;
        var fixedUserHandleWrapper = this.getWrapper(nodes, actualfixedUserHandle.id);
        if (fixedUserHandleWrapper !== undefined) {
            if (changedObject.width !== undefined) {
                fixedUserHandleWrapper.width = changedObject.width;
                isMeasure = true;
            }
            if (changedObject.height !== undefined) {
                fixedUserHandleWrapper.height = changedObject.height;
                isMeasure = true;
            }
            if (actualfixedUserHandle instanceof ConnectorFixedUserHandle &&
                (changedObject.offset !== undefined)) {
                actualObject.updateAnnotation(actualfixedUserHandle, actualObject.intermediatePoints, actualObject.wrapper.bounds, fixedUserHandleWrapper);
            }
            if ((actualfixedUserHandle instanceof ConnectorFixedUserHandle) && changedObject.displacement) {
                if (changedObject.displacement.x !== undefined ||
                    changedObject.displacement.y !== undefined) {
                    isMeasure = true;
                }
            }
            if (changedObject.fill !== undefined) {
                fixedUserHandleWrapper.style.fill = changedObject.fill;
            }
            if (changedObject.handleStrokeColor !== undefined) {
                fixedUserHandleWrapper.style.strokeColor = changedObject.handleStrokeColor;
            }
            if (changedObject.handleStrokeWidth !== undefined) {
                fixedUserHandleWrapper.style.strokeWidth = changedObject.handleStrokeWidth;
            }
            if (changedObject.visibility !== undefined) {
                fixedUserHandleWrapper.visible = changedObject.visibility;
            }
            if (changedObject.cornerRadius !== undefined) {
                fixedUserHandleWrapper.cornerRadius = changedObject.cornerRadius;
            }
            this.updatefixedUserHandleContent(changedObject, isMeasure, fixedUserHandleWrapper, actualObject, actualfixedUserHandle, nodes);
            if (isMeasure === true) {
                fixedUserHandleWrapper.measure(new Size(fixedUserHandleWrapper.width, fixedUserHandleWrapper.height));
                fixedUserHandleWrapper.arrange(fixedUserHandleWrapper.desiredSize);
            }
        }
    };
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
    Diagram.prototype.updateAnnotation = function (changedObject, actualAnnotation, nodes, actualObject, canUpdateSize) {
        var isMeasure = false;
        // eslint-disable-next-line max-len
        var annotationWrapper = this.getWrapper(nodes, actualAnnotation.id);
        if (annotationWrapper !== undefined) {
            if (changedObject.width !== undefined && changedObject.height !== undefined) {
                annotationWrapper.width = changedObject.width;
                annotationWrapper.height = changedObject.height;
                isMeasure = true;
            }
            if (changedObject.rotateAngle !== undefined) {
                annotationWrapper.rotateAngle = changedObject.rotateAngle;
            }
            if (canUpdateSize && !(annotationWrapper instanceof DiagramHtmlElement)) {
                annotationWrapper.refreshTextElement();
            }
            if (actualAnnotation instanceof PathAnnotation && changedObject.segmentAngle !== undefined) {
                annotationWrapper.rotateAngle = actualAnnotation.rotateAngle;
            }
            if ((changedObject).rotationReference !== undefined) {
                annotationWrapper.rotationReference = changedObject.rotationReference;
            }
            if (actualAnnotation instanceof ShapeAnnotation &&
                changedObject.offset !== undefined) {
                var offset = changedObject.offset;
                isMeasure = true;
                var offsetX = offset.x !== undefined ? offset.x :
                    actualAnnotation.offset.x;
                var offsetY = offset.y !== undefined ? offset.y :
                    actualAnnotation.offset.y;
                annotationWrapper.setOffsetWithRespectToBounds(offsetX, offsetY, 'Fraction');
                annotationWrapper.relativeMode = 'Point';
                //911103- Text alignment for connectors not updated properly for connectors annotation at run time
            }
            else if (actualAnnotation instanceof PathAnnotation &&
                (changedObject.offset !== undefined ||
                    changedObject.segmentAngle !== undefined ||
                    changedObject.alignment !== undefined)) {
                actualObject.updateAnnotation(actualAnnotation, actualObject.intermediatePoints, actualObject.wrapper.bounds, annotationWrapper);
            }
            if ((actualAnnotation instanceof PathAnnotation) && changedObject.displacement) {
                if (changedObject.displacement.x !== undefined ||
                    changedObject.displacement.y !== undefined) {
                    isMeasure = true;
                    actualObject.updateAnnotation(actualAnnotation, actualObject.intermediatePoints, actualObject.wrapper.bounds, annotationWrapper);
                }
            }
            if (changedObject.margin !== undefined) {
                isMeasure = true;
                if (changedObject.margin.bottom !== undefined) {
                    annotationWrapper.margin.bottom = changedObject.margin.bottom;
                }
                if (changedObject.margin.top !== undefined) {
                    annotationWrapper.margin.top = changedObject.margin.top;
                }
                if (changedObject.margin.left !== undefined) {
                    annotationWrapper.margin.left = changedObject.margin.left;
                }
                if (changedObject.margin.right !== undefined) {
                    annotationWrapper.margin.right = changedObject.margin.right;
                }
            }
            if (isMeasure || canUpdateSize) {
                annotationWrapper.width = (actualAnnotation.width || actualObject.width);
                if (actualAnnotation.template) {
                    annotationWrapper.width = (annotationWrapper.width || annotationWrapper.actualSize.width);
                    annotationWrapper.height = (actualAnnotation.height || actualObject.height ||
                        annotationWrapper.actualSize.height);
                }
            }
            if (changedObject.horizontalAlignment !== undefined) {
                annotationWrapper.horizontalAlignment = changedObject.horizontalAlignment;
                isMeasure = true;
            }
            if (changedObject.verticalAlignment !== undefined) {
                annotationWrapper.verticalAlignment = changedObject.verticalAlignment;
                isMeasure = true;
            }
            if (changedObject.visibility !== undefined) {
                annotationWrapper.visible = (nodes.visible && changedObject.visibility) ? true : false;
                annotationWrapper.annotationVisibility = annotationWrapper.visible ? 'Visible' : 'Collapsed';
            }
            if (changedObject.constraints !== undefined) {
                var updateSelector = false;
                if ((annotationWrapper.constraints & AnnotationConstraints.Select) &&
                    (!(changedObject.constraints & AnnotationConstraints.Select)) &&
                    isSelected(this, actualObject, false, annotationWrapper)) {
                    //updateSelector = true;
                }
                annotationWrapper.constraints = changedObject.constraints;
                if (updateSelector) {
                    this.clearSelection();
                }
            }
            if (changedObject.style !== undefined) {
                updateStyle(changedObject.style, annotationWrapper);
            }
            if (changedObject.hyperlink !== undefined) {
                updateHyperlink(changedObject.hyperlink, annotationWrapper, actualAnnotation);
            }
            this.updateAnnotationContent(changedObject, isMeasure, annotationWrapper, actualObject, actualAnnotation, nodes);
            if (isMeasure === true) {
                annotationWrapper.measure(new Size(annotationWrapper.width, annotationWrapper.height));
                annotationWrapper.arrange(annotationWrapper.desiredSize);
            }
            if (!(annotationWrapper instanceof DiagramHtmlElement)) {
                annotationWrapper.refreshTextElement();
            }
            // this.refresh(); this.refreshDiagramLayer();
        }
    };
    Diagram.prototype.updatefixedUserHandleContent = function (changedObject, isMeasure, fixedUserHandleWrapper, actualObject, fixedUserHandleAnnotation, nodes) {
        if (changedObject !== undefined) {
            this.updateConnectorfixedUserHandleWrapper(fixedUserHandleWrapper, actualObject, fixedUserHandleAnnotation, nodes);
        }
    };
    Diagram.prototype.updateConnectorfixedUserHandleWrapper = function (fixedUserHandleWrapper, actualObject, actualAnnotation, nodes) {
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var elementId = _a[_i];
            removeElement(fixedUserHandleWrapper.id + '_groupElement', elementId);
            removeElement(fixedUserHandleWrapper.id + '_html_element', elementId);
        }
        if (actualObject instanceof Connector) {
            var canvas = actualObject.wrapper;
            var segment = canvas.children[0];
            var bounds = new Rect(segment.offsetX - segment.width / 2, segment.offsetY - segment.height / 2, segment.width, segment.height);
            fixedUserHandleWrapper =
                actualObject.getFixedUserHandle(actualObject.fixedUserHandles[actualObject.fixedUserHandles.length - 1], actualObject.intermediatePoints, bounds, undefined, undefined);
        }
        for (var i = 0; i < nodes.children.length; i++) {
            if (fixedUserHandleWrapper.id === nodes.children[parseInt(i.toString(), 10)].id) {
                nodes.children.splice(i, 1, fixedUserHandleWrapper);
            }
        }
    };
    Diagram.prototype.updateAnnotationContent = function (changedObject, isMeasure, annotationWrapper, actualObject, actualAnnotation, nodes) {
        if (changedObject.content !== undefined) {
            if (annotationWrapper) {
                isMeasure = true;
                if (actualObject.shape.type === 'UmlActivity' &&
                    ((!isBlazor() && actualObject.shape.shape === 'StructuredNode'))) {
                    annotationWrapper.content = '<<' + changedObject.content + '>>';
                }
                else {
                    annotationWrapper.content = changedObject.content;
                }
            }
            if (annotationWrapper instanceof DiagramHtmlElement) {
                this.updateAnnotationWrapper(annotationWrapper, actualObject, actualAnnotation, nodes);
            }
        }
        if (changedObject.template !== undefined) {
            annotationWrapper.content = changedObject.template;
            this.updateAnnotationWrapper(annotationWrapper, actualObject, actualAnnotation, nodes);
        }
    };
    Diagram.prototype.updateAnnotationWrapper = function (annotationWrapper, actualObject, actualAnnotation, nodes) {
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var elementId = _a[_i];
            removeElement(annotationWrapper.id + '_groupElement', elementId);
            removeElement(annotationWrapper.id + '_html_element', elementId);
        }
        if (actualObject instanceof Node) {
            annotationWrapper =
                actualObject.initAnnotationWrapper(actualAnnotation, this.element.id);
        }
        else if (actualObject instanceof Connector) {
            var canvas = actualObject.wrapper;
            var segment = canvas.children[0];
            var bounds = new Rect(segment.offsetX - segment.width / 2, segment.offsetY - segment.height / 2, segment.width, segment.height);
            annotationWrapper =
                actualObject.getAnnotationElement(actualObject.annotations[actualObject.annotations.length - 1], actualObject.intermediatePoints, bounds, this.getDescription, this.element.id);
        }
        for (var i = 0; i < nodes.children.length; i++) {
            if (annotationWrapper.id === nodes.children[parseInt(i.toString(), 10)].id) {
                nodes.children.splice(i, 1, annotationWrapper);
            }
        }
    };
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
    Diagram.prototype.updateNodefixedUserHandle = function (changedObject, actualfixedUserHandle, nodes, actualObject) {
        //let fixedUserHandleWrapper: Canvas;
        var isMeasure = false;
        var fixedUserHandleWrapper = this.getWrapper(nodes, actualfixedUserHandle.id);
        if (fixedUserHandleWrapper !== undefined) {
            if (changedObject.width !== undefined) {
                fixedUserHandleWrapper.actualSize.width = changedObject.width;
                isMeasure = true;
            }
            if (changedObject.height !== undefined) {
                fixedUserHandleWrapper.height = changedObject.height;
                isMeasure = true;
            }
            if (actualfixedUserHandle instanceof NodeFixedUserHandle &&
                changedObject.offset !== undefined) {
                var offset = changedObject.offset;
                isMeasure = true;
                var offsetX = offset.x !== undefined ? offset.x :
                    actualfixedUserHandle.offset.x;
                var offsetY = offset.y !== undefined ? offset.y :
                    actualfixedUserHandle.offset.y;
                fixedUserHandleWrapper.setOffsetWithRespectToBounds(offsetX, offsetY, 'Fraction');
                fixedUserHandleWrapper.relativeMode = 'Point';
            }
            if (changedObject.margin !== undefined) {
                isMeasure = true;
                if (changedObject.margin.bottom !== undefined) {
                    fixedUserHandleWrapper.margin.bottom = changedObject.margin.bottom;
                }
                if (changedObject.margin.top !== undefined) {
                    fixedUserHandleWrapper.margin.top = changedObject.margin.top;
                }
                if (changedObject.margin.left !== undefined) {
                    fixedUserHandleWrapper.margin.left = changedObject.margin.left;
                }
                if (changedObject.margin.right !== undefined) {
                    fixedUserHandleWrapper.margin.right = changedObject.margin.right;
                }
            }
            if (changedObject.visibility !== undefined) {
                fixedUserHandleWrapper.visible = changedObject.visibility;
            }
            if (changedObject.fill !== undefined) {
                fixedUserHandleWrapper.style.fill = changedObject.fill;
            }
            if (changedObject.handleStrokeColor !== undefined) {
                fixedUserHandleWrapper.style.strokeColor = changedObject.handleStrokeColor;
            }
            if (changedObject.handleStrokeWidth !== undefined) {
                fixedUserHandleWrapper.style.strokeWidth = changedObject.handleStrokeWidth;
            }
            if (changedObject.cornerRadius !== undefined) {
                fixedUserHandleWrapper.cornerRadius = changedObject.cornerRadius;
            }
            this.updatefixedUserHandleWrapper(fixedUserHandleWrapper, actualObject, actualfixedUserHandle, nodes);
            if (isMeasure === true) {
                fixedUserHandleWrapper.measure(new Size(fixedUserHandleWrapper.width, fixedUserHandleWrapper.height));
                fixedUserHandleWrapper.arrange(fixedUserHandleWrapper.desiredSize);
            }
        }
    };
    Diagram.prototype.updatefixedUserHandleWrapper = function (fixedUserHandleWrapper, actualObject, actualAnnotation, nodes) {
        for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
            var elementId = _a[_i];
            removeElement(fixedUserHandleWrapper.id + '_groupElement', elementId);
            removeElement(fixedUserHandleWrapper.id + '_html_element', elementId);
        }
        if (actualObject instanceof Node) {
            fixedUserHandleWrapper = actualObject.initFixedUserHandles(actualAnnotation, undefined, undefined);
        }
        for (var i = 0; i < nodes.children.length; i++) {
            if (fixedUserHandleWrapper.id === nodes.children[parseInt(i.toString(), 10)].id) {
                nodes.children.splice(i, 1, fixedUserHandleWrapper);
            }
        }
    };
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
    Diagram.prototype.updatePort = function (changedObject, actualPort, nodes, actualObject) {
        var isMeasure = false;
        var portWrapper = this.getWrapper(nodes, actualPort.id);
        if (portWrapper !== undefined) {
            if (changedObject.offset !== undefined) {
                isMeasure = true;
                if (!actualObject) {
                    var offsetX = changedObject.offset.x !== undefined ? changedObject.offset.x :
                        actualPort.offset.x;
                    var offsetY = changedObject.offset.y !== undefined ? changedObject.offset.y :
                        actualPort.offset.y;
                    portWrapper.setOffsetWithRespectToBounds(offsetX, offsetY, 'Fraction');
                    portWrapper.relativeMode = 'Point';
                }
                else {
                    if (changedObject.offset !== undefined) {
                        actualObject.updateAnnotation(actualPort, actualObject.intermediatePoints, actualObject.wrapper.bounds, portWrapper);
                    }
                }
            }
            if (changedObject.width !== undefined) {
                isMeasure = true;
                portWrapper.width = changedObject.width;
            }
            if (changedObject.height !== undefined) {
                isMeasure = true;
                portWrapper.height = changedObject.height;
            }
            if (changedObject.connectionDirection !== undefined) {
                portWrapper.connectionDirection = changedObject.connectionDirection;
            }
            if (changedObject.visibility !== undefined) {
                portWrapper.visible = (nodes.visible && checkPortRestriction(actualPort, PortVisibility.Visible)) ? true : false;
            }
            if (changedObject.margin !== undefined) {
                isMeasure = true;
                if (changedObject.margin.bottom !== undefined) {
                    portWrapper.margin.bottom = changedObject.margin.bottom;
                }
                if (changedObject.margin.top !== undefined) {
                    portWrapper.margin.top = changedObject.margin.top;
                }
                if (changedObject.margin.right !== undefined) {
                    portWrapper.margin.right = changedObject.margin.right;
                }
                if (changedObject.margin.left !== undefined) {
                    portWrapper.margin.left = changedObject.margin.left;
                }
            }
            if (changedObject.horizontalAlignment !== undefined) {
                isMeasure = true;
                portWrapper.horizontalAlignment = changedObject.horizontalAlignment;
            }
            if (changedObject.verticalAlignment !== undefined) {
                isMeasure = true;
                portWrapper.verticalAlignment = changedObject.verticalAlignment;
            }
            if (changedObject.style !== undefined) {
                if (changedObject.style.fill !== undefined) {
                    portWrapper.style.fill = changedObject.style.fill;
                }
                if (changedObject.style.opacity !== undefined) {
                    portWrapper.style.opacity = changedObject.style.opacity;
                }
                if (changedObject.style.strokeColor !== undefined) {
                    portWrapper.style.strokeColor = changedObject.style.strokeColor;
                }
                if (changedObject.style.strokeWidth !== undefined) {
                    portWrapper.style.strokeWidth = changedObject.style.strokeWidth;
                }
                if (changedObject.style.strokeDashArray !== undefined) {
                    portWrapper.style.strokeDashArray = changedObject.style.strokeDashArray;
                }
            }
            if (changedObject.shape !== undefined) {
                if (portWrapper) {
                    var pathdata = getPortShape(changedObject.shape);
                    portWrapper.data = pathdata;
                    portWrapper.canMeasurePath = true;
                }
            }
            if (changedObject.pathData !== undefined) {
                portWrapper.data = String(changedObject.pathData);
                isMeasure = true;
            }
            if (isMeasure === true) {
                portWrapper.measure(new Size(portWrapper.width, portWrapper.height));
                portWrapper.arrange(portWrapper.desiredSize);
            }
            //this.refresh(); this.refreshDiagramLayer();
        }
    };
    /**
     * updateIcon method \
     *
     * @returns { void }  updateIcon method .\
     * @param {Node} actualObject - provide the obj value.
     *
     * @private
     */
    Diagram.prototype.updateIcon = function (actualObject) {
        var iconContainer = this.getWrapper(actualObject.wrapper, 'icon_content');
        var diagramId = (this.diagramActions & DiagramAction.Render) ? this.element.id : undefined;
        if (iconContainer) {
            if (this.mode === 'SVG') {
                var icon = getDiagramElement(actualObject.wrapper.id + '_icon_content', diagramId);
                if (icon) {
                    var iconRect = getDiagramElement(icon.id + '_rect', diagramId);
                    var iconShape = getDiagramElement(icon.id + '_shape', diagramId);
                    var nativeContent = getDiagramElement(iconShape.id + '_native_element', diagramId);
                    if (nativeContent) {
                        nativeContent.parentNode.removeChild(nativeContent);
                    }
                    iconShape.parentNode.removeChild(iconShape);
                    iconRect.parentNode.removeChild(iconRect);
                    icon.parentNode.removeChild(icon);
                }
            }
            var index = actualObject.wrapper.children.indexOf(iconContainer);
            actualObject.wrapper.children.splice(index, 1);
        }
        var portContainer = this.getPortContainer(actualObject);
        actualObject.initIcons(this.getDescription, this.layout, portContainer, this.element.id);
    };
    Diagram.prototype.getPortContainer = function (actualObject) {
        if (actualObject.children) {
            for (var i = 0; i < actualObject.wrapper.children.length; i++) {
                if (actualObject.wrapper.children[parseInt(i.toString(), 10)].id === actualObject.id + 'group_container') {
                    return actualObject.wrapper.children[parseInt(i.toString(), 10)];
                }
            }
        }
        return actualObject.wrapper;
    };
    Diagram.prototype.updateTooltip = function (actualObject, node) {
        if (node.tooltip.content !== undefined) {
            actualObject.tooltip.content = node.tooltip.content;
        }
        if (node.tooltip.position !== undefined) {
            actualObject.tooltip.position = node.tooltip.position;
        }
        if (node.tooltip.height !== undefined) {
            actualObject.tooltip.height = node.tooltip.height;
        }
        if (node.tooltip.width !== undefined) {
            actualObject.tooltip.width = node.tooltip.width;
        }
        if (node.tooltip.showTipPointer !== undefined) {
            actualObject.tooltip.showTipPointer = node.tooltip.showTipPointer;
        }
        if (node.tooltip.relativeMode !== undefined) {
            actualObject.tooltip.relativeMode = node.tooltip.relativeMode;
        }
    };
    /**
     * updateQuad method \
     *
     * @returns { void }  updateQuad method .\
     * @param {IElement} obj - provide the obj value.
     *
     * @private
     */
    Diagram.prototype.updateQuad = function (obj) {
        var modified = this.spatialSearch.updateQuad(obj.wrapper);
        if (modified && !this.preventDiagramUpdate) {
            this.updatePage();
        }
    };
    /**
     * removeFromAQuad method \
     *
     * @returns { void }  removeFromAQuad method .\
     * @param {IElement} obj - provide the node value.
     *
     * @private
     */
    Diagram.prototype.removeFromAQuad = function (obj) {
        if (obj.children) {
            var child = void 0;
            var children = obj.children;
            for (var i = 0; i < children.length; i++) {
                child = this.nameTable[children[parseInt(i.toString(), 10)]];
                if (child) {
                    this.removeFromAQuad(child);
                }
            }
        }
        this.spatialSearch.removeFromAQuad(obj.wrapper);
        var isSwimLane = obj.shape.type === 'SwimLane' ? true : false;
        var modified = this.spatialSearch.updateBounds(obj.wrapper, isSwimLane);
        if (modified && !this.preventDiagramUpdate) {
            this.updatePage();
        }
    };
    /**
     * updateGroupSize method \
     *
     * @returns { void }  updateGroupSize method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     *
     * @private
     */
    Diagram.prototype.updateGroupSize = function (node) {
        var tempNode;
        if (node.parentId) {
            tempNode = this.nameTable[node.parentId];
            if (tempNode) {
                if (tempNode.parentId) {
                    this.updateGroupSize(tempNode);
                }
                else {
                    tempNode.wrapper.measure(new Size());
                    tempNode.wrapper.arrange(tempNode.wrapper.desiredSize);
                    this.updateGroupOffset(tempNode);
                    this.updateDiagramObject(tempNode);
                }
            }
        }
    };
    Diagram.prototype.updatePage = function () {
        if ((this.diagramActions & DiagramAction.Render) &&
            !(this.diagramActions & DiagramAction.DragUsingMouse)) {
            this.scroller.updateScrollOffsets();
            this.scroller.setSize();
            //updating overview
            for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
                var temp = _a[_i];
                var view = this.views["" + temp];
                if (!(view instanceof Diagram)) {
                    view.updateView(view);
                }
            }
        }
        if (this.diagramActions & DiagramAction.DragUsingMouse) {
            this.renderPageBreaks();
            // EJ2-826378 - Scroller not updated properly when dragging a node outside the viewport.
            // We need to update the scroller while dragging.
            // If pageSize is defined, we don't need to update the scrollbar.
            // If pageSize is not defined, we need to update the scrollbar because the content is treated as page bounds, and if the content goes beyond the viewport, the scrollbar should be updated.
            if (!(this.pageSettings.width && this.pageSettings.height) || this.pageSettings.multiplePage) {
                this.scroller.updateScrollOffsets();
                this.scroller.setSize();
            }
        }
    };
    /**
     * protectPropertyChange method \
     *
     * @returns { void }  protectPropertyChange method .\
     * @param {boolean} enable - provide the enable value.
     *
     * @private
     */
    Diagram.prototype.protectPropertyChange = function (enable) {
        this.isProtectedOnChange = enable;
    };
    /**
     * getProtectPropertyChangeValue method \
     *
     * @returns { boolean }  getProtectPropertyChangeValue method .\
     *
     * @private
     */
    Diagram.prototype.getProtectPropertyChangeValue = function () {
        return this.isProtectedOnChange;
    };
    /**
     * enableServerDataBinding method \
     *
     * @returns { void }  enableServerDataBinding method .\
     * @param {boolean} enable - provide the node value.
     *
     * @private
     */
    Diagram.prototype.enableServerDataBinding = function (enable) {
        //Removed isBlazor code
    };
    /**
     * updateShadow method \
     *
     * @returns { void }  updateShadow method .\
     * @param {ShadowModel} nodeShadow - provide the node value.
     * @param {ShadowModel} changedShadow - provide the Node value.
     *
     * @private
     */
    Diagram.prototype.updateShadow = function (nodeShadow, changedShadow) {
        if (changedShadow.angle !== undefined) {
            nodeShadow.angle = changedShadow.angle;
        }
        if (changedShadow.color !== undefined) {
            nodeShadow.color = changedShadow.color;
        }
        if (changedShadow.distance !== undefined) {
            nodeShadow.distance = changedShadow.distance;
        }
        if (changedShadow.opacity !== undefined) {
            nodeShadow.opacity = changedShadow.opacity;
        }
    };
    /**
     * updateMargin method \
     *
     * @returns { void }  updateMargin method .\
     * @param {Node} node - provide the node value.
     * @param {Node} changes - provide the Node value.
     *
     * @private
     */
    Diagram.prototype.updateMargin = function (node, changes) {
        if (changes.margin.top !== undefined) {
            node.margin.top = changes.margin.top;
        }
        if (changes.margin.bottom !== undefined) {
            node.margin.bottom = changes.margin.bottom;
        }
        if (changes.margin.left !== undefined) {
            node.margin.left = changes.margin.left;
        }
        if (changes.margin.right !== undefined) {
            node.margin.right = changes.margin.right;
        }
    };
    Diagram.prototype.removePreviewChildren = function (preview) {
        if (preview.children && preview.children.length &&
            preview.shape && preview.shape.type === 'SwimLane') {
            for (var z = 0; z < preview.children.length; z++) {
                var previewChildId = preview.children[parseInt(z.toString(), 10)];
                var previewIndex_1 = this.nodes.indexOf(this.nameTable["" + previewChildId]);
                if (previewIndex_1 >= 0) {
                    this.nodes.splice(previewIndex_1, 1);
                }
                delete this.nameTable["" + previewChildId];
            }
            var previewIndex = this.nodes.indexOf(this.nameTable[this.currentSymbol.id]);
            if (previewIndex >= 0) {
                this.nodes.splice(previewIndex, 1);
            }
        }
    };
    Diagram.prototype.selectDragedNode = function (newObj, args, selectedSymbol) {
        this.currentSymbol = newObj;
        if (this.mode !== 'SVG') {
            this.refreshDiagramLayer();
        }
        this.commandHandler.oldSelectedObjects = cloneSelectedObjects(this);
        this.commandHandler.select(newObj);
        // this.commandHandler.updateBlazorSelector();
        this.eventHandler.mouseDown(args.event);
        this.eventHandler.mouseMove(args.event, args);
        this.preventDiagramUpdate = false;
        this.updatePage();
        selectedSymbol.style.opacity = '0';
    };
    //property changes - end region
    /* tslint:disable */
    Diagram.prototype.initDroppables = function () {
        var _this = this;
        // initiates droppable event
        var childTable = {};
        var entryTable = {};
        var header;
        var lane;
        var selectedSymbols = 'selectedSymbols';
        this.droppable = new Droppable(this.element);
        var dragLeft = 5;
        // this.droppable.accept = '.e-dragclone';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.droppable.over = function (args) {
            //Bug 855292: Swimlane dragging from palette jumps out of viewport when multiple page is set as true.
            // Added below code to prevent the negative x value of swimlane bounds when multiple page and ruler is enabled to prevent swimlane jump.
            if (_this.rulerSettings.showRulers) {
                var vRuler = document.getElementById(_this.element.id + '_vRuler');
                var vRulerWidth = parseFloat(vRuler.style.width);
                dragLeft = vRulerWidth + 1;
            }
            //EJ2-59341- SelectionChange OldValue argument is null
            if (_this.previousSelectedObjects.length === 0 && !_this.currentSymbol) {
                _this.previousSelectedObjects = _this.commandHandler.getSelectedObject();
            }
            _this.commandHandler.PreventConnectorSplit = true;
            if (!_this.currentSymbol) {
                var dragDataHelper = null;
                if (!args.dragData && args.name === 'drag') {
                    var helper = document.getElementsByClassName('e-dragclone')[0];
                    if (helper) {
                        dragDataHelper = helper;
                    }
                }
                if (args.dragData || dragDataHelper) {
                    var newObj = void 0;
                    var isHorizontal = void 0;
                    document.getElementById(_this.element.id + 'content').focus();
                    var position = _this.eventHandler.getMousePosition(args.event);
                    var clonedObject = void 0;
                    var selectedSymbol = dragDataHelper || args.dragData.helper;
                    var paletteId = selectedSymbol.getAttribute('paletteId');
                    var nodeDragSize = void 0;
                    var nodePreviewSize = void 0;
                    var paletteDragSize = void 0;
                    var preview = void 0;
                    if (!paletteId && args.dragData) {
                        var arg = {
                            source: null, element: newObj, cancel: false,
                            diagram: _this,
                            dragData: args.dragData.draggedElement.ej2_instances[0].dragData,
                            dragItem: newObj
                        };
                        _this.triggerEvent(DiagramEvent.dragEnter, arg);
                        var newNode = void 0;
                        var newConnector = void 0;
                        // EJ2-61664 - Check whether dragItem is returned from dragEnter event or not.
                        // If it does not returned means then we do not change the treeview object as node
                        if (arg.dragItem) {
                            if (arg.dragItem.sourcePoint && arg.dragItem.targetPoint) {
                                newConnector = new Connector(_this, 'connectors', arg.dragItem, true);
                            }
                            else {
                                newNode = new Node(_this, 'nodes', arg.dragItem, true);
                            }
                            newObj = newNode ? newNode : newConnector;
                            _this.initObject(newObj, undefined, undefined, true);
                            _this['enterObject'] = newObj;
                            _this['enterTable'] = entryTable;
                            if (newObj instanceof Node) {
                                newNode.offsetX = position.x + 5 + (newNode.width) * newNode.pivot.x;
                                newNode.offsetY = position.y + (newNode.height) * newNode.pivot.y;
                            }
                            else if (newObj instanceof Connector) {
                                var newObjBounds = Rect.toBounds([newObj.sourcePoint, newObj.targetPoint]);
                                var diffx = position.x - newObjBounds.left;
                                var diffy = position.y - newObjBounds.top;
                                newObj.sourcePoint.x += diffx;
                                newObj.sourcePoint.y += diffy;
                                newObj.targetPoint.x += diffx;
                                newObj.targetPoint.y += diffy;
                            }
                            _this.preventDiagramUpdate = true;
                            _this.currentSymbol = newObj;
                            if (_this.mode !== 'SVG') {
                                _this.refreshDiagramLayer();
                            }
                            _this.selectDragedNode(newObj, args, selectedSymbol);
                            delete _this['enterObject'];
                            delete _this['enterTable'];
                            _this.droppable["" + selectedSymbols] = selectedSymbol;
                            _this.allowServerDataBinding = true;
                        }
                    }
                    if (paletteId) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var sourceElement = document.getElementById(paletteId).ej2_instances[0];
                        var source = 'sourceElement';
                        _this.droppable["" + source] = sourceElement;
                        var childtable = 'childTable';
                        if (sourceElement) {
                            var obj = sourceElement["" + selectedSymbols];
                            _this.allowServerDataBinding = false;
                            clonedObject = cloneObject(sourceElement["" + selectedSymbols]);
                            childTable = sourceElement["" + childtable];
                            var wrapper = obj.wrapper.children[0].children[0];
                            preview = getPreviewSize(sourceElement, clonedObject, wrapper);
                            if (sourceElement["" + selectedSymbols] instanceof Node) {
                                if (obj.shape.shape === 'TextAnnotation') {
                                    // eslint-disable-next-line max-len
                                    clonedObject.offsetX = position.x + 11 + (preview.width) * clonedObject.pivot.x;
                                    // eslint-disable-next-line max-len
                                    clonedObject.offsetY = position.y + 11 + (preview.height) * clonedObject.pivot.y;
                                }
                                else {
                                    // eslint-disable-next-line max-len
                                    clonedObject.offsetX = position.x + 5 + (preview.width) * clonedObject.pivot.x;
                                    // eslint-disable-next-line max-len
                                    clonedObject.offsetY = position.y + (preview.height) * clonedObject.pivot.y;
                                }
                                var newNode = new Node(_this, 'nodes', clonedObject, true);
                                if (newNode.shape.type === 'Bpmn' && newNode.shape.activity.subProcess.processes
                                    && newNode.shape.activity.subProcess.processes.length) {
                                    newNode.shape.activity.subProcess.processes = [];
                                }
                                nodeDragSize = newNode.dragSize;
                                nodePreviewSize = newNode.previewSize;
                                paletteDragSize = sourceElement['symbolDragSize'];
                                var palettePreview = sourceElement['symbolPreview'];
                                // eslint-disable-next-line max-len
                                newNode.width = nodeDragSize.width || paletteDragSize.width || nodePreviewSize.width || palettePreview.width || newNode.width;
                                // eslint-disable-next-line max-len
                                newNode.height = nodeDragSize.height || paletteDragSize.height || nodePreviewSize.height || palettePreview.height || newNode.height;
                                if (newNode.shape.type === 'SwimLane') {
                                    _this.diagramActions |= DiagramAction.PreventHistory;
                                    if (newNode.shape.isLane) {
                                        newNode.children = [];
                                        header = {
                                            id: 'header' + randomId()
                                        };
                                        if (newNode.shape.orientation === 'Horizontal') {
                                            header.width = newNode.shape.lanes[0].header.width;
                                            header.height = newNode.shape.lanes[0].height;
                                        }
                                        else {
                                            header.width = newNode.shape.lanes[0].width;
                                            header.height = newNode.shape.lanes[0].header.height;
                                        }
                                        header.style = newNode.shape.lanes[0].header.style;
                                        header.offsetX = position.x + dragLeft + header.width / 2;
                                        header.offsetY = position.y + header.height / 2;
                                        _this.diagramActions |= DiagramAction.PreventCollectionChangeOnDragOver;
                                        header = _this.add(header);
                                        lane = {
                                            id: 'body' + randomId()
                                        };
                                        if (newNode.shape.orientation === 'Horizontal') {
                                            lane.width = newNode.shape.lanes[0].width - header.width;
                                            lane.height = newNode.shape.lanes[0].height;
                                            // eslint-disable-next-line max-len
                                            lane.offsetX = position.x + dragLeft + (newNode.shape.lanes[0].header.width + (lane.width / 2));
                                            lane.offsetY = position.y + lane.height / 2;
                                        }
                                        else {
                                            lane.width = newNode.shape.lanes[0].width;
                                            lane.height = newNode.shape.lanes[0].height - header.height;
                                            lane.offsetX = position.x + dragLeft + lane.width / 2;
                                            // eslint-disable-next-line max-len
                                            lane.offsetY = position.y + (newNode.shape.lanes[0].header.height + (lane.height / 2));
                                        }
                                        lane.style = newNode.shape.lanes[0].style;
                                        lane = _this.add(lane);
                                        var group = {
                                            id: 'group' + randomId(),
                                            children: [header.id, lane.id]
                                        };
                                        group.shape = newNode.shape;
                                        group.width = newNode.shape.lanes[0].width;
                                        group.height = newNode.shape.lanes[0].height;
                                        group.previewSize = newNode.previewSize;
                                        group.dragSize = newNode.dragSize;
                                        group.addInfo = newNode.addInfo;
                                        newNode = _this.add(group);
                                        _this.diagramActions &= ~DiagramAction.PreventCollectionChangeOnDragOver;
                                    }
                                    _this.diagramActions &= ~DiagramAction.PreventHistory;
                                }
                                if (newNode.shape.isPhase) {
                                    isHorizontal = (newNode.shape.orientation === 'Horizontal') ? true : false;
                                    if (isHorizontal) {
                                        newNode.offsetX = position.x + dragLeft + (newNode.width || wrapper.actualSize.width) / 2;
                                        newNode.offsetY = position.y;
                                        newNode.shape.data =
                                            'M' + 20 + ',' + (newNode.height / 2) + ' L' + (newNode.width - 20) + ',' +
                                                (newNode.height / 2) + 'z';
                                        newNode.height = 1;
                                    }
                                    else {
                                        newNode.offsetX = position.x + 5;
                                        newNode.offsetY = position.y + (newNode.height || wrapper.actualSize.height) / 2;
                                        newNode.shape.data =
                                            'M' + (newNode.width / 2) + ',' + 20 + ' L' + (newNode.width / 2) +
                                                ',' + (newNode.height - 20) + 'z';
                                        newNode.width = 1;
                                    }
                                }
                                if (newNode.shape.type === 'UmlClassifier') {
                                    //When dragging a node from the palette to the diagram, set the children, width, and height values to undefined to avoid incorrect values.
                                    newNode.children = newNode.width = newNode.height = undefined;
                                    clonedObject.children = undefined;
                                    //An empty child type is added during drag enter for every node if no child types are specified in the palette.
                                    if (newNode.shape.classifier === 'Class') {
                                        if (newNode.shape.classShape.methods.length <= 0
                                            && newNode.shape.classShape.attributes.length <= 0) {
                                            newNode.shape.classShape.attributes = [
                                                { name: 'Name', type: 'Type', style: {} }
                                            ];
                                        }
                                    }
                                    if (newNode.shape.classifier === 'Enumeration') {
                                        if (newNode.shape.enumerationShape.members.length <= 0) {
                                            newNode.shape.enumerationShape.members = [
                                                {
                                                    name: 'Name'
                                                }
                                            ];
                                        }
                                    }
                                    if (newNode.shape.classifier === 'Interface') {
                                        if (newNode.shape.interfaceShape.methods.length <= 0
                                            && newNode.shape.interfaceShape.attributes.length <= 0) {
                                            newNode.shape.interfaceShape.attributes = [
                                                { name: 'Name', type: 'Type', style: {} }
                                            ];
                                        }
                                    }
                                }
                                newObj = newNode;
                                if (clonedObject.children) {
                                    var parentNode = clonedObject;
                                    var tempTable = {};
                                    entryTable = _this.getChildren(parentNode, tempTable, childTable);
                                    arrangeChild(parentNode, -parentNode.offsetX, -parentNode.offsetY, entryTable, true, _this);
                                }
                            }
                            else if (sourceElement["" + selectedSymbols] instanceof Connector) {
                                newObj = new Connector(_this, 'connectors', clonedObject, true);
                                var bounds = Rect.toBounds([newObj.sourcePoint, newObj.targetPoint]);
                                var tx = position.x - bounds.left;
                                var ty = position.y - bounds.top;
                                newObj.sourcePoint.x += tx;
                                newObj.sourcePoint.y += ty;
                                newObj.targetPoint.x += tx;
                                newObj.targetPoint.y += ty;
                            }
                            if (!newObj.shape.isLane) {
                                newObj.id += randomId();
                            }
                            var arg = {
                                source: sourceElement, element: newObj, cancel: false,
                                diagram: _this, dragData: null, dragItem: newObj
                            };
                            //Removed isBlazor code
                            _this['enterObject'] = newObj;
                            _this['enterTable'] = entryTable;
                            _this.triggerEvent(DiagramEvent.dragEnter, arg);
                            if ((newObj instanceof Node) && newObj.shape.type === 'SwimLane' && newObj.shape.isLane) {
                                var swimLaneObj = arg.element;
                                var laneObj = swimLaneObj.shape.lanes[0];
                                //let child1: NodeModel; let child2: NodeModel;
                                isHorizontal = (swimLaneObj.shape.orientation === 'Horizontal') ? true : false;
                                var child1 = _this.nameTable[newObj.children[0]];
                                var child2 = _this.nameTable[newObj.children[1]];
                                nodeDragSize = newObj.dragSize;
                                nodePreviewSize = newObj.previewSize;
                                paletteDragSize = sourceElement['symbolDragSize'];
                                laneObj.width = nodeDragSize.width || paletteDragSize.width || nodePreviewSize.width || laneObj.width;
                                laneObj.height = nodeDragSize.height || paletteDragSize.height || nodePreviewSize.height || laneObj.height;
                                if (isHorizontal) {
                                    header.width = laneObj.header.width;
                                    header.height = laneObj.height;
                                    lane.width = laneObj.width - header.width;
                                    lane.height = laneObj.height;
                                    lane.offsetX = position.x + dragLeft + (laneObj.header.width + (child2.width / 2));
                                    lane.offsetY = position.y + child2.height / 2;
                                }
                                else {
                                    header.width = laneObj.width;
                                    header.height = laneObj.header.height;
                                    lane.width = laneObj.width;
                                    lane.height = laneObj.height - header.height;
                                    lane.offsetX = position.x + dragLeft + child2.width / 2;
                                    lane.offsetY = position.y + (laneObj.header.height + (child2.height / 2));
                                }
                                header.offsetX = position.x + dragLeft + child1.width / 2;
                                header.offsetY = position.y + child1.height / 2;
                                newObj.width = laneObj.width;
                                newObj.height = laneObj.height;
                            }
                            if ((newObj instanceof Node) && newObj.shape.isPhase) {
                                if (isHorizontal) {
                                    newObj.height = 1;
                                }
                                else {
                                    newObj.width = 1;
                                }
                            }
                            if (!_this.activeLayer.lock && !arg.cancel) {
                                _this.preventDiagramUpdate = true;
                                if (newObj.children) {
                                    _this.findChild(newObj, entryTable);
                                }
                                _this.preventDiagramUpdate = true;
                                if (newObj.zIndex !== Number.MIN_VALUE) {
                                    newObj.zIndex = Number.MIN_VALUE;
                                }
                                _this.initObject(newObj, undefined, undefined, true);
                                if (_this.bpmnModule) {
                                    for (var i = 0; i < _this.bpmnModule.bpmnTextAnnotationConnector.length; i++) {
                                        if (_this.bpmnModule.bpmnTextAnnotationConnector[parseInt(i.toString(), 10)].wrapper === null) {
                                            _this.initConnectors(_this.bpmnModule.bpmnTextAnnotationConnector[parseInt(i.toString(), 10)], undefined, true);
                                        }
                                    }
                                }
                                _this.selectDragedNode(newObj, args, selectedSymbol);
                            }
                            delete _this['enterObject'];
                            delete _this['enterTable'];
                        }
                        _this.droppable["" + selectedSymbols] = selectedSymbol;
                        _this.allowServerDataBinding = true;
                    }
                }
            }
            else {
                if (args.event.touches && args.event.touches.length) {
                    _this.eventHandler.mouseMove(args.event, args.event.touches);
                }
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.droppable.drop = function (args) { return __awaiter(_this, void 0, void 0, function () {
            var source, value, isPhase, orientation_2, isConnector, arg, id, clonedObject, nodeId, newObj, arg, clonedObject, id, selectedSymbols, draggableElement, i;
            return __generator(this, function (_a) {
                this.allowServerDataBinding = false;
                source = 'sourceElement';
                if (this.currentSymbol) {
                    isPhase = false;
                    isConnector = (this.currentSymbol instanceof Connector) ? true : false;
                    if (args.event.touches) {
                        this.eventHandler.mouseUp(args.event);
                    }
                    arg = {
                        source: this.droppable["" + source],
                        element: this.currentSymbol,
                        //EJ2-895314: Connector splits while dropping node on diagram, even after moving node away from connector highlighter
                        target: this.eventHandler['hoverNode'] ||
                            (this.findObjectsUnderMouse(this.eventHandler.getMousePosition(args.event))[0]) || this,
                        cancel: false,
                        position: { x: this.currentSymbol.wrapper.offsetX, y: this.currentSymbol.wrapper.offsetY }
                    };
                    // Removed isBlazor code
                    this.commandHandler.PreventConnectorSplit = false;
                    this.triggerEvent(DiagramEvent.drop, arg);
                    id = 'id';
                    clonedObject = cloneObject(this.currentSymbol);
                    clonedObject['hasTarget'] = this.currentSymbol['hasTarget'];
                    this.removeFromAQuad(this.currentSymbol);
                    this.removeObjectsFromLayer(this.nameTable[this.currentSymbol.id]);
                    this.removeElements(this.currentSymbol);
                    //887625-UML class nodes cloned in diagram canvas while dragging nodes outside diagram page
                    if ((this.currentSymbol.shape.isLane ||
                        this.currentSymbol.shape.isPhase) || this.currentSymbol.shape.type === 'UmlClassifier') {
                        this.removeChildInNodes(this.currentSymbol);
                    }
                    if (arg.cancel) {
                        removeChildNodes(this.currentSymbol, this);
                    }
                    if (this.currentSymbol.shape.isPhase) {
                        isPhase = true;
                        orientation_2 = this.currentSymbol.shape.orientation;
                        clonedObject.shape.phases = this.currentSymbol.shape.phases;
                    }
                    this.removePreviewChildren(this.currentSymbol);
                    delete this.nameTable[this.currentSymbol.id];
                    this.currentSymbol = null;
                    this.protectPropertyChange(true);
                    if (!arg.cancel) {
                        this.startGroupAction();
                        if (clonedObject && (clonedObject.shape.isLane || isPhase)) {
                            if (isPhase) {
                                clonedObject.shape.isPhase = isPhase;
                                clonedObject.shape.orientation = orientation_2;
                            }
                            this.eventHandler.addSwimLaneObject(clonedObject);
                        }
                        //The following condition is designed to ensure that only UML nodes are added to the diagram during the drop operation
                        if (clonedObject && clonedObject.shape.type === 'UmlClassifier' && !clonedObject.shape.relationship) {
                            clonedObject.children = undefined;
                            this.clearSelectorLayer();
                            this.add(clonedObject);
                        }
                        if (clonedObject.shape.type === 'Bpmn' && clonedObject.shape.annotation
                            && clonedObject['hasTarget']) {
                            nodeId = clonedObject.shape.annotation.nodeId;
                            clonedObject.shape.annotation.id = clonedObject.id;
                            this.addTextAnnotation(clonedObject.shape.annotation, this.nameTable["" + nodeId]);
                            clonedObject.nodeId = '';
                        }
                        if (!clonedObject.shape.isLane && !isPhase && (clonedObject.type !== undefined || clonedObject.shape.type !== 'UmlClassifier')) {
                            if (clonedObject.children) {
                                this.addChildNodes(clonedObject);
                            }
                            //Bug 880814: Adding element to bpmn expanded subprocess located in swimlane throws an exception.
                            // isTargetSubProcess is checked.
                            if (arg.target && (arg.target instanceof Node) && !isConnector && checkParentAsContainer(this, arg.target)
                                && canAllowDrop(arg.target) && !this.commandHandler.isTargetSubProcess(arg.target)) {
                                addChildToContainer(this, arg.target, clonedObject);
                            }
                            else {
                                // EJ2-62652 - Added below code to empty the segment collection if connector type is bezier
                                if (clonedObject.type === 'Bezier' && clonedObject.segments.length > 0) {
                                    clonedObject.segments = [];
                                }
                                value = this.add(clonedObject, true);
                            }
                            //EJ2-864543 - Added symbols don't get correctly selected in MultipleSelect mode in Diagram
                            if ((clonedObject || value) && (canSingleSelect(this) || canMultiSelect(this))) {
                                this.select([this.nameTable[clonedObject["" + id]]], false, this.previousSelectedObjects);
                            }
                            //EJ2-909180 - Line routing does not take place when drag and drop from symbol Palatte
                            if (this.lineRoutingModule && (this.constraints & DiagramConstraints.LineRouting)) {
                                this.commandHandler.updateSelectedNodeProperties(this.selectedItems);
                            }
                            if (arg.target && arg.target instanceof Connector) {
                                if (this.enableConnectorSplit === true) {
                                    if (this.nameTable[clonedObject["" + id]] instanceof Node) {
                                        this.commandHandler.connectorSplit(this.nameTable[clonedObject["" + id]], arg.target);
                                        this.commandHandler.PreventConnectorSplit = false;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        this.clearSelectorLayer();
                    }
                    this.protectPropertyChange(false);
                    newObj = this.nameTable[clonedObject["" + id]];
                    if (clonedObject['hasTarget']) {
                        clonedObject.nodeId = clonedObject['hasTarget'];
                        this.remove(clonedObject);
                    }
                    if (this.bpmnModule && newObj instanceof Node && clonedObject.processId) {
                        newObj.processId = clonedObject.processId;
                        this.bpmnModule.dropBPMNchild(this.nameTable[newObj.processId], newObj, this);
                    }
                    if (!arg.cancel) {
                        this.endGroupAction();
                    }
                    if (this.mode !== 'SVG') {
                        this.refreshDiagramLayer();
                    }
                    delete this.droppable["" + source];
                }
                else {
                    arg = {
                        source: cloneBlazorObject(args.droppedElement),
                        element: undefined,
                        target: cloneBlazorObject(this.eventHandler['hoverNode'] || (this.eventHandler['lastObjectUnderMouse']) || this), cancel: false,
                        position: undefined
                    };
                    //Removed is Blazor code.
                    this.triggerEvent(DiagramEvent.drop, arg);
                    clonedObject = void 0;
                    id = 'id';
                }
                selectedSymbols = 'selectedSymbols';
                // eslint-disable-next-line max-len
                if (this.droppable["" + selectedSymbols] && this.droppable["" + selectedSymbols].parentNode) {
                    remove(this.droppable["" + selectedSymbols]);
                }
                else {
                    draggableElement = document.getElementsByClassName('e-dragclone');
                    for (i = 0; i < draggableElement.length; i++) {
                        draggableElement[parseInt(i.toString(), 10)].remove();
                    }
                }
                this.allowServerDataBinding = true;
                this.previousSelectedObjects = [];
                return [2 /*return*/];
            });
        }); };
        this.droppable.out = function (args) {
            // EJ2-57221 - Added the below code to check if we drag the node from symbol palette using touch or mouse.
            if (args.evt.type === 'touchmove') {
                _this.eventHandler.mouseLeave(args.evt);
            }
            if (_this.currentSymbol && (!_this.eventHandler.focus)) {
                _this.unSelect(_this.currentSymbol);
                _this.removeFromAQuad(_this.currentSymbol);
                if (_this.mode !== 'SVG' && _this.currentSymbol.shape.type === 'Native') {
                    _this.removeElements(_this.currentSymbol);
                }
                _this.removeObjectsFromLayer(_this.nameTable[_this.currentSymbol.id]);
                if (_this.currentSymbol.shape && _this.currentSymbol.shape.shape === 'TextAnnotation') {
                    var con = _this.nameTable[_this.currentSymbol.inEdges[0]];
                    _this.removeObjectsFromLayer(_this.nameTable[con.id]);
                    _this.removeFromAQuad(con);
                    _this.removePreviewChildren(con);
                    delete _this.nameTable[con.id];
                    var index = _this.connectors.indexOf(con);
                    _this.connectors.splice(index, 1);
                    _this.removeElements(con);
                }
                _this.removePreviewChildren(_this.currentSymbol);
                delete _this.nameTable[_this.currentSymbol.id];
                var args_1 = {
                    element: cloneBlazorObject(_this.currentSymbol),
                    diagram: _this
                };
                //Removed is Blazor code
                _this.triggerEvent(DiagramEvent.dragLeave, args_1);
                if (_this.mode !== 'SVG') {
                    _this.refreshDiagramLayer();
                }
                else {
                    _this.removeElements(_this.currentSymbol);
                    //EJ2-833020-To remove the child element from the group node while dragging the group node from palette
                    //EJ2-842739- Error When Dragging Swimlane from Palette to Diagram and Exiting Without Dropping
                    if (_this.currentSymbol.shape.type !== 'SwimLane' && _this.currentSymbol.children && _this.currentSymbol.children.length > 0) {
                        for (var i = 0; i < _this.currentSymbol.children.length; i++) {
                            var child = _this.nameTable[_this.currentSymbol.children[parseInt(i.toString(), 10)]];
                            _this.removeElements(child);
                            delete _this.nameTable[_this.currentSymbol.children[parseInt(i.toString(), 10)]];
                        }
                    }
                }
                _this.currentSymbol = null;
                var selectedSymbols_1 = 'selectedSymbols';
                _this.droppable["" + selectedSymbols_1].style.opacity = '1';
                var source = 'sourceElement';
                delete _this.droppable["" + source];
                _this.diagramRenderer.rendererActions =
                    _this.removeConstraints(_this.diagramRenderer.rendererActions, RendererAction.DrawSelectorBorder);
                if (_this.previousSelectedObject) {
                    _this.select(_this.previousSelectedObject, _this.previousSelectedObject.length > 1 ? true : false);
                }
                _this.previousSelectedObject = null;
            }
        };
    };
    // Removed Blazor getBlazorDragLeaveEventArgs method
    Diagram.prototype.getDropEventArgs = function (arg) {
        if ((this.eventHandler['lastObjectUnderMouse'] || this.eventHandler['hoverNode'])) {
            var object = this.eventHandler['lastObjectUnderMouse'] || this.eventHandler['hoverNode'];
            // eslint-disable-next-line max-len
            arg.target = getObjectType(object) === Connector ? { connector: cloneBlazorObject(object) } : { node: cloneBlazorObject(object) };
        }
        else {
            arg.target.diagramId = this.element.id;
        }
    };
    Diagram.prototype.removeChildInNodes = function (node) {
        if (node) {
            if (node.children) {
                for (var i = 0; i < node.children.length; i++) {
                    this.removeChildInNodes(this.nameTable[node.children[parseInt(i.toString(), 10)]]);
                }
            }
            var index = this.nodes.indexOf(node);
            if (index !== -1) {
                this.nodes.splice(index, 1);
            }
        }
    };
    Diagram.prototype.getBlazorDragEventArgs = function (args) {
        args = {
            // eslint-disable-next-line max-len
            source: cloneBlazorObject(args.source), element: getObjectType(args.element) === Connector ? { connector: cloneBlazorObject(args.element) }
                : { node: cloneBlazorObject(args.element) },
            cancel: args.cancel, diagramId: this.element.id
        };
        return args;
    };
    Diagram.prototype.findChild = function (node, childTable) {
        var group;
        var newNode;
        for (var i = 0; i < node.children.length; i++) {
            group = childTable[node.children[parseInt(i.toString(), 10)]];
            if (group) {
                if (group.children) {
                    this.findChild(group, childTable);
                }
                group.id = group.id + randomId();
                childTable[group.id] = group;
                node.children[parseInt(i.toString(), 10)] = group.id;
                newNode = new Node(this, 'nodes', group, true);
                this.initObject(newNode, undefined, undefined, true);
                //this.add(group, true);
            }
        }
    };
    Diagram.prototype.getChildren = function (node, entryTable, childTable) {
        var temp;
        for (var i = 0; i < node.children.length; i++) {
            temp = (childTable[node.children[parseInt(i.toString(), 10)]]);
            if (temp) {
                if (temp.children) {
                    entryTable = this.getChildren(temp, entryTable, childTable);
                }
                entryTable[temp.id] = cloneObject(temp);
            }
        }
        return entryTable;
    };
    Diagram.prototype.addChildNodes = function (node) {
        var temp;
        for (var i = 0; i < node.children.length; i++) {
            temp = (this.nameTable[node.children[parseInt(i.toString(), 10)]]);
            if (temp) {
                if (temp.children) {
                    this.addChildNodes(temp);
                }
                this.add(temp, true);
            }
        }
    };
    Diagram.prototype.moveNode = function (node) {
        var currentLayer = this.commandHandler.getObjectLayer(node.id);
        var index = currentLayer.zIndex;
        var length = currentLayer.objects.length;
        var targetLayer;
        for (var i = 0; i < this.layers.length; i++) {
            if (index === this.layers[parseInt(i.toString(), 10)].zIndex) {
                targetLayer = this.layers[i + 1];
            }
        }
        if (length > 1) {
            // Bug 830365: Exception raised on adding group node in layers dynamically.
            // Added below code to check the group node and iterate its children in layer to find the last object in the layer.
            var num = 2;
            if (node.children && node.children.length > 0) {
                while (node.children.indexOf(currentLayer.objects[length - num]) > -1) {
                    num++;
                }
            }
            this.commandHandler.moveSvgNode(node.id, currentLayer.objects[length - num]);
            this.commandHandler.moveSvgNode(currentLayer.objects[length - num], node.id);
        }
        else {
            if (targetLayer) {
                var targetObject = this.commandHandler.getLayer(this.layerZIndexTable[targetLayer.zIndex]).objects[0];
                if (targetObject) {
                    this.commandHandler.moveSvgNode(node.id, targetObject);
                    this.commandHandler.updateNativeNodeIndex(node.id, targetObject);
                }
                else {
                    this.moveObjectsUp(node, currentLayer);
                }
            }
            else {
                this.moveObjectsUp(node, currentLayer);
            }
        }
    };
    /**
     * Moves the node or connector forward within the given layer. \
     *
     * @returns { void }  Moves the node or connector forward within the given layer.\
     * @param {Node | Connector} node - The node or connector to be moved forward within the layer.
     * @param {LayerModel} currentLayer - representing the layer in which the node or connector should be moved.
     *
     */
    Diagram.prototype.moveObjectsUp = function (node, currentLayer) {
        var targetLayer;
        for (var i = this.layers.length - 1; i >= 0; i--) {
            targetLayer = this.layers[parseInt(i.toString(), 10)];
            if (currentLayer.id !== targetLayer.id) {
                // eslint-disable-next-line max-len
                var targetObject = this.commandHandler.getLayer(this.layerZIndexTable[targetLayer.zIndex]).objects[targetLayer.objects.length - 1];
                if (targetObject) {
                    this.commandHandler.moveSvgNode(node.id, targetObject);
                    this.commandHandler.moveSvgNode(targetObject, node.id);
                    break;
                }
            }
        }
    };
    /**
     * Inserts a newly added element into the database. \
     *
     * @returns { void }  Inserts a newly added element into the database.\
     * @param {Node | Connector} node - The node or connector to be inserted into the database.
     *
     */
    Diagram.prototype.insertData = function (node) {
        return this.crudOperation(node, 'create', this.getNewUpdateNodes('New'));
    };
    /**
     * Updates user-defined element properties in the existing database. \
     *
     * @returns { void }     Updates user-defined element properties in the existing database.\
     * @param {Node | Connector} node - The source value representing the element to update.
     *
     */
    Diagram.prototype.updateData = function (node) {
        return this.crudOperation(node, 'update', this.getNewUpdateNodes('Update'));
    };
    /**
     * Removes the user-deleted element from the existing database.\
     *
     * @returns { void }     Removes the user-deleted element from the existing database.\
     * @param {Node | Connector} node - The node or connector to be removed from the database.
     *
     */
    Diagram.prototype.removeData = function (node) {
        return this.crudOperation(node, 'destroy', this.getDeletedNodes());
    };
    Diagram.prototype.crudOperation = function (node, crud, getNodesCollection) {
        if (node) {
            var data = this.parameterMap(node, node instanceof Connector ? false : true);
            if (data) {
                // eslint-disable-next-line max-len
                var url = node instanceof Connector ? this.dataSourceSettings.connectionDataSource.crudAction["" + crud] : this.dataSourceSettings.crudAction["" + crud];
                this.raiseAjaxPost(JSON.stringify(data), url);
            }
            return data;
        }
        else {
            var newObjects = getNodesCollection;
            // eslint-disable-next-line max-len
            this.processCrudCollection(newObjects, this.dataSourceSettings.crudAction["" + crud], this.dataSourceSettings.connectionDataSource.crudAction["" + crud]);
            return newObjects;
        }
    };
    Diagram.prototype.processCrudCollection = function (newObjects, nodeCrudAction, connectorCrudAction) {
        if (newObjects.nodes) {
            var data = [];
            var i = void 0;
            for (i = 0; i < newObjects.nodes.length; i++) {
                data.push(this.parameterMap(newObjects.nodes[parseInt(i.toString(), 10)], true));
            }
            if (data && data.length > 0) {
                this.raiseAjaxPost(JSON.stringify(data), nodeCrudAction);
            }
        }
        if (newObjects.connectors) {
            var data = [];
            var i = void 0;
            for (i = 0; i < newObjects.connectors.length; i++) {
                data.push(this.parameterMap(newObjects.connectors[parseInt(i.toString(), 10)], false));
            }
            if (data && data.length > 0) {
                this.raiseAjaxPost(JSON.stringify(data), connectorCrudAction);
            }
        }
    };
    Diagram.prototype.parameterMap = function (object, isNode) {
        var mappingObj = {};
        var i;
        var fields = isNode ? this.dataSourceSettings : this.dataSourceSettings.connectionDataSource;
        if (fields.id) {
            mappingObj[fields.id] = object.id;
        }
        if (fields.sourcePointX && fields.sourcePointY) {
            mappingObj[fields.sourcePointX] = object.sourcePoint.x;
            mappingObj[fields.sourcePointY] = object.sourcePoint.y;
        }
        if (fields.targetPointX && fields.targetPointY) {
            mappingObj[fields.targetPointX] = object.targetPoint.x;
            mappingObj[fields.targetPointY] = object.targetPoint.y;
        }
        if (fields.sourceID) {
            mappingObj[fields.sourceID] = object.sourceID;
        }
        if (fields.targetID) {
            mappingObj[fields.targetID] = object.targetID;
        }
        if (fields.crudAction && fields.crudAction.customFields && fields.crudAction.customFields.length > 0) {
            for (i = 0; i < fields.crudAction.customFields.length; i++) {
                mappingObj[fields.crudAction.customFields[parseInt(i.toString(), 10)]]
                    = object[fields.crudAction.customFields[parseInt(i.toString(), 10)]];
            }
        }
        return mappingObj;
    };
    Diagram.prototype.getNewUpdateNodes = function (status) {
        var nodes = [];
        var connectors = [];
        // eslint-disable-next-line guard-for-in
        for (var name_1 in this.nameTable) {
            var node = this.nameTable["" + name_1];
            if (node.status === status) {
                if (node && node instanceof Connector) {
                    node.status = 'None';
                    connectors.push(node);
                }
                else {
                    node.status = 'None';
                    nodes.push(node);
                }
            }
        }
        return { nodes: nodes, connectors: connectors };
    };
    Diagram.prototype.getDeletedNodes = function () {
        var nodes = [];
        var connectors = [];
        var i;
        for (i = 0; i < this.crudDeleteNodes.length; i++) {
            var node = this.crudDeleteNodes[parseInt(i.toString(), 10)];
            if (node && node.segments) {
                connectors.push(node);
            }
            else if (node) {
                nodes.push(node);
            }
        }
        this.crudDeleteNodes = [];
        return { nodes: nodes, connectors: connectors };
    };
    Diagram.prototype.raiseAjaxPost = function (value, url) {
        var callback = new Fetch(url, 'POST', 'application/json');
        var data = JSON.stringify(JSON.parse(value));
        callback.send(data).then();
        /* eslint-disable */
        callback.onSuccess = function (data) {
        };
        /* eslint-enable */
    };
    Diagram.prototype.getHiddenItems = function (args) {
        var hiddenItems = [];
        if (this.contextMenuModule) {
            this.contextMenuModule.hiddenItems = [];
            for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.contextMenuModule.ensureItems(item, args.event);
                if (item.items && item.items.length) {
                    for (var _b = 0, _c = item.items; _b < _c.length; _b++) {
                        var newItem = _c[_b];
                        this.contextMenuModule.ensureItems(newItem, args.event);
                    }
                }
            }
            return this.contextMenuModule.hiddenItems;
        }
        return hiddenItems;
    };
    __decorate([
        Property('100%')
    ], Diagram.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], Diagram.prototype, "enableConnectorSplit", void 0);
    __decorate([
        Property('SVG')
    ], Diagram.prototype, "mode", void 0);
    __decorate([
        Property('100%')
    ], Diagram.prototype, "height", void 0);
    __decorate([
        Property('Circle')
    ], Diagram.prototype, "segmentThumbShape", void 0);
    __decorate([
        Property(10)
    ], Diagram.prototype, "segmentThumbSize", void 0);
    __decorate([
        Complex({}, ContextMenuSettings)
    ], Diagram.prototype, "contextMenuSettings", void 0);
    __decorate([
        Property(DiagramConstraints.Default)
    ], Diagram.prototype, "constraints", void 0);
    __decorate([
        Property(DiagramTools.Default)
    ], Diagram.prototype, "tool", void 0);
    __decorate([
        Property('Top')
    ], Diagram.prototype, "bridgeDirection", void 0);
    __decorate([
        Property('transparent')
    ], Diagram.prototype, "backgroundColor", void 0);
    __decorate([
        Complex({}, SnapSettings)
    ], Diagram.prototype, "snapSettings", void 0);
    __decorate([
        Complex({}, RulerSettings)
    ], Diagram.prototype, "rulerSettings", void 0);
    __decorate([
        Complex({}, PageSettings)
    ], Diagram.prototype, "pageSettings", void 0);
    __decorate([
        Complex({}, SerializationSettings)
    ], Diagram.prototype, "serializationSettings", void 0);
    __decorate([
        Collection([], Node)
    ], Diagram.prototype, "nodes", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "drawingObject", void 0);
    __decorate([
        Collection([], Connector)
    ], Diagram.prototype, "connectors", void 0);
    __decorate([
        Property([])
    ], Diagram.prototype, "basicElements", void 0);
    __decorate([
        Complex({}, DiagramTooltip)
    ], Diagram.prototype, "tooltip", void 0);
    __decorate([
        Complex({}, DataSource)
    ], Diagram.prototype, "dataSourceSettings", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "addInfo", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "historyManager", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "nodeTemplate", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "annotationTemplate", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "userHandleTemplate", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "fixedUserHandleTemplate", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "getNodeDefaults", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "nodeDefaults", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "getConnectorDefaults", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "connectorDefaults", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "setNodeTemplate", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "getDescription", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "getCustomProperty", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "getCustomTool", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "getCustomCursor", void 0);
    __decorate([
        Collection([], CustomCursorAction)
    ], Diagram.prototype, "customCursor", void 0);
    __decorate([
        Property()
    ], Diagram.prototype, "updateSelection", void 0);
    __decorate([
        Complex({}, DiagramSettings)
    ], Diagram.prototype, "diagramSettings", void 0);
    __decorate([
        Complex({}, Selector)
    ], Diagram.prototype, "selectedItems", void 0);
    __decorate([
        Complex({}, ScrollSettings)
    ], Diagram.prototype, "scrollSettings", void 0);
    __decorate([
        Complex({}, Layout)
    ], Diagram.prototype, "layout", void 0);
    __decorate([
        Complex({}, CommandManager)
    ], Diagram.prototype, "commandManager", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "dataLoaded", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "dragEnter", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "dragLeave", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "dragOver", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "click", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "historyChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "historyStateChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "doubleClick", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "textEdit", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "scrollChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "mouseWheel", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "selectionChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "sizeChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "connectionChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "sourcePointChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "targetPointChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "propertyChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "positionChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "keyUp", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "keyDown", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "rotateChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "collectionChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "fixedUserHandleClick", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onUserHandleMouseDown", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onUserHandleMouseUp", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onUserHandleMouseEnter", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onUserHandleMouseLeave", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onFixedUserHandleMouseDown", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onFixedUserHandleMouseUp", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onFixedUserHandleMouseEnter", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onFixedUserHandleMouseLeave", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "segmentCollectionChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "onImageLoad", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "expandStateChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "load", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "created", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "mouseEnter", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "mouseLeave", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "mouseOver", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "elementDraw", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "contextMenuBeforeItemRender", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "commandExecute", void 0);
    __decorate([
        Collection([], Layer)
    ], Diagram.prototype, "layers", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "drop", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "segmentChange", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Diagram.prototype, "layoutUpdated", void 0);
    return Diagram;
}(Component));
export { Diagram };
