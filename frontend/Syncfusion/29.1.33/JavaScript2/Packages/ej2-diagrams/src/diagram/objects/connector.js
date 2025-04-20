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
import { Property, Complex, Collection, ChildProperty, ComplexFactory, CollectionFactory, compile as baseTemplateCompiler } from '@syncfusion/ej2-base';
import { ShapeStyle, StrokeStyle } from '../core/appearance';
import { Point } from '../primitives/point';
import { TextElement } from '../core/elements/text-element';
import { Transform, ConnectorConstraints, ControlPointsVisibility, PortVisibility, ElementAction } from '../enum/enum';
import { PortConstraints, BezierSmoothness } from '../enum/enum';
import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
import { findAngle, findConnectorPoints, getOuterBounds } from '../utility/connector';
import { getAnnotationPosition, alignLabelOnSegments, updateConnector, checkPortRestriction, updatePortEdges, getPortsPosition, getPathOffset } from '../utility/diagram-util';
import { setUMLActivityDefaults, initFixedUserHandlesSymbol } from '../utility/diagram-util';
import { findDistance, findPath, updatePathElement, setConnectorDefaults } from '../utility/diagram-util';
import { randomId, getFunction } from './../utility/base-util';
import { flipConnector } from './../utility/diagram-util';
import { PathElement } from '../core/elements/path-element';
import { PathAnnotation } from './annotation';
import { Canvas } from '../core/containers/canvas';
import { getDecoratorShape, getPortShape } from './dictionary/common';
import { DiagramAction } from '../enum/enum';
import { NodeBase } from './node-base';
import { DiagramTooltip } from './tooltip';
import { identityMatrix, rotateMatrix, scaleMatrix, transformPointsByMatrix, transformPointByMatrix } from '../primitives/matrix';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { getTemplateContent, getContent } from '../utility/dom-util';
import { SymbolSize } from './preview';
import { ConnectorFixedUserHandle } from './fixed-user-handle';
import { ResizeTool } from '../interaction/tool';
import { PathPort } from './port';
var getConnectorType = function (obj) {
    //Removed isBlazor code
    if (obj) {
        switch (obj.type) {
            case 'Bpmn':
                return BpmnFlow;
            case 'UmlActivity':
                return ActivityFlow;
            case 'UmlClassifier':
                return RelationShip;
            default:
                return ConnectorShape;
        }
    }
    return ConnectorShape;
};
var getSegmentType = function (obj) {
    if (obj) {
        //Removed isBlazor code
        switch (obj.type) {
            case 'Straight':
                return StraightSegment;
            case 'Bezier':
                return BezierSegment;
            case 'Orthogonal':
                return OrthogonalSegment;
            default:
                return StraightSegment;
        }
    }
    return undefined;
};
/**
 * Decorators are used to decorate the end points of the connector with some predefined path geometry
 */
var Decorator = /** @class */ (function (_super) {
    __extends(Decorator, _super);
    function Decorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(10)
    ], Decorator.prototype, "width", void 0);
    __decorate([
        Property(10)
    ], Decorator.prototype, "height", void 0);
    __decorate([
        Property('Arrow')
    ], Decorator.prototype, "shape", void 0);
    __decorate([
        Complex({ fill: 'black', strokeColor: 'black', strokeWidth: 1 }, ShapeStyle)
    ], Decorator.prototype, "style", void 0);
    __decorate([
        Complex({ x: 0, y: 0.5 }, Point)
    ], Decorator.prototype, "pivot", void 0);
    __decorate([
        Property('')
    ], Decorator.prototype, "pathData", void 0);
    return Decorator;
}(ChildProperty));
export { Decorator };
/**
 * Describes the length and angle between the control point and the start point of bezier segment
 */
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Vector.prototype, "angle", void 0);
    __decorate([
        Property(0)
    ], Vector.prototype, "distance", void 0);
    return Vector;
}(ChildProperty));
export { Vector };
/**
 * Describes the length and angle between the control point and the start point of bezier segment
 */
var BezierSettings = /** @class */ (function (_super) {
    __extends(BezierSettings, _super);
    function BezierSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(ControlPointsVisibility.All)
    ], BezierSettings.prototype, "controlPointsVisibility", void 0);
    __decorate([
        Property('FreeForm')
    ], BezierSettings.prototype, "segmentEditOrientation", void 0);
    __decorate([
        Property(BezierSmoothness.Default)
    ], BezierSettings.prototype, "smoothness", void 0);
    __decorate([
        Property(true)
    ], BezierSettings.prototype, "allowSegmentsReset", void 0);
    return BezierSettings;
}(ChildProperty));
export { BezierSettings };
/**
 * Sets the type of the connector
 */
var ConnectorShape = /** @class */ (function (_super) {
    __extends(ConnectorShape, _super);
    function ConnectorShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('None')
    ], ConnectorShape.prototype, "type", void 0);
    return ConnectorShape;
}(ChildProperty));
export { ConnectorShape };
/**
 * Sets the type of the flow in a BPMN Process
 */
var ActivityFlow = /** @class */ (function (_super) {
    __extends(ActivityFlow, _super);
    function ActivityFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Object')
    ], ActivityFlow.prototype, "flow", void 0);
    __decorate([
        Property(30)
    ], ActivityFlow.prototype, "exceptionFlowHeight", void 0);
    return ActivityFlow;
}(ConnectorShape));
export { ActivityFlow };
/**
 * Sets the type of the flow in a BPMN Process
 */
var BpmnFlow = /** @class */ (function (_super) {
    __extends(BpmnFlow, _super);
    function BpmnFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Sequence')
    ], BpmnFlow.prototype, "flow", void 0);
    __decorate([
        Property('Normal')
    ], BpmnFlow.prototype, "sequence", void 0);
    __decorate([
        Property('Default')
    ], BpmnFlow.prototype, "message", void 0);
    __decorate([
        Property('Default')
    ], BpmnFlow.prototype, "association", void 0);
    return BpmnFlow;
}(ConnectorShape));
export { BpmnFlow };
/**
 * Defines the behavior of connector segments
 */
var ConnectorSegment = /** @class */ (function (_super) {
    __extends(ConnectorSegment, _super);
    // tslint:disable-next-line:no-any
    function ConnectorSegment(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        _this.points = [];
        return _this;
    }
    __decorate([
        Property('Straight')
    ], ConnectorSegment.prototype, "type", void 0);
    __decorate([
        Property(true)
    ], ConnectorSegment.prototype, "allowDrag", void 0);
    return ConnectorSegment;
}(ChildProperty));
export { ConnectorSegment };
/**
 * Defines the behavior of straight segments
 */
var StraightSegment = /** @class */ (function (_super) {
    __extends(StraightSegment, _super);
    function StraightSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the name of class StraightSegment
     *
     * @private
     */
    StraightSegment.prototype.getClassName = function () {
        return 'StraightSegment';
    };
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], StraightSegment.prototype, "point", void 0);
    return StraightSegment;
}(ConnectorSegment));
export { StraightSegment };
/**
 * Defines the behavior of bezier segments
 */
var BezierSegment = /** @class */ (function (_super) {
    __extends(BezierSegment, _super);
    function BezierSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BezierSegment
     */
    BezierSegment.prototype.getClassName = function () {
        return 'BezierSegment';
    };
    /**
     * @private
     * Returns the total points of the bezier curve
     */
    BezierSegment.prototype.getPoints = function (segments, start) {
        var points = [];
        if (points.length > 0 || start != null) {
            var st = points.length > 0 ? points[points.length - 1] : start;
            var bezier = this.bezireToPoly(st, segments);
            // 878719: Resolve ESLint errors
            // eslint-disable-next-line prefer-spread
            points.push.apply(points, bezier);
        }
        return points;
    };
    /**
     * @private
     * Returns the total points of the bezier curve
     */
    BezierSegment.prototype.bezireToPoly = function (start, segment) {
        var points = [];
        if (segment) {
            var bezSeg = segment;
            var pt0 = start;
            var pt1 = bezSeg.bezierPoint1;
            var pt2 = bezSeg.bezierPoint2;
            var pt3 = { x: bezSeg.points[1].x, y: bezSeg.points[1].y };
            this.flattenCubicBezier(points, pt0, pt1, pt2, pt3, 10);
        }
        return points;
    };
    /**
     * @private
     * Returns the total points of the bezier curve
     */
    BezierSegment.prototype.flattenCubicBezier = function (points, ptStart, ptCtrl1, ptCtrl2, ptEnd, tolerance) {
        var max = ((Point.findLength(ptStart, ptCtrl1) + Point.findLength(ptCtrl1, ptCtrl2)
            + Point.findLength(ptCtrl2, ptEnd)) / tolerance);
        var i;
        for (i = 0; i <= max; i++) {
            var t = i / max;
            var x = (1 - t) * (1 - t) * (1 - t) * ptStart.x +
                3 * t * (1 - t) * (1 - t) * ptCtrl1.x +
                3 * t * t * (1 - t) * ptCtrl2.x +
                t * t * t * ptEnd.x;
            var y = (1 - t) * (1 - t) * (1 - t) * ptStart.y +
                3 * t * (1 - t) * (1 - t) * ptCtrl1.y +
                3 * t * t * (1 - t) * ptCtrl2.y +
                t * t * t * ptEnd.y;
            points.push({ x: x, y: y });
        }
    };
    __decorate([
        Property('Horizontal')
    ], BezierSegment.prototype, "orientation", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], BezierSegment.prototype, "point1", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], BezierSegment.prototype, "point2", void 0);
    __decorate([
        Complex({ angle: 0, distance: 0 }, Vector)
    ], BezierSegment.prototype, "vector1", void 0);
    __decorate([
        Complex({ angle: 0, distance: 0 }, Vector)
    ], BezierSegment.prototype, "vector2", void 0);
    return BezierSegment;
}(StraightSegment));
export { BezierSegment };
/**
 * Defines the behavior of orthogonal segments
 */
var OrthogonalSegment = /** @class */ (function (_super) {
    __extends(OrthogonalSegment, _super);
    function OrthogonalSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the module of class OrthogonalSegment
     *
     * @private
     */
    OrthogonalSegment.prototype.getClassName = function () {
        return 'OrthogonalSegment';
    };
    __decorate([
        Property(null)
    ], OrthogonalSegment.prototype, "length", void 0);
    __decorate([
        Property(null)
    ], OrthogonalSegment.prototype, "direction", void 0);
    return OrthogonalSegment;
}(ConnectorSegment));
export { OrthogonalSegment };
/**
 * Defines the behavior of orthogonal segments
 */
var DiagramConnectorSegment = /** @class */ (function (_super) {
    __extends(DiagramConnectorSegment, _super);
    function DiagramConnectorSegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the module of class OrthogonalSegment
     */
    DiagramConnectorSegment.prototype.getClassName = function () {
        return 'DiagramConnectorSegment';
    };
    __decorate([
        Property('Straight')
    ], DiagramConnectorSegment.prototype, "type", void 0);
    __decorate([
        Property(true)
    ], DiagramConnectorSegment.prototype, "allowDrag", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], DiagramConnectorSegment.prototype, "point", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], DiagramConnectorSegment.prototype, "point1", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], DiagramConnectorSegment.prototype, "point2", void 0);
    __decorate([
        Complex({ angle: 0, distance: 0 }, Vector)
    ], DiagramConnectorSegment.prototype, "vector1", void 0);
    __decorate([
        Complex({ angle: 0, distance: 0 }, Vector)
    ], DiagramConnectorSegment.prototype, "vector2", void 0);
    __decorate([
        Property(null)
    ], DiagramConnectorSegment.prototype, "length", void 0);
    __decorate([
        Property(null)
    ], DiagramConnectorSegment.prototype, "direction", void 0);
    return DiagramConnectorSegment;
}(ChildProperty));
export { DiagramConnectorSegment };
/**
 * Get the direction of the control points while the bezier is connected to the node
 */
export function getDirection(bounds, points, excludeBounds) {
    var center = bounds.center;
    var direction;
    var part = excludeBounds ? 45 : (180 / (2 + 2 / (bounds.height / bounds.width)));
    var fourty5 = part;
    var one35 = (180 - part);
    var two25 = one35 + (2 * part);
    var three15 = 360 - part;
    var angle = findAngle(points, center);
    if (angle > fourty5 && angle < one35) {
        return direction = 'top';
    }
    else if (angle > one35 && angle < two25) {
        return direction = 'right';
    }
    else if (angle > two25 && angle < three15) {
        return direction = 'bottom';
    }
    else {
        return direction = 'left';
    }
}
export function isEmptyVector(element) {
    if (!element.distance && !element.angle) {
        return true;
    }
    return false;
}
/**
 * Get the bezier points if control points are not given.
 */
export function getBezierPoints(sourcePoint, targetPoint, direction) {
    var distance = 60;
    var value = { x: 0, y: 0 };
    if (!direction) {
        if (Math.abs(targetPoint.x - sourcePoint.x) > Math.abs(targetPoint.y - sourcePoint.y)) {
            direction = sourcePoint.x < targetPoint.x ? 'right' : 'left';
        }
        else {
            direction = sourcePoint.y < targetPoint.y ? 'bottom' : 'top';
        }
    }
    switch (direction) {
        case 'bottom':
        case 'top':
            distance = Math.min(Math.abs(sourcePoint.y - targetPoint.y) * 0.45, distance);
            value = { x: sourcePoint.x, y: sourcePoint.y + (direction === 'bottom' ? distance : -distance) };
            break;
        case 'right':
        case 'left':
            distance = Math.min(Math.abs(sourcePoint.x - targetPoint.x) * 0.45, distance);
            value = { x: sourcePoint.x + (direction === 'right' ? distance : -distance), y: sourcePoint.y };
            break;
    }
    return value;
}
/**
 * Get the bezier curve bounds.
 */
export function getBezierBounds(startPoint, controlPoint1, controlPoint2, endPoint, connector) {
    var minx = 0;
    var miny = 0;
    var maxx = 0;
    var maxy = 0;
    var tolerancevalue = 3;
    var max = Number((connector.distance(controlPoint1, startPoint) +
        connector.distance(controlPoint2, controlPoint1) +
        connector.distance(endPoint, controlPoint2)) / tolerancevalue);
    if (max !== 0) {
        for (var i = 0; i <= max; i++) {
            var t = i / max;
            var x = (1 - t) * (1 - t) * (1 - t) * startPoint.x +
                3 * t * (1 - t) * (1 - t) * controlPoint1.x +
                3 * t * t * (1 - t) * controlPoint2.x +
                t * t * t * endPoint.x;
            var y = (1 - t) * (1 - t) * (1 - t) * startPoint.y +
                3 * t * (1 - t) * (1 - t) * controlPoint1.y +
                3 * t * t * (1 - t) * controlPoint2.y +
                t * t * t * endPoint.y;
            if (i === 0) {
                minx = maxx = x;
                miny = maxy = y;
            }
            else {
                minx = Math.min(x, minx);
                miny = Math.min(y, miny);
                maxx = Math.max(x, maxx);
                maxy = Math.max(y, maxy);
            }
        }
    }
    return {
        x: minx, y: miny, width: maxx - minx, height: maxy - miny,
        left: minx, top: miny, right: (minx + (maxx - minx)), bottom: (miny + (maxy - miny)),
        center: { x: (minx + (maxx - minx)) / 2, y: (miny + (maxy - miny)) / 2 }
    };
}
/**
 * Get the intermediate bezier curve for point over connector
 */
export function bezierPoints(connector, startPoint, point1, point2, endPoint, i, max) {
    var pt = { x: 0, y: 0 };
    var t = i / max;
    var x = (1 - t) * (1 - t) * (1 - t) * startPoint.x +
        3 * t * (1 - t) * (1 - t) * point1.x +
        3 * t * t * (1 - t) * point2.x +
        t * t * t * endPoint.x;
    pt.x = x;
    var y = (1 - t) * (1 - t) * (1 - t) * startPoint.y +
        3 * t * (1 - t) * (1 - t) * point1.y +
        3 * t * t * (1 - t) * point2.y +
        t * t * t * endPoint.y;
    pt.y = y;
    return pt;
}
/**
 * Defines the behavior of the UMLActivity Classifier multiplicity connection defaults
 */
var MultiplicityLabel = /** @class */ (function (_super) {
    __extends(MultiplicityLabel, _super);
    function MultiplicityLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], MultiplicityLabel.prototype, "optional", void 0);
    __decorate([
        Property(undefined)
    ], MultiplicityLabel.prototype, "lowerBounds", void 0);
    __decorate([
        Property(undefined)
    ], MultiplicityLabel.prototype, "upperBounds", void 0);
    return MultiplicityLabel;
}(ChildProperty));
export { MultiplicityLabel };
/**
 * Defines the behavior of the UMLActivity Classifier multiplicity connection defaults
 */
var ClassifierMultiplicity = /** @class */ (function (_super) {
    __extends(ClassifierMultiplicity, _super);
    function ClassifierMultiplicity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('OneToOne')
    ], ClassifierMultiplicity.prototype, "type", void 0);
    __decorate([
        Complex({}, MultiplicityLabel)
    ], ClassifierMultiplicity.prototype, "target", void 0);
    __decorate([
        Complex({}, MultiplicityLabel)
    ], ClassifierMultiplicity.prototype, "source", void 0);
    return ClassifierMultiplicity;
}(ChildProperty));
export { ClassifierMultiplicity };
/**
 * Defines the behavior of the UMLActivity shape
 */
var RelationShip = /** @class */ (function (_super) {
    __extends(RelationShip, _super);
    function RelationShip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('UmlClassifier')
    ], RelationShip.prototype, "type", void 0);
    __decorate([
        Property('Aggregation')
    ], RelationShip.prototype, "relationship", void 0);
    __decorate([
        Property('Directional')
    ], RelationShip.prototype, "associationType", void 0);
    __decorate([
        Complex({}, ClassifierMultiplicity)
    ], RelationShip.prototype, "multiplicity", void 0);
    return RelationShip;
}(ConnectorShape));
export { RelationShip };
/**
 * Connector shape for blazor
 */
var DiagramConnectorShape = /** @class */ (function (_super) {
    __extends(DiagramConnectorShape, _super);
    function DiagramConnectorShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('None')
    ], DiagramConnectorShape.prototype, "type", void 0);
    __decorate([
        Property('Directional')
    ], DiagramConnectorShape.prototype, "associationType", void 0);
    __decorate([
        Property('Aggregation')
    ], DiagramConnectorShape.prototype, "relationship", void 0);
    __decorate([
        Complex({}, ClassifierMultiplicity)
    ], DiagramConnectorShape.prototype, "multiplicity", void 0);
    __decorate([
        Property('Sequence')
    ], DiagramConnectorShape.prototype, "bpmnFlow", void 0);
    __decorate([
        Property('Default')
    ], DiagramConnectorShape.prototype, "message", void 0);
    __decorate([
        Property('Normal')
    ], DiagramConnectorShape.prototype, "sequence", void 0);
    __decorate([
        Property('Default')
    ], DiagramConnectorShape.prototype, "association", void 0);
    __decorate([
        Property('Object')
    ], DiagramConnectorShape.prototype, "umlActivityFlow", void 0);
    __decorate([
        Property(30)
    ], DiagramConnectorShape.prototype, "exceptionFlowHeight", void 0);
    return DiagramConnectorShape;
}(ChildProperty));
export { DiagramConnectorShape };
/**
 * Connectors are used to create links between nodes
 */
var Connector = /** @class */ (function (_super) {
    __extends(Connector, _super);
    // tslint:disable-next-line:no-any
    function Connector(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        /** @private */
        _this.parentId = '';
        /** @private */
        _this.bridges = [];
        /** @private */
        _this.status = 'None';
        /** @private */
        _this.outEdges = [];
        /** @private */
        _this.inEdges = [];
        if (_this.shape && _this.shape.type === 'UmlActivity') {
            setUMLActivityDefaults(defaultValue, _this);
        }
        if (defaultValue && defaultValue.shape && defaultValue.shape.type !== 'None') {
            setConnectorDefaults(defaultValue, _this);
        }
        return _this;
    }
    /* tslint:disable */
    Connector.prototype.setPortID = function (diagram, isTarget) {
        if (this.targetID && this.sourceID) {
            var targetNode = diagram.nameTable[this.targetID];
            var sourceNode = diagram.nameTable[this.sourceID];
            var ports = isTarget ? (targetNode && targetNode.ports) : (sourceNode && sourceNode.ports);
            var port = void 0;
            for (var i = 0; ports && i < ports.length; i++) {
                port = ports[parseInt(i.toString(), 10)];
                if (this.targetPortID === port.id && isTarget) {
                    if ((port.constraints & PortConstraints.None) || !(port.constraints & PortConstraints.InConnect)) {
                        this.targetPortID = '';
                    }
                }
                else if (this.sourcePortID === port.id && !isTarget) {
                    if ((port.constraints & PortConstraints.None) || !(port.constraints & PortConstraints.OutConnect)) {
                        this.sourcePortID = '';
                    }
                }
            }
        }
    };
    /* tslint:enable */
    /** @private */
    // tslint:disable-next-line:no-any
    Connector.prototype.init = function (diagram) {
        if (!this.id) {
            this.id = randomId();
        }
        if (this.sourcePortID) {
            this.setPortID(diagram);
        }
        if (this.targetPortID) {
            this.setPortID(diagram, true);
        }
        var bpmnElement;
        var container = new Canvas();
        var segment = new PathElement();
        segment.id = this.id + '_path';
        var srcDecorator = new PathElement();
        var targetDecorator = new PathElement();
        segment = this.getSegmentElement(this, segment);
        //let bounds: Rect;
        var points = [];
        points = this.type === 'Bezier' ? this.intermediatePoints : this.getConnectorPoints(this.type);
        points = this.clipDecorators(this, points);
        var bounds = Rect.toBounds(points);
        container.width = bounds.width;
        container.height = bounds.height;
        container.offsetX = bounds.x + container.pivot.x * bounds.width;
        container.offsetY = bounds.y + container.pivot.y * bounds.height;
        switch (this.shape.type) {
            case 'Bpmn':
                // eslint-disable-next-line no-case-declarations
                var flow = this.shape.flow;
                switch (flow) {
                    case 'Sequence':
                        bpmnElement = this.getBpmnSequenceFlow();
                        break;
                    case 'Association':
                        bpmnElement = new PathElement();
                        bpmnElement.visible = false;
                        this.getBpmnAssociationFlow();
                        break;
                    case 'Message':
                        bpmnElement = this.getBpmnMessageFlow();
                        segment = this.getSegmentElement(this, segment);
                        this.updateShapePosition(this, bpmnElement);
                        break;
                }
                break;
            case 'UmlActivity':
                // eslint-disable-next-line no-case-declarations
                var activityFlow = this.shape.flow;
                switch (activityFlow) {
                    case 'Object':
                        this.getUMLObjectFlow();
                        break;
                    case 'Exception':
                        this.getUMLExceptionFlow(segment);
                        break;
                }
                break;
            case 'UmlClassifier':
                this.getConnectorRelation();
                break;
        }
        var anglePoints = this.intermediatePoints;
        if (this.type === 'Bezier') {
            var firstSegment = this.segments[0];
            var lastSegment = this.segments[this.segments.length - 1];
            anglePoints = [!Point.isEmptyPoint(lastSegment.point2) ? lastSegment.point2 : lastSegment.bezierPoint2,
                !Point.isEmptyPoint(firstSegment.point1) ? firstSegment.point1 : firstSegment.bezierPoint1];
        }
        var accessContent = 'getDescription';
        var getDescription = diagram["" + accessContent];
        //const strokeWidth: number = this.sourceWrapper ? this.sourceWrapper.style.strokeWidth / 2 / 2 : 0;
        srcDecorator = this.getDecoratorElement(points[0], anglePoints[1], this.sourceDecorator, true, getDescription);
        targetDecorator = this.getDecoratorElement(points[points.length - 1], anglePoints[anglePoints.length - 2], this.targetDecorator, false, getDescription);
        srcDecorator.id = this.id + '_srcDec';
        targetDecorator.id = this.id + '_tarDec';
        segment.style = this.style;
        /* tslint:disable:no-string-literal */
        segment.style['fill'] = 'transparent';
        if (getDescription !== undefined) {
            // tslint:disable-next-line:no-any
            var wrapperContent = getDescription(this, diagram);
            segment.description = wrapperContent ? wrapperContent : this.id;
        }
        container.style.strokeColor = 'transparent';
        container.style.fill = 'transparent';
        container.style.strokeWidth = 0;
        container.children = [segment, srcDecorator, targetDecorator];
        container.id = this.id;
        if (bpmnElement !== undefined) {
            container.children.push(bpmnElement);
        }
        container.offsetX = segment.offsetX;
        container.offsetY = segment.offsetY;
        container.width = segment.width;
        container.height = segment.height;
        for (var i = 0; this.annotations !== undefined, i < this.annotations.length; i++) {
            container.children.push(this.getAnnotationElement(this.annotations[parseInt(i.toString(), 10)], this.intermediatePoints, bounds, getDescription, diagram.element.id, diagram.annotationTemplate));
        }
        for (var i = 0; this.fixedUserHandles !== undefined, i < this.fixedUserHandles.length; i++) {
            container.children.push(this.getFixedUserHandle(this.fixedUserHandles[parseInt(i.toString(), 10)], this.intermediatePoints, bounds, diagram.fixedUserHandleTemplate, diagram.element.id));
        }
        // Feature 826644: Support to add ports to the connector.
        this.initPorts(getDescription, container, bounds);
        this.wrapper = container;
        return container;
    };
    /** @private */
    Connector.prototype.initPorts = function (accessibilityContent, container, bounds) {
        for (var i = 0; this.ports !== undefined, i < this.ports.length; i++) {
            container.children.push(this.initPort(this.ports[parseInt(i.toString(), 10)], this.intermediatePoints, bounds, accessibilityContent));
        }
    };
    // Feature 826644: Support to add ports to the connector. Added below method to init the connector port.
    /** @private */
    Connector.prototype.initPort = function (ports, points, bounds, accessibilityContent) {
        var portWrapper = new PathElement();
        portWrapper.height = ports.height;
        portWrapper.width = ports.width;
        portWrapper.margin = ports.margin;
        ports.shape = ports.shape || 'Square';
        var pathdata = (ports.shape === 'Custom') ? ports.pathData : getPortShape(ports.shape);
        portWrapper.data = pathdata;
        portWrapper.horizontalAlignment = ports.horizontalAlignment;
        portWrapper.verticalAlignment = ports.verticalAlignment;
        // eslint-disable-next-line prefer-const
        portWrapper = this.initPortWrapper(ports, points, bounds, portWrapper, this);
        // tslint:disable-next-line:no-any
        var wrapperContent;
        var contentAccessibility = getFunction(accessibilityContent);
        if (contentAccessibility) {
            wrapperContent = contentAccessibility(portWrapper, this);
        }
        portWrapper.description = wrapperContent ? wrapperContent : portWrapper.id;
        portWrapper.elementActions = portWrapper.elementActions | ElementAction.ElementIsPort;
        portWrapper.isPathPort = true;
        return portWrapper;
    };
    // Feature 826644: Support to add ports to the connector. Added below method to init the connector portwrapper.
    /** @private */
    Connector.prototype.initPortWrapper = function (ports, points, bounds, portContent, Connector) {
        ports.id = ports.id || randomId();
        // Creates port element
        var pivotPoint = { x: 0, y: 0 };
        var getPointloop = getPortsPosition(points, ports, bounds);
        var newPoint = getPointloop.point;
        portContent.id = this.id + '_' + (ports.id);
        var style = ports.style;
        portContent.style = {
            fill: style.fill, strokeColor: style.strokeColor, gradient: null,
            opacity: style.opacity, strokeDashArray: style.strokeDashArray, strokeWidth: style.strokeWidth
        };
        if (bounds.width === 0) {
            bounds.width = this.style.strokeWidth;
        }
        if (bounds.height === 0) {
            bounds.height = this.style.strokeWidth;
        }
        var offsetPoint = { x: ((newPoint.x - bounds.x) / bounds.width), y: ((newPoint.y - bounds.y) / bounds.height) };
        pivotPoint.x = bounds.width * offsetPoint.x;
        pivotPoint.y = bounds.height * offsetPoint.y;
        var align = alignLabelOnSegments(ports, getPointloop.angle, points);
        var hAlign = align.hAlign;
        var vAlign = align.vAlign;
        var horizor;
        var verzor;
        if (hAlign === 'left') {
            horizor = 'Left';
            pivotPoint.x += ports.displacement.x;
        }
        else if (hAlign === 'right') {
            horizor = 'Right';
            pivotPoint.x -= ports.displacement.x;
        }
        else if (hAlign === 'center') {
            horizor = 'Center';
        }
        if (vAlign === 'top') {
            verzor = 'Top';
            pivotPoint.y += ports.displacement.y;
        }
        else if (vAlign === 'bottom') {
            verzor = 'Bottom';
            pivotPoint.y -= ports.displacement.y;
        }
        else if (vAlign === 'center') {
            verzor = 'Center';
        }
        portContent.horizontalAlignment = horizor;
        portContent.verticalAlignment = verzor;
        if (Connector && Connector.flipMode !== 'Label' && Connector.flipMode !== 'None') {
            portContent = updatePortEdges(portContent, this.flip, ports);
        }
        else {
            portContent = updatePortEdges(portContent, 'None', ports);
        }
        portContent.float = true;
        portContent.connectionDirection = ports.connectionDirection;
        portContent.setOffsetWithRespectToBounds(pivotPoint.x, pivotPoint.y, 'Absolute');
        portContent.relativeMode = 'Point';
        portContent.visible = checkPortRestriction(ports, PortVisibility.Visible) &&
            !checkPortRestriction(ports, PortVisibility.Hover) && !checkPortRestriction(ports, PortVisibility.Connect) ? true : false;
        portContent.elementActions = portContent.elementActions | ElementAction.ElementIsPort;
        return portContent;
    };
    Connector.prototype.getConnectorRelation = function () {
        var shape = this.shape;
        if (shape.relationship === 'Association') {
            this.segments[0].type = 'Straight';
            this.sourceDecorator.shape = 'None';
            this.targetDecorator.shape = 'Arrow';
        }
        else if (shape.relationship === 'Inheritance') {
            this.segments[0].type = 'Orthogonal';
            this.sourceDecorator.shape = 'None';
            this.targetDecorator.shape = 'Arrow';
        }
        else if (shape.relationship === 'Composition') {
            this.segments[0].type = 'Orthogonal';
            this.sourceDecorator.shape = 'Diamond';
            this.targetDecorator.shape = 'None';
        }
        else if (shape.relationship === 'Aggregation') {
            this.segments[0].type = 'Orthogonal';
            this.sourceDecorator.shape = 'Diamond';
            this.targetDecorator.shape = 'None';
        }
        else if (shape.relationship === 'Dependency') {
            this.segments[0].type = 'Orthogonal';
            this.sourceDecorator.shape = 'None';
            this.targetDecorator.shape = 'OpenArrow';
        }
        else if (shape.relationship === 'Realization') {
            this.segments[0].type = 'Orthogonal';
            this.sourceDecorator.shape = 'None';
            this.targetDecorator.shape = 'Arrow';
        }
        if (shape.associationType === 'BiDirectional') {
            this.sourceDecorator.shape = 'None';
            this.targetDecorator.shape = 'None';
        }
        var text1 = '';
        //let lower: MultiplicityLabelModel;
        //let upper: MultiplicityLabelModel;
        var sourceText = '';
        var targetText = '';
        var text = '';
        if (shape.multiplicity.source) {
            shape.multiplicity.source.lowerBounds = shape.multiplicity.source.lowerBounds;
            shape.multiplicity.source.upperBounds = shape.multiplicity.source.upperBounds;
        }
        if (shape.multiplicity.target) {
            shape.multiplicity.target.lowerBounds = shape.multiplicity.target.lowerBounds;
            shape.multiplicity.target.upperBounds = shape.multiplicity.target.upperBounds;
        }
        var lower = shape.multiplicity.source;
        var upper = shape.multiplicity.target;
        text = lower.upperBounds ? lower.lowerBounds + '...' + lower.upperBounds : lower.lowerBounds;
        text1 = upper.upperBounds ? upper.lowerBounds + '...' + upper.upperBounds : upper.lowerBounds;
        if (shape.multiplicity.type === 'ManyToOne') {
            shape.multiplicity.target.optional = false;
            sourceText = text ? text : '*';
            targetText = '1';
        }
        if (shape.multiplicity.type === 'OneToMany') {
            shape.multiplicity.source.optional = false;
            targetText = text1 ? text1 : '*';
            sourceText = '1';
        }
        //831806 -Added ManyToMany relationship for UML class connector annotation label
        if (shape.multiplicity.type === 'ManyToMany') {
            sourceText = text ? text : '*';
            targetText = text1 ? text1 : '*';
        }
        if (shape.multiplicity.type === 'OneToOne') {
            shape.multiplicity.target.optional = false;
            shape.multiplicity.source.optional = false;
            sourceText = '1';
            targetText = '1';
        }
        this.annotations = [
            {
                id: this.id + 'sourcelabel', content: sourceText, offset: 0, alignment: 'Before',
                margin: { right: 5, bottom: 5 }
            },
            {
                id: this.id + 'targetlabel', content: targetText, offset: 1, alignment: 'Before',
                margin: { right: 5, bottom: 5 }
            }
        ];
    };
    Connector.prototype.getBpmnSequenceFlow = function () {
        var segment = new PathElement();
        var pathseq = new PathElement();
        var pathseqData;
        if ((this.shape.sequence) === 'Normal' && this.type !== 'Bezier') {
            this.targetDecorator.shape = 'Arrow';
        }
        if ((this.shape.sequence) === 'Default') {
            segment = this.getSegmentElement(this, segment);
            var anglePoints = this.intermediatePoints;
            pathseq = updatePathElement(anglePoints, this);
            this.targetDecorator.shape = 'Arrow';
        }
        if ((this.shape.sequence) === 'Conditional') {
            this.targetDecorator.shape = 'Arrow';
            this.sourceDecorator.shape = 'Diamond';
            pathseq.id = this.id + this.shape.type;
        }
        return pathseq;
    };
    /** @private */
    Connector.prototype.getUMLObjectFlow = function () {
        if (this.annotations) {
            for (var i = 0; i < this.annotations.length; i++) {
                this.annotations[parseInt(i.toString(), 10)].content = '[' + this.annotations[parseInt(i.toString(), 10)].content + ']';
            }
        }
    };
    /** @private */
    Connector.prototype.getUMLExceptionFlow = function (segment) {
        this.type = 'Straight';
        var height = (this.shape.exceptionFlowHeight) / 2;
        var midPt = { x: (this.targetPoint.x + this.sourcePoint.x) / 2, y: (this.targetPoint.y + this.sourcePoint.y) / 2 };
        var xDist = midPt.x - this.sourcePoint.x;
        var yDist = midPt.y - this.sourcePoint.y;
        var dist = Math.sqrt(xDist * xDist + yDist * yDist);
        var fractionOfTotal = (height) / dist;
        var midPt2 = { x: midPt.x - xDist * fractionOfTotal, y: midPt.y - yDist * fractionOfTotal };
        var midPt1 = { x: midPt.x + xDist * fractionOfTotal, y: midPt.y + yDist * fractionOfTotal };
        var matrix = identityMatrix();
        rotateMatrix(matrix, 315, midPt.x, midPt.y);
        this.segments = [];
        var segments = new StraightSegment(this, 'segments', { type: 'Straight', point: transformPointByMatrix(matrix, midPt1) }, true);
        (this.segments).push(segments);
        segments = new StraightSegment(this, 'segments', { type: 'Straight', point: transformPointByMatrix(matrix, midPt2) }, true);
        (this.segments).push(segments);
        segment = this.getSegmentElement(this, segment);
    };
    Connector.prototype.getBpmnAssociationFlow = function () {
        if ((this.shape.association) === 'Default') {
            this.targetDecorator.shape = 'None';
            this.style.strokeDashArray = '2 2';
        }
        if ((this.shape.association) === 'Directional') {
            this.targetDecorator.shape = 'OpenArrow';
            this.style.strokeDashArray = '2 2';
        }
        if ((this.shape.association) === 'BiDirectional') {
            this.targetDecorator.shape = 'OpenArrow';
            this.sourceDecorator.shape = 'OpenArrow';
            this.style.strokeDashArray = '2 2';
        }
    };
    // 882378 - Added below code to provide template support for fixedUserHandles in connectors
    /** @private */
    Connector.prototype.getFixedUserHandle = function (fixedUserHandle, points, bounds, fixedUserHandleTemplate, diagramId) {
        var fixedUserHandleContainer;
        if (fixedUserHandle.pathData === '' && fixedUserHandleTemplate) {
            fixedUserHandleContainer = new DiagramHtmlElement(this.id, diagramId, undefined, fixedUserHandleTemplate);
            fixedUserHandleContainer.isTemplate = true;
            fixedUserHandleContainer.template = getContent(fixedUserHandleContainer, true, fixedUserHandle);
            fixedUserHandle.id = fixedUserHandle.id || randomId();
            fixedUserHandleContainer.id = this.id + '_' + fixedUserHandle.id;
        }
        else {
            fixedUserHandleContainer = new Canvas();
            var children = [];
            fixedUserHandleContainer.children = children;
            fixedUserHandle.id = fixedUserHandle.id || randomId();
            fixedUserHandleContainer.id = this.id + '_' + fixedUserHandle.id;
            var symbolIcon = initFixedUserHandlesSymbol(fixedUserHandle, fixedUserHandleContainer);
            fixedUserHandleContainer.children.push(symbolIcon);
        }
        fixedUserHandleContainer.float = true;
        fixedUserHandleContainer.visible = fixedUserHandle.visibility;
        fixedUserHandleContainer.width = fixedUserHandle.width;
        fixedUserHandleContainer.height = fixedUserHandle.height;
        fixedUserHandleContainer.style.strokeWidth = fixedUserHandle.handleStrokeWidth;
        fixedUserHandleContainer.style.fill = fixedUserHandle.fill;
        fixedUserHandleContainer.style.strokeColor = fixedUserHandle.handleStrokeColor;
        fixedUserHandleContainer.cornerRadius = fixedUserHandle.cornerRadius;
        this.updateAnnotation(fixedUserHandle, points, bounds, fixedUserHandleContainer);
        fixedUserHandleContainer.description = fixedUserHandleContainer.id;
        return fixedUserHandleContainer;
    };
    Connector.prototype.getBpmnMessageFlow = function () {
        var segmentMessage = new PathElement();
        this.targetDecorator.shape = 'Arrow';
        this.targetDecorator.width = 10;
        this.targetDecorator.height = 10;
        this.sourceDecorator.shape = 'Circle';
        this.sourceDecorator.style.fill = 'white';
        this.targetDecorator.style.fill = 'white';
        if (((this.shape.message) === 'InitiatingMessage') ||
            ((this.shape.message) === 'NonInitiatingMessage')) {
            segmentMessage.id = this.id + '_' + (this.shape.message);
            segmentMessage.width = 25;
            segmentMessage.height = 15;
            segmentMessage.data = 'M0,0 L19.8,12.8 L40,0 L0, 0 L0, 25.5 L40, 25.5 L 40, 0';
            segmentMessage.horizontalAlignment = 'Center';
            segmentMessage.verticalAlignment = 'Center';
            segmentMessage.transform = Transform.Self;
            segmentMessage.style.fill = (this.shape.message) === 'NonInitiatingMessage' ? 'lightgrey' : 'white';
        }
        return segmentMessage;
    };
    /** @private */
    Connector.prototype.distance = function (pt1, pt2) {
        return findDistance(pt1, pt2);
    };
    /**   @private  */
    Connector.prototype.findPath = function (sourcePt, targetPt) {
        return findPath(sourcePt, targetPt);
    };
    /** @private */
    Connector.prototype.getAnnotationElement = function (annotation, points, bounds, getDescription, diagramId, annotationTemplate) {
        annotation.content = annotation.content || '';
        annotation.id = annotation.id || randomId();
        var textele;
        //Removed isBlazor code
        if (diagramId && (annotation.template || annotation.annotationType === 'Template'
            || (annotationTemplate && annotation.content === ''))) {
            // Task 834121: Content-Security-Policy support for diagram
            var diagramElement = document.getElementById(diagramId);
            var instance = 'ej2_instances';
            var diagram = diagramElement["" + instance][0];
            textele = new DiagramHtmlElement(this.id, diagramId, annotation.id, annotationTemplate);
            if (annotation.template && typeof annotation.template === 'function' && diagram.isReact) {
                textele.templateFn = baseTemplateCompiler(annotation.template);
                textele.isTemplate = true;
            }
            //908155-Annotation template update wrongly while do interaction for connector
            if (annotation.height === undefined && annotation.annotationType === 'String' && (annotation.template || annotation.content === '')) {
                annotation.height = bounds.height;
            }
            textele = getTemplateContent(textele, annotation, annotationTemplate, diagram);
        }
        else {
            textele = new TextElement();
            //876030 - Adding hyperlink for connectors
            var link = annotation.hyperlink.link ? annotation.hyperlink : undefined;
            textele.style = annotation.style;
            textele.style.color = link ? link.color || textele.hyperlink.color : annotation.style.color;
            textele.hyperlink.link = annotation.hyperlink.link || undefined;
            textele.hyperlink.hyperlinkOpenState = annotation.hyperlink.hyperlinkOpenState || undefined;
            textele.hyperlink.textDecoration = annotation.hyperlink.textDecoration || undefined;
            textele.content = link ? link.content ||
                textele.hyperlink.link : annotation.content;
        }
        textele.constraints = annotation.constraints;
        textele.visible = annotation.visibility;
        textele.annotationVisibility = textele.visible ? 'Visible' : 'Collapsed';
        textele.rotateAngle = annotation.rotateAngle;
        textele.horizontalAlignment = annotation.horizontalAlignment;
        textele.verticalAlignment = annotation.verticalAlignment;
        textele.width = annotation.width;
        textele.height = annotation.height;
        if (bounds.width !== undefined && !annotation.template) {
            textele.width = (annotation.width || bounds.width) - annotation.margin.left - annotation.margin.right;
        }
        textele.margin = annotation.margin;
        textele.id = this.id + '_' + annotation.id;
        if (bounds.width === 0) {
            bounds.width = this.style.strokeWidth;
        }
        if (bounds.height === 0) {
            bounds.height = this.style.strokeWidth;
        }
        // tslint:disable-next-line:no-any
        var wrapperContent;
        var description = getFunction(getDescription);
        if (description) {
            wrapperContent = description(annotation, this);
        }
        textele.description = wrapperContent ? wrapperContent : textele.id;
        this.updateAnnotation(annotation, points, bounds, textele);
        return textele;
    };
    /** @private */
    Connector.prototype.updateAnnotation = function (annotation, points, bounds, textElement, canRefresh) {
        //let getPointloop: SegmentInfo;
        //let align: Alignment; let hAlign: string;
        var pivotPoint = { x: 0, y: 0 };
        //Bug 881512: Wrapping of the connector annotation at run time not working properly.
        //To refresh the annotation at run time while moving connector end points or while moving nodes connected with connector.
        if ((textElement instanceof TextElement) && (!canRefresh)) {
            textElement.refreshTextElement();
        }
        textElement.width = (annotation.width || bounds.width);
        var getPointloop = getAnnotationPosition(points, annotation, bounds);
        var newPoint = getPointloop.point;
        if (annotation instanceof PathAnnotation && annotation.segmentAngle) {
            textElement.rotateAngle = annotation.rotateAngle + getPointloop.angle;
            textElement.rotateAngle = (textElement.rotateAngle + 360) % 360;
        }
        if (bounds.width === 0) {
            bounds.width = this.style.strokeWidth;
        }
        if (bounds.height === 0) {
            bounds.height = this.style.strokeWidth;
        }
        var offsetPoint = { x: ((newPoint.x - bounds.x) / bounds.width), y: ((newPoint.y - bounds.y) / bounds.height) };
        pivotPoint.x = bounds.width * offsetPoint.x;
        pivotPoint.y = bounds.height * offsetPoint.y;
        var align = alignLabelOnSegments(annotation, getPointloop.angle, points);
        var hAlign = align.hAlign;
        var vAlign = align.vAlign;
        var horizor;
        var verzor;
        if (hAlign === 'left') {
            horizor = 'Left';
            pivotPoint.x += annotation.displacement.x;
        }
        else if (hAlign === 'right') {
            horizor = 'Right';
            pivotPoint.x -= annotation.displacement.x;
        }
        else if (hAlign === 'center') {
            horizor = 'Center';
        }
        if (vAlign === 'top') {
            verzor = 'Top';
            pivotPoint.y += annotation.displacement.y;
        }
        else if (vAlign === 'bottom') {
            verzor = 'Bottom';
            pivotPoint.y -= annotation.displacement.y;
        }
        else if (vAlign === 'center') {
            verzor = 'Center';
        }
        textElement.horizontalAlignment = horizor;
        textElement.verticalAlignment = verzor;
        textElement.setOffsetWithRespectToBounds(pivotPoint.x, pivotPoint.y, 'Absolute');
        textElement.relativeMode = 'Point';
    };
    /** @private */
    Connector.prototype.getConnectorPoints = function (type, points, layoutOrientation, lineDistribution) {
        //const width: number = Math.abs(this.sourcePoint.x - this.targetPoint.x);
        //const height: number = Math.abs(this.sourcePoint.y - this.targetPoint.y);
        points = findConnectorPoints(this, layoutOrientation, lineDistribution);
        var newPoints = points.slice(0);
        if (newPoints && newPoints.length > 0) {
            this.sourcePoint = newPoints[0];
            this.targetPoint = newPoints[newPoints.length - 1];
        }
        return newPoints;
    };
    /** @private */
    Connector.prototype.clipDecorator = function (connector, points, isSource, diagramAction) {
        var point = { x: 0, y: 0 };
        var start = { x: 0, y: 0 };
        var end = { x: 0, y: 0 };
        var length = points.length;
        start = !isSource ? points[length - 1] : points[0];
        end = !isSource ? points[length - 2] : points[1];
        var len = Point.distancePoints(start, end);
        len = (len === 0) ? 1 : len;
        var strokeWidth = 1;
        var node = isSource ? connector.sourceWrapper : connector.targetWrapper;
        if (node) {
            strokeWidth = node.style.strokeWidth;
            if (diagramAction && ((diagramAction) & DiagramAction.DecoratorPropertyChange)) {
                strokeWidth = 1;
            }
        }
        var width = strokeWidth - 1;
        point.x = (Math.round(start.x + width * (end.x - start.x) / len));
        point.y = (Math.round(start.y + width * (end.y - start.y) / len));
        if ((isSource && connector.sourceDecorator.shape !== 'None') ||
            (!isSource && connector.targetDecorator.shape !== 'None')) {
            point = Point.adjustPoint(point, end, true, (diagramAction & DiagramAction.DecoratorPropertyChange) ? 0 : (strokeWidth / 2));
        }
        return point;
    };
    /** @private */
    Connector.prototype.clipDecorators = function (connector, pts, diagramAction) {
        if (connector.sourceDecorator.shape !== 'None') {
            pts[0] = this.clipDecorator(connector, pts, true, diagramAction);
        }
        if (connector.targetDecorator.shape !== 'None') {
            pts[pts.length - 1] = this.clipDecorator(connector, pts, false, diagramAction);
        }
        return pts;
    };
    /** @private */
    Connector.prototype.updateSegmentElement = function (connector, points, element, diagramActions) {
        var bounds = new Rect();
        //let point: PointModel[];
        var segmentPath = this.getSegmentPath(connector, points, diagramActions);
        if (connector.type === 'Bezier') {
            if (this.segments.length > 0) {
                for (var i = 0; i < this.segments.length; i++) {
                    var segment = this.segments[parseInt(i.toString(), 10)];
                    var connectorSegment = connector.segments[parseInt(i.toString(), 10)];
                    // eslint-disable-next-line max-len
                    var point1 = !Point.isEmptyPoint(segment.point1) ? connectorSegment.point1 : connectorSegment.bezierPoint1;
                    // eslint-disable-next-line max-len
                    var point2 = !Point.isEmptyPoint(segment.point2) ? connectorSegment.point2 : connectorSegment.bezierPoint2;
                    bounds.uniteRect(getBezierBounds(segment.points[0], point1, point2, segment.points[1], connector));
                }
            }
        }
        else {
            bounds = Rect.toBounds(points);
        }
        element.width = bounds.width;
        element.height = bounds.height;
        element.offsetX = bounds.x + element.width / 2;
        element.offsetY = bounds.y + element.height / 2;
        element.data = segmentPath;
        if (connector.wrapper) {
            connector.wrapper.offsetX = element.offsetX;
            connector.wrapper.offsetY = element.offsetY;
            connector.wrapper.width = bounds.width;
            connector.wrapper.height = bounds.height;
        }
        return element;
    };
    /** @private */
    Connector.prototype.getSegmentElement = function (connector, segmentElement, layoutOrientation, diagramActions, isFlip) {
        if (isFlip === void 0) { isFlip = true; }
        //let bounds: Rect; let segmentPath: string;
        var points = [];
        if (isFlip) {
            flipConnector(connector);
        }
        points = this.getConnectorPoints(connector.type, undefined, layoutOrientation);
        this.intermediatePoints = points;
        segmentElement.staticSize = true;
        segmentElement = this.updateSegmentElement(connector, points, segmentElement, diagramActions);
        return segmentElement;
    };
    /** @private */
    Connector.prototype.getDecoratorElement = function (offsetPoint, adjacentPoint, decorator, isSource, getDescription) {
        var decEle = new PathElement();
        var getPath;
        var angle;
        decEle.transform = Transform.Self;
        this.updateDecoratorElement(decEle, offsetPoint, adjacentPoint, decorator);
        if (getDescription !== undefined) {
            // tslint:disable-next-line:no-any
            var wrapperContent = getDescription(decorator, this);
            decEle.description = wrapperContent ? wrapperContent :
                ('Specifies the ' + isSource ? 'source' : 'target' + 'port element of the connector');
        }
        return decEle;
    };
    Connector.prototype.bridgePath = function (connector, path, pointIndex) {
        var pathData = path;
        if (connector.bridges.length > 0) {
            if (connector.type === 'Straight' && connector.segments.length < 2) {
                for (var n = 0; n < connector.bridges.length; n++) {
                    var bridge = connector.bridges[parseInt(n.toString(), 10)];
                    if (!bridge.rendered) {
                        pathData += ' L' + bridge.startPoint.x + ' ' + bridge.startPoint.y;
                        pathData += bridge.path;
                        bridge.rendered = true;
                    }
                }
            }
            else if (connector.type === 'Orthogonal' || (connector.type === 'Straight' && connector.segments.length > 1)) {
                for (var n = 0; n < connector.bridges.length; n++) {
                    var bridge = connector.bridges[parseInt(n.toString(), 10)];
                    if (bridge.segmentPointIndex === pointIndex) {
                        if (!bridge.rendered) {
                            if (bridge.segmentPointIndex === pointIndex) {
                                pathData += ' L' + bridge.startPoint.x + ' ' + bridge.startPoint.y;
                                pathData += bridge.path;
                                bridge.rendered = true;
                            }
                        }
                    }
                }
            }
        }
        return pathData;
    };
    /** @private */
    Connector.prototype.updateDecoratorElement = function (element, pt, adjacentPoint, decorator) {
        //let getPath: string;// let angle: number;
        element.offsetX = pt.x;
        element.offsetY = pt.y;
        var angle = Point.findAngle(pt, adjacentPoint);
        var getPath = getDecoratorShape(decorator.shape, decorator);
        var size = new Size(decorator.width, decorator.height);
        element.pivot.x = decorator.pivot.x;
        element.pivot.y = decorator.pivot.y;
        element.style = decorator.style;
        element.rotateAngle = angle;
        element.data = getPath;
        element.canMeasurePath = true;
        element.width = size.width;
        element.height = size.height;
    };
    /** @private */
    Connector.prototype.getSegmentPath = function (connector, points, diagramAction) {
        var path = '';
        var getPt;
        var end;
        var st;
        var pts = [];
        var j = 0;
        while (j < points.length) {
            pts.push({ x: points[parseInt(j.toString(), 10)].x, y: points[parseInt(j.toString(), 10)].y });
            j++;
        }
        for (var m = 0; m < connector.bridges.length; m++) {
            var bridge = connector.bridges[parseInt(m.toString(), 10)];
            bridge.rendered = false;
        }
        pts = this.clipDecorators(connector, pts, diagramAction);
        if (this.cornerRadius > 0 && this.type !== 'Bezier') {
            for (var j_1 = 0; j_1 < pts.length - 1; j_1++) {
                getPt = pts[parseInt(j_1.toString(), 10)];
                if (j_1 === 0) {
                    path = 'M' + getPt.x + ' ' + getPt.y;
                }
                var segLength = Point.distancePoints(pts[parseInt(j_1.toString(), 10)], pts[j_1 + 1]);
                if (segLength > 0) {
                    if (j_1 < pts.length - 2) {
                        if (segLength < this.cornerRadius * 2) {
                            end = Point.adjustPoint(pts[parseInt(j_1.toString(), 10)], pts[j_1 + 1], false, segLength / 2);
                        }
                        else {
                            end = Point.adjustPoint(pts[parseInt(j_1.toString(), 10)], pts[j_1 + 1], false, this.cornerRadius);
                        }
                    }
                    else {
                        end = pts[j_1 + 1];
                    }
                    if (j_1 > 0) {
                        if (segLength < this.cornerRadius * 2) {
                            st = Point.adjustPoint(pts[parseInt(j_1.toString(), 10)], pts[j_1 + 1], true, segLength / 2);
                            if (j_1 < pts.length - 2) {
                                end = null;
                            }
                        }
                        else {
                            st = Point.adjustPoint(pts[parseInt(j_1.toString(), 10)], pts[j_1 + 1], true, this.cornerRadius);
                        }
                    }
                    if (st) {
                        path += 'Q' + getPt.x + ' ' + getPt.y + ' ' + st.x + ' ' + st.y;
                    }
                    if (end) {
                        if (connector.bridges.length > 0) {
                            path = this.bridgePath(connector, path, j_1);
                            if (connector.type === 'Orthogonal') {
                                path = this.bridgePath(connector, path, j_1 + 1);
                            }
                        }
                        path += ' L' + end.x + ' ' + end.y;
                    }
                }
            }
        }
        else {
            if (this.type === 'Bezier') {
                var isrezise = void 0;
                var isDrawing = void 0;
                if (this.parentObj.element) {
                    var action = this.parentObj.element.ej2_instances[0]['eventHandler'].action;
                    isrezise = (this.parentObj.element.ej2_instances[0]['eventHandler']).tool instanceof ResizeTool;
                    isDrawing = action.includes('PortDraw') || action.includes('Drag');
                }
                var direction = void 0;
                var segments = this.segments;
                for (var j_2 = 0; j_2 < segments.length; j_2++) {
                    if (pts.length > 2) {
                        segments[parseInt(j_2.toString(), 10)].bezierPoint1 = { x: 0, y: 0 };
                        segments[parseInt(j_2.toString(), 10)].bezierPoint2 = { x: 0, y: 0 };
                    }
                    if (Point.isEmptyPoint(segments[parseInt(j_2.toString(), 10)].point1) &&
                        !segments[parseInt(j_2.toString(), 10)].vector1.angle && !segments[parseInt(j_2.toString(), 10)].vector1.distance) {
                        if ((connector.sourceID || this.sourcePortID) && this.sourceWrapper && !isDrawing && !isrezise) {
                            direction = getDirection(this.sourceWrapper.bounds, pts[parseInt(j_2.toString(), 10)], true);
                        }
                        segments[parseInt(j_2.toString(), 10)].bezierPoint1 = getBezierPoints(pts[parseInt(j_2.toString(), 10)], pts[j_2 + 1], direction);
                    }
                    else if (segments[parseInt(j_2.toString(), 10)].vector1.angle
                        || segments[parseInt(j_2.toString(), 10)].vector1.distance) {
                        segments[parseInt(j_2.toString(), 10)].bezierPoint1
                            = Point.transform(pts[parseInt(j_2.toString(), 10)], segments[parseInt(j_2.toString(), 10)].vector1.angle, segments[parseInt(j_2.toString(), 10)].vector1.distance);
                    }
                    else {
                        segments[parseInt(j_2.toString(), 10)].bezierPoint1 = {
                            x: segments[parseInt(j_2.toString(), 10)].point1.x || segments[parseInt(j_2.toString(), 10)].bezierPoint1.x,
                            y: segments[parseInt(j_2.toString(), 10)].point1.y || segments[parseInt(j_2.toString(), 10)].bezierPoint1.y
                        };
                    }
                    if (Point.isEmptyPoint(segments[parseInt(j_2.toString(), 10)].point2) &&
                        !segments[parseInt(j_2.toString(), 10)].vector2.angle && !segments[parseInt(j_2.toString(), 10)].vector2.distance) {
                        if ((connector.targetID || this.targetPortID) && this.targetWrapper && !isDrawing && !isrezise) {
                            direction = getDirection(this.targetWrapper.bounds, pts[j_2 + 1], true);
                        }
                        segments[parseInt(j_2.toString(), 10)].bezierPoint2 = getBezierPoints(pts[j_2 + 1], pts[parseInt(j_2.toString(), 10)], direction);
                    }
                    else if (segments[parseInt(j_2.toString(), 10)].vector2.angle
                        || segments[parseInt(j_2.toString(), 10)].vector2.distance) {
                        segments[parseInt(j_2.toString(), 10)].bezierPoint2
                            = Point.transform(pts[j_2 + 1], segments[parseInt(j_2.toString(), 10)].vector2.angle, segments[parseInt(j_2.toString(), 10)].vector2.distance);
                    }
                    else {
                        segments[parseInt(j_2.toString(), 10)].bezierPoint2 = {
                            x: segments[parseInt(j_2.toString(), 10)].point2.x || segments[parseInt(j_2.toString(), 10)].bezierPoint2.x,
                            y: segments[parseInt(j_2.toString(), 10)].point2.y || segments[parseInt(j_2.toString(), 10)].bezierPoint2.y
                        };
                    }
                }
                pts.splice(1, 0, { x: segments[0].bezierPoint1.x, y: segments[0].bezierPoint1.y });
                pts.splice(pts.length - 1, 0, {
                    x: segments[segments.length - 1].bezierPoint2.x, y: segments[segments.length - 1].bezierPoint2.y
                });
                pts = this.clipDecorators(connector, pts, diagramAction);
                for (var j_3 = 0; j_3 < segments.length; j_3++) {
                    if (j_3 === 0) {
                        path = 'M' + pts[0].x + ' ' + pts[0].y;
                    }
                    var lastPoint = (j_3 === segments.length - 1) ? pts[pts.length - 1].x + ' ' + pts[pts.length - 1].y :
                        segments[parseInt(j_3.toString(), 10)].points[segments[parseInt(j_3.toString(), 10)].points.length - 1].x + ' ' + segments[parseInt(j_3.toString(), 10)].points[segments[parseInt(j_3.toString(), 10)].points.length - 1].y;
                    path += 'C' +
                        segments[parseInt(j_3.toString(), 10)].bezierPoint1.x + ' ' + segments[parseInt(j_3.toString(), 10)].bezierPoint1.y + ' ' + segments[parseInt(j_3.toString(), 10)].bezierPoint2.x + ' '
                        + segments[parseInt(j_3.toString(), 10)].bezierPoint2.y + ' ' + lastPoint;
                }
            }
            else {
                for (var k = 0; k < pts.length; k++) {
                    getPt = pts[parseInt(k.toString(), 10)];
                    if (k === 0) {
                        path = 'M' + getPt.x + ' ' + getPt.y;
                    }
                    if (k > 0) {
                        path = this.bridgePath(connector, path, k);
                        path += ' ' + 'L' + getPt.x + ' ' + getPt.y;
                    }
                }
            }
        }
        return path;
    };
    /** @private */
    Connector.prototype.updateShapeElement = function (connector) {
        var element;
        switch (connector.shape.type) {
            case 'Bpmn':
                if (connector.wrapper.children[3] instanceof PathElement) {
                    element = connector.wrapper.children[3];
                }
                if (connector.shape.flow === 'Message') {
                    this.updateShapePosition(connector, element);
                }
                break;
            case 'UmlActivity':
                if (connector.shape.flow === 'Exception') {
                    this.getUMLExceptionFlow(connector.wrapper.children[0]);
                }
                break;
        }
    };
    /** @private */
    Connector.prototype.updateShapePosition = function (connector, element) {
        var segmentOffset = 0.5;
        var angle;
        var pt;
        var length = 0;
        var anglePoints = this.intermediatePoints;
        //Bug 860251: Bpmn message flow and sequence flow connector child path is not rendered properly.
        //To get the path offset of message flow.
        var offset = getPathOffset(anglePoints, element, segmentOffset);
        element.offsetX = offset.x;
        element.offsetY = offset.y;
    };
    /** @hidden */
    Connector.prototype.scale = function (sw, sh, width, height, refObject) {
        var tx = 0;
        var ty = 0;
        if (this.wrapper && this.wrapper.outerBounds) {
            var outerBounds = getOuterBounds(this);
            // EJ2-56887 - Connector do not get rendered properly in symbol palette.
            // Added the absolute command to change the connector height to positive if it is in negative value.
            var connWidth = Math.abs((this.wrapper.bounds.width || this.style.strokeWidth || 1) - 2);
            var connHeight = Math.abs((this.wrapper.bounds.height || this.style.strokeWidth || 1) - 2);
            tx = (outerBounds.width - connWidth);
            ty = (outerBounds.height - connHeight);
            sw = Math.abs((width - (Math.max(tx, ty))) / connWidth);
            sh = Math.abs((height - (Math.max(tx, ty))) / connHeight);
            tx = ty = Math.min(tx, ty);
        }
        sw = sh = Math.min(sw, sh);
        var matrix = identityMatrix();
        refObject = refObject || this.wrapper;
        rotateMatrix(matrix, -refObject.rotateAngle, refObject.offsetX, refObject.offsetY);
        scaleMatrix(matrix, sw, sh, refObject.offsetX, refObject.offsetY);
        rotateMatrix(matrix, refObject.rotateAngle, refObject.offsetX, refObject.offsetY);
        var points = transformPointsByMatrix(matrix, this.intermediatePoints);
        this.sourcePoint = points[0];
        this.targetPoint = points[points.length - 1];
        points = this.intermediatePoints = findConnectorPoints(this);
        updateConnector(this, points);
        return { x: tx, y: ty };
    };
    /**
     * @private
     * Returns the name of class Connector
     */
    Connector.prototype.getClassName = function () {
        return 'Connector';
    };
    __decorate([
        ComplexFactory(getConnectorType)
    ], Connector.prototype, "shape", void 0);
    __decorate([
        Property(ConnectorConstraints.Default)
    ], Connector.prototype, "constraints", void 0);
    __decorate([
        Property(10)
    ], Connector.prototype, "bridgeSpace", void 0);
    __decorate([
        Collection([], PathAnnotation)
    ], Connector.prototype, "annotations", void 0);
    __decorate([
        Complex({}, Point)
    ], Connector.prototype, "sourcePoint", void 0);
    __decorate([
        Complex({}, Point)
    ], Connector.prototype, "targetPoint", void 0);
    __decorate([
        Collection([], ConnectorFixedUserHandle)
    ], Connector.prototype, "fixedUserHandles", void 0);
    __decorate([
        CollectionFactory(getSegmentType)
    ], Connector.prototype, "segments", void 0);
    __decorate([
        Property('')
    ], Connector.prototype, "sourceID", void 0);
    __decorate([
        Property('')
    ], Connector.prototype, "targetID", void 0);
    __decorate([
        Property(10)
    ], Connector.prototype, "hitPadding", void 0);
    __decorate([
        Property(0)
    ], Connector.prototype, "connectionPadding", void 0);
    __decorate([
        Property('Straight')
    ], Connector.prototype, "type", void 0);
    __decorate([
        Property('Circle')
    ], Connector.prototype, "segmentThumbShape", void 0);
    __decorate([
        Property(10)
    ], Connector.prototype, "segmentThumbSize", void 0);
    __decorate([
        Property(0)
    ], Connector.prototype, "cornerRadius", void 0);
    __decorate([
        Complex({ shape: 'None' }, Decorator)
    ], Connector.prototype, "sourceDecorator", void 0);
    __decorate([
        Complex({ shape: 'Arrow' }, Decorator)
    ], Connector.prototype, "targetDecorator", void 0);
    __decorate([
        Complex({}, DiagramTooltip)
    ], Connector.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], Connector.prototype, "sourcePortID", void 0);
    __decorate([
        Property('')
    ], Connector.prototype, "targetPortID", void 0);
    __decorate([
        Property(0)
    ], Connector.prototype, "sourcePadding", void 0);
    __decorate([
        Complex({}, SymbolSize)
    ], Connector.prototype, "previewSize", void 0);
    __decorate([
        Complex({}, SymbolSize)
    ], Connector.prototype, "dragSize", void 0);
    __decorate([
        Property(0)
    ], Connector.prototype, "targetPadding", void 0);
    __decorate([
        Property(13)
    ], Connector.prototype, "connectorSpacing", void 0);
    __decorate([
        Complex({ strokeWidth: 1, strokeColor: 'black' }, StrokeStyle)
    ], Connector.prototype, "style", void 0);
    __decorate([
        Property(null)
    ], Connector.prototype, "maxSegmentThumb", void 0);
    __decorate([
        Property(false)
    ], Connector.prototype, "allowNodeOverlap", void 0);
    __decorate([
        Complex({}, BezierSettings)
    ], Connector.prototype, "bezierSettings", void 0);
    __decorate([
        Collection([], PathPort)
    ], Connector.prototype, "ports", void 0);
    __decorate([
        Property(null)
    ], Connector.prototype, "wrapper", void 0);
    return Connector;
}(NodeBase));
export { Connector };
