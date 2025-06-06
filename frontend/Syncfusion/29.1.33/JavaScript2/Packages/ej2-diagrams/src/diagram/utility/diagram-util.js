import { Size } from './../primitives/size';
import { Rect } from './../primitives/rect';
import { identityMatrix, rotateMatrix, transformPointByMatrix, scaleMatrix } from './../primitives/matrix';
import { DiagramElement } from './../core/elements/diagram-element';
import { Container } from './../core/containers/container';
import { StrokeStyle, Stop } from './../core/appearance';
import { Point } from './../primitives/point';
import { ConnectorConstraints, NodeConstraints, PortConstraints, DiagramConstraints, DiagramTools, Transform, BlazorAction, ControlPointsVisibility, DiagramEvent, ElementAction } from './../enum/enum';
import { SelectorConstraints, ThumbsConstraints, FlipDirection } from './../enum/enum';
import { PathElement } from './../core/elements/path-element';
import { DiagramNativeElement } from './../core/elements/native-element';
import { TextElement } from '../core/elements/text-element';
import { ImageElement } from '../core/elements/image-element';
import { PathAnnotation, ShapeAnnotation } from './../objects/annotation';
import { Node, FlowShape, BasicShape, Native, Html, UmlActivityShape, BpmnGateway, BpmnDataObject, BpmnEvent, BpmnSubEvent, BpmnActivity, BpmnAnnotation, MethodArguments, UmlClassAttribute, UmlClassMethod, UmlClass, UmlInterface, UmlEnumerationMember, UmlEnumeration, Lane, Phase, ChildContainer, SwimLane, Path, Image, Text, BpmnShape, UmlClassifierShape, Header } from './../objects/node';
import { Connector, bezierPoints, BezierSegment, StraightSegment, OrthogonalSegment } from './../objects/connector';
import { getBasicShape } from './../objects/dictionary/basic-shapes';
import { getFlowShape } from './../objects/dictionary/flow-shapes';
import { Diagram } from './../diagram';
import { findAngle } from './connector';
import { getContent, removeElement, hasClass, getDiagramElement } from './dom-util';
import { getBounds, cloneObject, rotatePoint, getFunction } from './base-util';
import { getPolygonPath } from './../utility/path-util';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { getRulerSize } from '../ruler/ruler';
import { canResize } from './constraints-util';
import { UserHandle } from '../interaction/selector';
import { getUMLActivityShape } from '../objects/dictionary/umlactivity-shapes';
import { Canvas } from '../core/containers/canvas';
import { PointPort } from '../objects/port';
import { Command } from '../diagram/keyboard-commands';
import { pasteSwimLane } from './swim-lane-util';
import { isBlazor, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ConnectorFixedUserHandle } from '../objects/fixed-user-handle';
import { Overview } from '../../overview/overview';
/**
 * completeRegion method\
 *
 * @returns {  void }    completeRegion method .\
 * @param {Rect} region - provide the region value.
 * @param {(NodeModel | ConnectorModel)[]} selectedObjects - provide the selectedObjects value.
 * @private
 */
export function completeRegion(region, selectedObjects) {
    var collection = [];
    for (var i = 0; i < selectedObjects.length; i++) {
        var obj = selectedObjects[parseInt(i.toString(), 10)];
        if (region.containsRect(obj.wrapper.bounds)) {
            collection.push(obj);
        }
    }
    return collection;
}
/**
 * findNodeByName method \
 *
 * @returns {  boolean } findNodeByName method .\
 * @param {(NodeModel | ConnectorModel)[]} nodes - provide the nodes  value.
 * @param {string} name - provide the orientation  value.
 * @private
 */
export function findNodeByName(nodes, name) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[parseInt(i.toString(), 10)].id === name) {
            return true;
        }
    }
    return false;
}
/**
 * findNodeByName method \
 *
 * @returns {  string } findNodeByName method .\
 * @param {(NodeModel | ConnectorModel)[]} drawingObject - provide the drawingObject  value.
 * @private
 */
export function findObjectType(drawingObject) {
    var type;
    if (drawingObject) {
        if (drawingObject.type) {
            type = 'Connector';
        }
        else if (drawingObject.shape && !drawingObject.type) {
            type = 'Node';
        }
    }
    return type;
}
/**
 * setSwimLaneDefaults method \
 *
 * @returns {  void } setSwimLaneDefaults method .\
 * @param {NodeModel | ConnectorModel} child - provide the child  value.
 * @param {NodeModel | ConnectorModel} node - provide the node  value.
 * @private
 */
export function setSwimLaneDefaults(child, node) {
    if (node instanceof Node) {
        if (!child.shape.header) {
            node.shape.hasHeader = false;
        }
    }
}
/**
 * getSpaceValue method \
 *
 * @returns {  number } getSpaceValue method .\
 * @param {number[]} intervals - provide the intervals  value.
 * @param {boolean} isLine - provide the isLine  value.
 * @param {number} i - provide the i  value.
 * @param {number} space - provide the space  value.
 * @private
 */
export function getSpaceValue(intervals, isLine, i, space) {
    space = !isLine ? ((intervals[i - 1] !== undefined) ? intervals[i - 1] + space : 0) : space;
    return space;
}
/**
 * getInterval method \
 *
 * @returns {  number[] } getInterval method .\
 * @param {number[]} intervals - provide the intervals  value.
 * @param {boolean} isLine - provide the isLine  value.
 * @private
 */
export function getInterval(intervals, isLine) {
    var newInterval = [];
    if (!isLine) {
        for (var k = 0; k < intervals.length; k++) {
            newInterval.push(intervals[parseInt(k.toString(), 10)]);
        }
        newInterval.push(intervals[newInterval.length - 2]);
        newInterval.push(intervals[newInterval.length - 2]);
    }
    else {
        newInterval = intervals;
    }
    return newInterval;
}
/**
 * setPortsEdges method \
 *
 * @returns {  Node } setPortsEdges method .\
 * @param {Node} node - provide the node  value.
 * @private
 */
export function setPortsEdges(node) {
    for (var k = 0; k < node.ports.length; k++) {
        node.ports[parseInt(k.toString(), 10)].inEdges = [];
        node.ports[parseInt(k.toString(), 10)].outEdges = [];
    }
    return node;
}
/**
 * setUMLActivityDefaults method \
 *
 * @returns {  void } setUMLActivityDefaults method .\
 * @param {NodeModel | ConnectorModel} child - provide the child  value.
 * @param {NodeModel | ConnectorModel} node - provide the node  value.
 * @private
 */
export function setUMLActivityDefaults(child, node) {
    if (node instanceof Node) {
        var shape = child.shape.shape;
        switch (shape) {
            case 'JoinNode':
                if (!child.width) {
                    node.width = 20;
                }
                if (!child.height) {
                    node.height = 90;
                }
                if (!child.style || !child.style.fill) {
                    node.style.fill = 'black';
                }
                break;
            case 'ForkNode':
                if (!child.width) {
                    node.width = 90;
                }
                if (!child.height) {
                    node.height = 20;
                }
                if (!child.style || !child.style.fill) {
                    node.style.fill = 'black';
                }
                break;
            case 'InitialNode':
                if (!child.style || !child.style.fill) {
                    node.style.fill = 'black';
                }
                break;
            case 'FinalNode':
                if (!child.style || !child.style.fill) {
                    node.style.fill = 'black';
                }
                break;
        }
    }
    else {
        var flow = child.shape.flow;
        switch (flow) {
            case 'Object':
                if (!child.style || !child.style.strokeDashArray) {
                    node.style.strokeDashArray = '8 4';
                }
                if (!child.style || !child.style.strokeWidth) {
                    node.style.strokeWidth = 2;
                }
                if (!child.targetDecorator || !child.targetDecorator.shape) {
                    node.targetDecorator.shape = 'OpenArrow';
                }
                break;
            case 'Control':
                if (!child.style || !child.style.strokeWidth) {
                    node.style.strokeWidth = 2;
                }
                if (!child.targetDecorator || !child.targetDecorator.shape) {
                    node.targetDecorator.shape = 'OpenArrow';
                }
                if (!child.sourceDecorator || !child.sourceDecorator.shape) {
                    node.sourceDecorator.shape = 'None';
                }
                break;
        }
    }
}
/* eslint-disable */
/**
 * setConnectorDefaults method \
 *
 * @returns {  void } setConnectorDefaults method .\
 * @param {ConnectorModel} child - provide the child  value.
 * @param {ConnectorModel} node - provide the node  value.
 * @private
 */
export function setConnectorDefaults(child, node) {
    switch ((child.shape).type) {
        case 'Bpmn':
            var bpmnFlow = child.shape.flow;
            switch (bpmnFlow) {
                case 'Sequence':
                    if ((((child.shape.sequence) === 'Normal' && child.type !== 'Bezier')) ||
                        ((child.shape.sequence) === 'Default') || ((child.shape.sequence) === 'Conditional')) {
                        if (node.targetDecorator && node.targetDecorator.style) {
                            node.targetDecorator.style.fill = (child.targetDecorator && child.targetDecorator.style
                                && child.targetDecorator.style.fill) || 'black';
                        }
                        if ((child.shape.sequence) === 'Conditional' && node.sourceDecorator) {
                            if (node.sourceDecorator.style) {
                                node.sourceDecorator.style.fill = (child.sourceDecorator && child.sourceDecorator.style &&
                                    child.sourceDecorator.style.fill) || 'white';
                            }
                            node.sourceDecorator.width = (child.sourceDecorator && child.sourceDecorator.width) || 20;
                            node.sourceDecorator.height = (child.sourceDecorator && child.sourceDecorator.width) || 10;
                        }
                    }
                    break;
                case 'Association':
                    if (((child.shape.association) === 'Default') ||
                        ((child.shape.association) === 'Directional') ||
                        ((child.shape.association) === 'BiDirectional')) {
                        if (node.targetDecorator && node.targetDecorator.style) {
                            node.targetDecorator.style.fill = (child.targetDecorator && child.targetDecorator.style &&
                                child.targetDecorator.style.fill) || 'black';
                        }
                        if ((child.shape.association) === 'BiDirectional') {
                            if (node.sourceDecorator && node.sourceDecorator.style) {
                                node.sourceDecorator.style.fill = (child.sourceDecorator && child.sourceDecorator.style &&
                                    child.sourceDecorator.style.fill) || 'white';
                                node.sourceDecorator.width = (child.sourceDecorator && child.sourceDecorator.width) || 5;
                                node.sourceDecorator.height = (child.sourceDecorator && child.sourceDecorator.height) || 10;
                            }
                        }
                    }
                    break;
                case 'Message':
                    if (node.style && !node.style.strokeDashArray) {
                        node.style.strokeDashArray = (child.style && child.style.strokeDashArray) || '4 4';
                    }
                    break;
            }
            break;
        case 'UmlActivity':
            var flow = child.shape.flow;
            switch (flow) {
                case 'Exception':
                    if (((child.shape.association) === 'Directional') ||
                        ((child.shape.association) === 'BiDirectional')) {
                        node.style.strokeDashArray = (child.style && child.style.strokeDashArray) || '2 2';
                    }
                    break;
            }
            break;
        case 'UmlClassifier':
            var hasRelation = false;
            if (child.shape.relationship === 'Association') {
                hasRelation = true;
            }
            else if (child.shape.relationship === 'Inheritance') {
                if (node.targetDecorator && node.targetDecorator.style) {
                    node.targetDecorator.style.fill = (child.targetDecorator && child.targetDecorator.style &&
                        child.targetDecorator.style.fill) || 'white';
                }
                if (node.style) {
                    hasRelation = true;
                    node.style.strokeDashArray = (child.style && child.style.strokeDashArray) || '4 4';
                }
            }
            else if (child.shape.relationship === 'Composition') {
                if (node.sourceDecorator && node.sourceDecorator.style) {
                    node.sourceDecorator.style.fill = (child.sourceDecorator && child.sourceDecorator.style &&
                        child.sourceDecorator.style.fill) || 'black';
                }
                hasRelation = true;
            }
            else if (child.shape.relationship === 'Aggregation' ||
                child.shape.relationship === undefined) {
                if (node.sourceDecorator && node.sourceDecorator.style) {
                    node.sourceDecorator.style.fill = (child.sourceDecorator && child.sourceDecorator.style &&
                        child.sourceDecorator.style.fill) || 'white';
                }
                hasRelation = true;
            }
            else if (child.shape.relationship === 'Dependency') {
                if (node.sourceDecorator && node.sourceDecorator.style) {
                    node.sourceDecorator.style.fill = (child.sourceDecorator && child.sourceDecorator.style &&
                        child.sourceDecorator.style.fill) || 'white';
                }
                hasRelation = true;
                node.style.strokeDashArray = '4 4';
            }
            else if (child.shape.relationship === 'Realization') {
                if (node.sourceDecorator && node.sourceDecorator.style) {
                    node.sourceDecorator.style.fill = (child.sourceDecorator && child.sourceDecorator.style &&
                        child.sourceDecorator.style.fill) || 'white';
                }
                hasRelation = true;
            }
            if (hasRelation) {
                node.style.strokeWidth = (child.style && child.style.strokeWidth) || 2;
            }
            break;
    }
}
/* eslint-enable */
/**
 * findNearestPoint method \
 *
 * @returns {  PointModel } findNearestPoint method .\
 * @param {PointModel} reference - provide the reference  value.
 * @param {PointModel} start - provide the start  value.
 * @param {PointModel} end - provide the end  value.
 * @private
 */
export function findNearestPoint(reference, start, end) {
    var shortestPoint;
    var shortest = Point.findLength(start, reference);
    var shortest1 = Point.findLength(end, reference);
    if (shortest > shortest1) {
        shortestPoint = end;
    }
    else {
        shortestPoint = start;
    }
    var angleBWStAndEnd = Point.findAngle(start, end);
    var angleBWStAndRef = Point.findAngle(shortestPoint, reference);
    var r = Point.findLength(shortestPoint, reference);
    var vaAngle = angleBWStAndRef + ((angleBWStAndEnd - angleBWStAndRef) * 2);
    return {
        x: (shortestPoint.x + r * Math.cos(vaAngle * Math.PI / 180)),
        y: (shortestPoint.y + r * Math.sin(vaAngle * Math.PI / 180))
    };
}
/**
 * pointsForBezier method \
 *
 * @returns {   PointModel[] } pointsForBezier method .\
 * @param {ConnectorModel} connector - provide the connector  value.
 * @private
 */
function pointsForBezier(connector) {
    var points = [];
    if (connector.type === 'Bezier') {
        var k = 0;
        for (var i = 0; i < connector.segments.length; i++) {
            var tolerance = 1.5;
            var segment = connector.segments[parseInt(i.toString(), 10)];
            //const pt: PointModel = { x: 0, y: 0 };
            var point1 = !Point.isEmptyPoint(segment.point1) ? segment.point1 : segment.bezierPoint1;
            var point2 = !Point.isEmptyPoint(segment.point2) ? segment.point2 : segment.bezierPoint2;
            var max = Number((connector.distance(point1, segment.points[0]) +
                connector.distance(point2, point1) +
                connector.distance(segment.points[1], point2)) / tolerance);
            for (var j = 0; j < max - 1; j = j + 10) {
                points[parseInt(k.toString(), 10)] =
                    bezierPoints(connector, segment.points[0], !Point.isEmptyPoint(segment.point1) ? segment.point1 : segment.bezierPoint1, !Point.isEmptyPoint(segment.point2) ? segment.point2 : segment.bezierPoint2, segment.points[1], j, max);
                k++;
            }
        }
    }
    return points;
}
/**
 * isDiagramChild method \
 *
 * @returns {  boolean } isDiagramChild method .\
 * @param {HTMLElement} htmlLayer - provide the htmlLayer  value.
 * @private
 */
export function isDiagramChild(htmlLayer) {
    var element = htmlLayer.parentElement;
    do {
        if (hasClass(element, 'e-diagram')) {
            return true;
        }
        element = element.parentElement;
    } while (element);
    return false;
}
/**
 * groupHasType method \
 *
 * @returns {  boolean } groupHasType method .\
 * @param {NodeModel} node - provide the node  value.
 * @param {Shapes} type - provide the type  value.
 * @param {{}} nameTable - provide the nameTable  value.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function groupHasType(node, type, nameTable) {
    var contains = false;
    if (node && node.children && node.children.length > 0) {
        var child = void 0;
        var i = 0;
        for (; i < node.children.length; i++) {
            child = nameTable[node.children[parseInt(i.toString(), 10)]];
            if (child.shape.type === type) {
                return true;
            }
            return groupHasType(child, type, nameTable);
        }
    }
    return contains;
}
/**
 * groupHasType method \
 *
 * @returns {  void } groupHasType method .\
 * @param {NodeModel | ConnectorModel} actualNode - provide the actualNode  value.
 * @param { NodeModel | ConnectorModel} plainValue - provide the plainValue  value.
 * @param {object} defaultValue - provide the defaultValue  value.
 * @param {NodeModel | ConnectorModel} property - provide the property  value.
 * @param {string} oldKey - provide the oldKey  value.
 * @private
 */
export function updateDefaultValues(actualNode, plainValue, 
// eslint-disable-next-line @typescript-eslint/ban-types
defaultValue, property, oldKey) {
    if (defaultValue && ((actualNode instanceof Connector) || actualNode
        && ((actualNode.shape && actualNode.shape.type !== 'SwimLane') || actualNode.shape === undefined))) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        var keyObj = void 0;
        for (var _i = 0, _a = Object.keys(defaultValue); _i < _a.length; _i++) {
            var key = _a[_i];
            keyObj = defaultValue["" + key];
            if (key === 'shape' && keyObj.type) {
                actualNode.shape = { type: keyObj.type };
            }
            if (keyObj) {
                if (Array.isArray(keyObj) && keyObj.length && keyObj.length > 0 && (oldKey !== 'annotations' && oldKey !== 'ports')) {
                    if (actualNode["" + key].length > 0) {
                        for (var i = 0; i <= actualNode["" + key].length; i++) {
                            updateDefaultValues(actualNode["" + key], plainValue ? plainValue["" + key] : undefined, defaultValue["" + key], (key === 'annotations' || key === 'ports') ? actualNode : undefined, key);
                        }
                    }
                    else {
                        updateDefaultValues(actualNode["" + key], plainValue ? plainValue["" + key] : undefined, defaultValue["" + key], (key === 'annotations' || key === 'ports') ? actualNode : undefined, key);
                    }
                }
                else if (keyObj instanceof Object && plainValue && (oldKey !== 'annotations' && oldKey !== 'ports')) {
                    updateDefaultValues(actualNode["" + key], plainValue["" + key], defaultValue["" + key]);
                }
                else if ((oldKey !== 'annotations' && oldKey !== 'ports')
                    && (plainValue && !plainValue["" + key]) || (!plainValue && actualNode
                    && (actualNode["" + key] || actualNode["" + key] !== undefined))) {
                    actualNode["" + key] = defaultValue["" + key];
                }
                else {
                    var createObject = void 0;
                    if (oldKey === 'annotations' || oldKey === 'ports') {
                        if (oldKey === 'annotations') {
                            if (actualNode["" + key]) {
                                updateDefaultValues(actualNode["" + key], plainValue["" + key], defaultValue["" + key]);
                            }
                            if (!actualNode["" + key]) {
                                if (getObjectType(property) === Connector) {
                                    createObject = new PathAnnotation(property, 'annotations', defaultValue["" + key]);
                                    property.annotations.push(createObject);
                                }
                                else {
                                    createObject = new ShapeAnnotation(property, 'annotations', defaultValue["" + key]);
                                    property.annotations.push(createObject);
                                }
                            }
                        }
                        else {
                            if (actualNode["" + key]) {
                                updateDefaultValues(actualNode["" + key], plainValue["" + key], defaultValue["" + key]);
                            }
                            else {
                                createObject = new PointPort(property, 'ports', defaultValue["" + key]);
                                property.ports.push(createObject);
                            }
                        }
                    }
                }
            }
        }
    }
}
/* tslint:disable:no-string-literal */
/**
 * updateLayoutValue method \
 *
 * @returns {  void } updateLayoutValue method .\
 * @param {TreeInfo} actualNode - provide the actualNode  value.
 * @param { object} defaultValue - provide the defaultValue  value.
 * @param {INode[]} nodes - provide the nodes  value.
 * @param {INode} node - provide the node  value.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function updateLayoutValue(actualNode, defaultValue, nodes, node) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    var keyObj;
    var assistantKey = 'Role';
    if (defaultValue) {
        for (var _i = 0, _a = Object.keys(defaultValue); _i < _a.length; _i++) {
            var key = _a[_i];
            keyObj = defaultValue["" + key];
            if (key === 'getAssistantDetails') {
                //Removed isBlazor code
                if (node.data["" + assistantKey] === defaultValue["" + key]['root']) {
                    var assitants = defaultValue["" + key]['assistants'];
                    for (var i = 0; i < assitants.length; i++) {
                        for (var j = 0; j < nodes.length; j++) {
                            if (nodes[parseInt(j.toString(), 10)].data["" + assistantKey] === assitants[parseInt(i.toString(), 10)]) {
                                actualNode.assistants.push(nodes[parseInt(j.toString(), 10)].id);
                                actualNode.children.splice(0, 1);
                            }
                        }
                    }
                }
            }
            else if (keyObj) {
                actualNode["" + key] = defaultValue["" + key];
            }
        }
    }
    if (!actualNode.hasSubTree && defaultValue.canEnableSubTree) {
        actualNode.orientation = node.layoutInfo.orientation;
        actualNode.type = node.layoutInfo.type;
        if (node.layoutInfo.offset !== actualNode.offset && (node.layoutInfo.offset) !== undefined) {
            actualNode.offset = node.layoutInfo.offset;
        }
    }
    node.layoutInfo.hasSubTree = actualNode.hasSubTree;
}
/* tslint:enable:no-string-literal */
/**
 * isPointOverConnector method \
 *
 * @returns {  boolean } isPointOverConnector method .\
 * @param {ConnectorModel} connector - provide the connector  value.
 * @param { PointModel} reference - provide the reference  value.
 * @private
 */
export function isPointOverConnector(connector, reference) {
    //let intermediatePoints: PointModel[];
    var intermediatePoints = connector.type === 'Bezier' ? pointsForBezier(connector) :
        connector.intermediatePoints;
    for (var i = 0; i < intermediatePoints.length - 1; i++) {
        var start = intermediatePoints[parseInt(i.toString(), 10)];
        var end = intermediatePoints[i + 1];
        var rect = Rect.toBounds([start, end]);
        rect.Inflate(connector.hitPadding);
        if (rect.containsPoint(reference)) {
            var intersectinPt = findNearestPoint(reference, start, end);
            var segment1 = { x1: start.x, x2: end.x, y1: start.y, y2: end.y };
            var segment2 = { x1: reference.x, x2: intersectinPt.x, y1: reference.y, y2: intersectinPt.y };
            var intersectDetails = intersect3(segment1, segment2);
            if (intersectDetails.enabled) {
                var distance = Point.findLength(reference, intersectDetails.intersectPt);
                if (Math.abs(distance) < connector.hitPadding) {
                    return true;
                }
            }
            else {
                var rect_1 = Rect.toBounds([reference, reference]);
                rect_1.Inflate(3);
                if (rect_1.containsPoint(start) || rect_1.containsPoint(end)) {
                    return true;
                }
            }
            if (Point.equals(reference, intersectinPt)) {
                return true;
            }
        }
    }
    if (connector.annotations.length > 0 || connector.ports.length > 0) {
        var container = connector.wrapper.children;
        for (var i = 3; i < container.length; i++) {
            var textElement = container[parseInt(i.toString(), 10)];
            if (textElement.bounds.containsPoint(reference)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * intersect3 method \
 *
 * @returns {  Intersection } intersect3 method .\
 * @param {ConnectorModel} lineUtil1 - provide the lineUtil1  value.
 * @param { PointModel} lineUtil2 - provide the lineUtil2  value.
 * @private
 */
export function intersect3(lineUtil1, lineUtil2) {
    var point = { x: 0, y: 0 };
    var l1 = lineUtil1;
    var l2 = lineUtil2;
    var d = (l2.y2 - l2.y1) * (l1.x2 - l1.x1) - (l2.x2 - l2.x1) * (l1.y2 - l1.y1);
    var na = (l2.x2 - l2.x1) * (l1.y1 - l2.y1) - (l2.y2 - l2.y1) * (l1.x1 - l2.x1);
    var nb = (l1.x2 - l1.x1) * (l1.y1 - l2.y1) - (l1.y2 - l1.y1) * (l1.x1 - l2.x1);
    /*( EJ2-42102 - Connector segments not update properly ) by sivakumar sekar - condition added to avoid bridging for
     overlapping segments in the connectors and to validate whether the connector is intersecting over the other */
    if (d === 0 || ((lineUtil1.x1 === lineUtil2.x1 || lineUtil1.y1 === lineUtil2.y1) &&
        (lineUtil1.x2 === lineUtil2.x2 || lineUtil1.y2 === lineUtil2.y2) && ((na === 0 || nb === 0) && d > 0))) {
        return { enabled: false, intersectPt: point };
    }
    var ua = na / d;
    var ub = nb / d;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        point.x = l1.x1 + (ua * (l1.x2 - l1.x1));
        point.y = l1.y1 + (ua * (l1.y2 - l1.y1));
        return { enabled: true, intersectPt: point };
    }
    return { enabled: false, intersectPt: point };
}
/**
 * intersect2 method \
 *
 * @returns {  PointModel } intersect2 method .\
 * @param {PointModel} start1 - provide the start1  value.
 * @param { PointModel} end1 - provide the end1  value.
 * @param { PointModel} start2 - provide the start2  value.
 * @param { PointModel} end2 - provide the end2  value.
 * @private
 */
export function intersect2(start1, end1, start2, end2) {
    var point = { x: 0, y: 0 };
    var lineUtil1 = getLineSegment(start1.x, start1.y, end1.x, end1.y);
    var lineUtil2 = getLineSegment(start2.x, start2.y, end2.x, end2.y);
    var line3 = intersect3(lineUtil1, lineUtil2);
    if (line3.enabled) {
        return line3.intersectPt;
    }
    else {
        return point;
    }
}
/**
 * getLineSegment method \
 *
 * @returns {  Segment } getLineSegment method .\
 * @param {number} x1 - provide the x1  value.
 * @param { number} y1 - provide the y1  value.
 * @param { number} x2 - provide the x2  value.
 * @param { number} y2 - provide the y2  value.
 * @private
 */
export function getLineSegment(x1, y1, x2, y2) {
    return { 'x1': Number(x1) || 0, 'y1': Number(y1) || 0, 'x2': Number(x2) || 0, 'y2': Number(y2) || 0 };
}
/**
 * getPoints method \
 *
 * @returns {  PointModel[] } getPoints method .\
 * @param {number} element - provide the element  value.
 * @param { number} corners - provide the corners  value.
 * @param { number} padding - provide the padding  value.
 * @private
 */
export function getPoints(element, corners, padding) {
    var line = [];
    padding = padding || 0;
    var left = { x: corners.topLeft.x - padding, y: corners.topLeft.y };
    var right = { x: corners.topRight.x + padding, y: corners.topRight.y };
    var top = { x: corners.bottomRight.x, y: corners.bottomRight.y - padding };
    var bottom = { x: corners.bottomLeft.x, y: corners.bottomLeft.y + padding };
    line.push(left);
    line.push(right);
    line.push(top);
    line.push(bottom);
    return line;
}
/**
 * getTooltipOffset method \
 *
 * @returns {  PointModel[] } getTooltipOffset method .\
 * @param {number} diagram - provide the diagram  value.
 * @param { number} mousePosition - provide the mousePosition  value.
 * @param { NodeModel | ConnectorModel | PointPortModel} node - provide the node  value.
 * @param { string} type - provide the type  value.
 * @private
 */
export function getTooltipOffset(diagram, mousePosition, node, type) {
    //let offset: PointModel;
    var inheritTooltip = (node instanceof Node) ? (node.constraints & NodeConstraints.InheritTooltip)
        : (node instanceof Connector) ? (node.constraints & ConnectorConstraints.InheritTooltip)
            : (node.constraints & PortConstraints.InheritTooltip);
    var objectTooltip = (node instanceof Node) ? (node.constraints & NodeConstraints.Tooltip)
        : (node instanceof Connector) ? (node.constraints & ConnectorConstraints.Tooltip)
            : (node.constraints & PortConstraints.ToolTip);
    var isMouseBased = ((!inheritTooltip && objectTooltip ? node.tooltip.relativeMode
        : diagram.tooltip.relativeMode) === 'Mouse') ? true : false;
    if (type === 'Mouse') {
        isMouseBased = true;
    }
    else if (type === 'Object') {
        isMouseBased = false;
    }
    var offset = tooltipOffset(node, mousePosition, diagram, isMouseBased);
    var rulerSize = getRulerSize(diagram);
    return { x: offset.x + rulerSize.width, y: offset.y + rulerSize.height };
}
/**
 * tooltipOffset method \
 *
 * @returns { PointModel } tooltipOffset method .\
 * @param {NodeModel | ConnectorModel | PointPortModel} node - provide the node  value.
 * @param { PointModel} mousePosition - provide the mousePosition  value.
 * @param { Diagram } diagram - provide the diagram  value.
 * @param { boolean} isMouseBased - provide the isMouseBased  value.
 * @private
 */
function tooltipOffset(node, mousePosition, diagram, isMouseBased) {
    var point = {};
    //let scale: number = diagram.scroller.transform.scale;
    var element = document.getElementById(diagram.element.id);
    var bounds;
    //EJ2-62120-Tooltip support for ports
    if (node instanceof Node || node instanceof Connector) {
        bounds = node.wrapper.bounds;
    }
    else {
        var objects = diagram.findObjectsUnderMouse(mousePosition);
        var obj = diagram.findObjectUnderMouse(objects, 'Select', false);
        var portElement = diagram.findElementUnderMouse(obj, mousePosition, diagram);
        bounds = portElement.bounds;
    }
    var rect = element.getBoundingClientRect();
    /* eslint-enable */
    //let horizontalOffset: number = diagram.scroller.horizontalOffset;
    //let verticalOffset: number = diagram.scroller.verticalOffset;
    switch (diagram.tooltipObject.position) {
        case 'BottomCenter':
            point = offsetPoint(mousePosition, bounds.bottomCenter, diagram, isMouseBased, (rect.width / 2), rect.height);
            break;
        case 'BottomLeft':
        case 'LeftBottom':
            point = offsetPoint(mousePosition, bounds.bottomLeft, diagram, isMouseBased, 0, rect.height);
            break;
        case 'BottomRight':
        case 'RightBottom':
            point = offsetPoint(mousePosition, bounds.bottomRight, diagram, isMouseBased, rect.width, rect.height);
            break;
        case 'LeftCenter':
            point = offsetPoint(mousePosition, bounds.middleLeft, diagram, isMouseBased, 0, (rect.height / 2));
            break;
        case 'LeftTop':
        case 'TopLeft':
            point = offsetPoint(mousePosition, bounds.topLeft, diagram, isMouseBased, 0, 0);
            break;
        case 'RightCenter':
            point = offsetPoint(mousePosition, bounds.middleRight, diagram, isMouseBased, rect.width, (rect.height / 2));
            break;
        case 'RightTop':
        case 'TopRight':
            point = offsetPoint(mousePosition, bounds.topRight, diagram, isMouseBased, rect.width, 0);
            break;
        case 'TopCenter':
            point = offsetPoint(mousePosition, bounds.topCenter, diagram, isMouseBased, (rect.width / 2), 0);
            break;
    }
    return point;
}
/**
 * offsetPoint method \
 *
 * @returns { PointModel } offsetPoint method .\
 * @param { PointModel} mousePosition - provide the mousePosition  value.
 * @param { PointModel } bound - provide the diagram  value.
 * @param { Diagram} diagram - provide the isMouseBased  value.
 * @param { boolean} isMouseBased - provide the isMouseBased  value.
 * @param { number} x - provide the isMouseBased  value.
 * @param { number} y - provide the isMouseBased  value.
 * @private
 */
function offsetPoint(mousePosition, bound, diagram, isMouseBased, x, y) {
    var point = {};
    var scale = diagram.scroller.transform.scale;
    var horizontalOffset = diagram.scroller.horizontalOffset;
    var verticalOffset = diagram.scroller.verticalOffset;
    horizontalOffset = diagram.modifyClientOffset(horizontalOffset, true);
    verticalOffset = diagram.modifyClientOffset(verticalOffset, true);
    point.x = (isMouseBased ? mousePosition.x : bound.x) * scale + horizontalOffset - x;
    point.y = (isMouseBased ? mousePosition.y : bound.y) * scale + verticalOffset - y;
    return point;
}
/**
 * Gets the fixed user handles symbol \
 *
 * @returns { DiagramElement } Gets the fixed user handles symbol .\
 * @param {ConnectorFixedUserHandleModel | NodeFixedUserHandleModel} options - provide the options  value.
 * @param { Canvas} fixedUserHandleContainer - provide the fixedUserHandleContainer  value.
 * @private
 */
export function initFixedUserHandlesSymbol(options, fixedUserHandleContainer) {
    //let fixedUserHandleContent: PathElement | DiagramNativeElement;
    var fixedUserHandleContent = new PathElement();
    fixedUserHandleContent.data = options.pathData;
    fixedUserHandleContent.height =
        options.height > 10 ? options.height - (options.padding.bottom + options.padding.top) : options.height;
    fixedUserHandleContent.width =
        options.width > 10 ? options.width - (options.padding.left + options.padding.right) : options.width;
    //Bug 912616: Not able to hide the fixedUserHandle in diagram
    fixedUserHandleContent.visible = options.visibility;
    fixedUserHandleContent.id = fixedUserHandleContainer.id + '_shape';
    fixedUserHandleContent.inversedAlignment = false;
    fixedUserHandleContent.horizontalAlignment = 'Center';
    fixedUserHandleContent.verticalAlignment = 'Center';
    fixedUserHandleContent.style = {
        fill: options.iconStrokeColor, strokeColor: options.iconStrokeColor,
        strokeWidth: options.iconStrokeWidth
    };
    fixedUserHandleContent.setOffsetWithRespectToBounds(0.5, 0.5, 'Fraction');
    fixedUserHandleContent.relativeMode = 'Object';
    fixedUserHandleContent.description = fixedUserHandleContainer.description || '';
    return fixedUserHandleContent;
}
/**
 * sort method \
 *
 * @returns { (NodeModel | ConnectorModel)[] } sort method .\
 * @param {(NodeModel | ConnectorModel)[]} objects - provide the options  value.
 * @param { DistributeOptions} option - provide the fixedUserHandleContainer  value.
 * @private
 */
export function sort(objects, option) {
    var i = 0;
    var j = 0;
    var temp;
    for (i = 0; i < objects.length; i++) {
        var b = getBounds(objects[parseInt(i.toString(), 10)].wrapper);
        for (j = i + 1; j < objects.length; j++) {
            var bounds = getBounds(objects[parseInt(j.toString(), 10)].wrapper);
            if (option === 'Top' || option === 'Bottom' || option === 'BottomToTop' || option === 'Middle') {
                if (b.center.y > bounds.center.y) {
                    temp = objects[parseInt(i.toString(), 10)];
                    objects[parseInt(i.toString(), 10)] = objects[parseInt(j.toString(), 10)];
                    objects[parseInt(j.toString(), 10)] = temp;
                }
            }
            else {
                if (b.center.x > bounds.center.x) {
                    temp = objects[parseInt(i.toString(), 10)];
                    objects[parseInt(i.toString(), 10)] = objects[parseInt(j.toString(), 10)];
                    objects[parseInt(j.toString(), 10)] = temp;
                }
            }
        }
    }
    return objects;
}
/**
 * getAnnotationPosition method \
 *
 * @returns {SegmentInfo } getAnnotationPosition method .\
 * @param {PointModel[]} pts - provide the pts  value.
 * @param { PathAnnotation | ConnectorFixedUserHandle} annotation - provide the annotation  value.
 * @param { Rect } bound - provide the bound  value.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getAnnotationPosition(pts, annotation, bound) {
    //let angle: number;
    //let getloop: SegmentInfo;
    //let point: PointModel;
    var getloop = getOffsetOfConnector(pts, annotation);
    var angle = Point.findAngle(pts[getloop.index], pts[getloop.index + 1]);
    var alignednumber = getAlignedPosition(annotation);
    var point = Point.transform(getloop.point, angle + 45, alignednumber);
    getloop.point = point;
    getloop.angle = angle;
    return getloop;
}
/**
 * getPortsPosition method \
 *
 * @returns {SegmentInfo } getPortsPosition method .\
 * @param {PointModel[]} pts - provide the pts  value.
 * @param { Port} ports - provide the ports  value.
 * @param { Rect } bound - provide the bound  value.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPortsPosition(pts, ports, bound) {
    var getloop = getOffsetOfPorts(pts, ports);
    var angle = Point.findAngle(pts[getloop.index], pts[getloop.index + 1]);
    var alignednumber = getAlignedPositionForPorts(ports);
    var point = Point.transform(getloop.point, angle + 45, alignednumber);
    getloop.point = point;
    getloop.angle = angle;
    return getloop;
}
/**
 * getOffsetOfPorts method \
 *
 * @returns {SegmentInfo } getOffsetOfPorts method .\
 * @param {PointModel[]} points - provide the pts  value.
 * @param { PathAnnotation | ConnectorFixedUserHandle} ports - provide the ports  value.
 * @private
 */
export function getOffsetOfPorts(points, ports) {
    // eslint-disable-next-line
    var distance = 0;
    var offset = ports.offset;
    var point;
    var angle;
    var pointDistance = [];
    var prevLength;
    var kCount;
    for (var j = 0; j < points.length - 1; j++) {
        distance += Point.distancePoints(points[parseInt(j.toString(), 10)], points[j + 1]);
        pointDistance.push(distance);
    }
    var offsetLength = offset * distance;
    for (var k = 0; k < pointDistance.length; k++) {
        if (pointDistance[parseInt(k.toString(), 10)] >= offsetLength) {
            angle = Point.findAngle(points[parseInt(k.toString(), 10)], points[k + 1]);
            point = Point.transform(points[parseInt(k.toString(), 10)], angle, offsetLength - (prevLength || 0));
            kCount = k;
            return { point: point, index: kCount };
        }
        prevLength = pointDistance[parseInt(k.toString(), 10)];
    }
    return { point: point, index: kCount };
}
/**
 * getAlignedPosition method . To get the port alignment position \
 *
 * @returns {number } getAlignedPosition method .\
 * @param {PointModel[]} ports - provide the annotation value.
 * @private
 */
export function getAlignedPositionForPorts(ports) {
    var constant = 0;
    var state = 0;
    switch (ports.alignment) {
        case 'Center':
            state = 0;
            break;
        case 'Before':
            state = -((0) / 2 + constant);
            break;
        case 'After':
            state = ((0) / 2 + constant);
            break;
    }
    return state;
}
/**
 * getOffsetOfConnector method \
 *
 * @returns {SegmentInfo } getOffsetOfConnector method .\
 * @param {PointModel[]} points - provide the pts  value.
 * @param { PathAnnotation | ConnectorFixedUserHandle} annotation - provide the annotation  value.
 * @private
 */
export function getOffsetOfConnector(points, annotation) {
    // eslint-disable-next-line
    var length = 0;
    var offset = annotation.offset;
    var point;
    var angle;
    var lengths = [];
    var prevLength;
    var kCount;
    for (var j = 0; j < points.length - 1; j++) {
        length += Point.distancePoints(points[parseInt(j.toString(), 10)], points[j + 1]);
        lengths.push(length);
    }
    var offsetLength = offset * length;
    for (var k = 0; k < lengths.length; k++) {
        if (lengths[parseInt(k.toString(), 10)] >= offsetLength) {
            angle = Point.findAngle(points[parseInt(k.toString(), 10)], points[k + 1]);
            point = Point.transform(points[parseInt(k.toString(), 10)], angle, offsetLength - (prevLength || 0));
            kCount = k;
            return { point: point, index: kCount };
        }
        prevLength = lengths[parseInt(k.toString(), 10)];
    }
    return { point: point, index: kCount };
}
/**
 * getAlignedPosition method \
 *
 * @returns {number } getAlignedPosition method .\
 * @param {PointModel[]} annotation - provide the annotation value.
 * @private
 */
export function getAlignedPosition(annotation) {
    var cnst;
    if ((annotation instanceof ConnectorFixedUserHandle)) {
        cnst = 0;
    }
    else {
        cnst = annotation.content === undefined ? 10 : 0;
    }
    var state = 0;
    switch (annotation.alignment) {
        case 'Center':
            state = 0;
            break;
        case 'Before':
            state = -((0) / 2 + cnst);
            break;
        case 'After':
            state = ((0) / 2 + cnst);
            break;
    }
    return state;
}
/**
 * alignLabelOnSegments method \
 *
 * @returns {Alignment } alignLabelOnSegments method .\
 * @param {PathAnnotation | ConnectorFixedUserHandle} obj - provide the obj  value.
 * @param { number } ang - provide the ang  value.
 * @param { PointModel[] } pts - provide the pts  value.
 * @private
 */
export function alignLabelOnSegments(obj, ang, pts) {
    //let angle: number = ang % 360;
    ang %= 360;
    var fourty5 = 45;
    var one35 = 135;
    var two25 = 225;
    var three15 = 315;
    var vAlign;
    var hAlign;
    switch (obj.alignment) {
        case 'Before':
            if (ang >= fourty5 && ang <= one35) {
                hAlign = 'right';
                vAlign = obj.offset === 0.5 ? 'center' : 'top';
            }
            else if (ang >= two25 && ang <= three15) {
                hAlign = 'left';
                vAlign = obj.offset === 0.5 ? 'center' : 'bottom';
            }
            else if (ang > fourty5 && ang < two25) {
                vAlign = 'top';
                hAlign = obj.offset === 0.5 ? 'center' : 'right';
            }
            else {
                vAlign = 'bottom';
                hAlign = (obj.offset === 0.5) ? 'center' : 'left';
            }
            break;
        case 'After':
            if (ang >= fourty5 && ang <= one35) {
                hAlign = 'left';
                vAlign = obj.offset === 0.5 ? 'center' : 'top';
            }
            else if (ang >= two25 && ang <= three15) {
                hAlign = 'right';
                vAlign = obj.offset === 0.5 ? 'center' : 'bottom';
            }
            else if (ang > fourty5 && ang < two25) {
                vAlign = 'bottom';
                hAlign = obj.offset === 0.5 ? 'center' : 'right';
            }
            else {
                vAlign = 'top';
                hAlign = obj.offset === 0.5 ? 'center' : 'left';
            }
            break;
        case 'Center':
            hAlign = !isNullOrUndefined(obj.horizontalAlignment) ? obj.horizontalAlignment.toLowerCase() : 'center';
            vAlign = !isNullOrUndefined(obj.verticalAlignment) ? obj.verticalAlignment.toLowerCase() : 'center';
            break;
    }
    if (obj.offset === 0 || obj.offset === 1) {
        //let direction: string;
        var direction = getBezierDirection(pts[0], pts[1]);
        switch (direction) {
            case 'left':
                hAlign = obj.offset === 0 ? 'right' : 'left';
                break;
            case 'right':
                hAlign = obj.offset === 0 ? 'left' : 'right';
                break;
            case 'bottom':
                vAlign = obj.offset === 0 ? 'top' : 'bottom';
                break;
            case 'top':
                vAlign = obj.offset === 0 ? 'bottom' : 'top';
                break;
        }
    }
    return { hAlign: hAlign, vAlign: vAlign };
}
/**
 * getBezierDirection method \
 *
 * @returns {string } getBezierDirection method .\
 * @param {PointModel} src - provide the src  value.
 * @param { PointModel } tar - provide the tar  value.
 * @private
 */
export function getBezierDirection(src, tar) {
    if (Math.abs(tar.x - src.x) > Math.abs(tar.y - src.y)) {
        return src.x < tar.x ? 'right' : 'left';
    }
    else {
        return src.y < tar.y ? 'bottom' : 'top';
    }
}
/**
 * removeChildNodes method \
 *
 * @returns {void } removeChildNodes method .\
 * @param {NodeModel} node - provide the node  value.
 * @param { Diagram } diagram - provide the diagram  value.
 * @private
 */
export function removeChildNodes(node, diagram) {
    if (node instanceof Node && node.children) {
        for (var i = 0; i < node.children.length; i++) {
            if (diagram.nameTable[node.children[parseInt(i.toString(), 10)]].children) {
                removeChildNodes(node, diagram);
            }
            diagram.removeFromAQuad(diagram.nameTable[node.children[parseInt(i.toString(), 10)]]);
            diagram.removeObjectsFromLayer(diagram.nameTable[node.children[parseInt(i.toString(), 10)]]);
            delete diagram.nameTable[node.children[parseInt(i.toString(), 10)]];
        }
    }
}
/**
 * getChild method \
 *
 * @returns {string[] } getChild method .\
 * @param {Canvas} child - provide the child  value.
 * @param { string[] } children - provide the children  value.
 * @private
 */
export function getChild(child, children) {
    if (child && child.children && child.children.length > 0) {
        for (var j = 0; j < child.children.length; j++) {
            var subChild = child.children[parseInt(j.toString(), 10)];
            if (subChild instanceof Canvas) {
                getChild(subChild, children);
            }
        }
    }
    if (children.indexOf(child.id) === -1) {
        children.push(child.id);
    }
    return children;
}
/**
 * getSwimLaneChildren method \
 *
 * @returns {string[] } getSwimLaneChildren method .\
 * @param {NodeModel[]} nodes - provide the nodes  value.
 * @private
 */
function getSwimLaneChildren(nodes) {
    var children = [];
    var node;
    var grid;
    var childTable;
    var child;
    var gridChild = 'childTable';
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[parseInt(i.toString(), 10)];
        if (node.shape.type === 'SwimLane') {
            grid = node.wrapper.children[0];
            childTable = grid["" + gridChild];
            for (var _i = 0, _a = Object.keys(childTable); _i < _a.length; _i++) {
                var key = _a[_i];
                child = childTable["" + key];
                children = getChild(child, children);
            }
        }
    }
    return children;
}
/**
 * removeUnnecessaryNodes method \
 *
 * @returns {void } removeUnnecessaryNodes method .\
 * @param {string[]} children - provide the children  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @private
 */
function removeUnnecessaryNodes(children, diagram) {
    var nodes = diagram.nodes;
    if (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            if (children.indexOf(nodes[parseInt(i.toString(), 10)].id) !== -1) {
                nodes.splice(i, 1);
                i--;
            }
        }
    }
}
/**
 * serialize method \
 *
 * @returns {string } serialize method .\
 * @param {Diagram} model - provide the model  value.
 * @private
 */
export function serialize(model) {
    var removeNodes = getSwimLaneChildren(model.nodes);
    var clonedObject = cloneObject(model, model.getCustomProperty);
    clonedObject.selectedItems.nodes = [];
    clonedObject.selectedItems.connectors = [];
    clonedObject.selectedItems.wrapper = null;
    if (model.serializationSettings.preventDefaults) {
        clonedObject = preventDefaults(clonedObject, model);
    }
    // EJ2-913802 Sub process child won't get serialized when it is a child of a lane.
    model.nodes.forEach(function (node) {
        if (node.shape.type === 'SwimLane') {
            var processes_1 = model.commandHandler.findProcesses(node);
            processes_1.forEach(function (processId) {
                clonedObject.nodes.forEach(function (clonedNode) {
                    if (clonedNode.id === processId) {
                        var nodeWrapper = clonedNode.wrapper;
                        clonedNode.offsetX = nodeWrapper.offsetX;
                        clonedNode.offsetY = nodeWrapper.offsetY;
                    }
                });
            });
            if (processes_1.length > 0) {
                removeNodes = removeNodes.filter(function (removeNodeId) { return !processes_1.includes(removeNodeId); });
            }
        }
    });
    removeUnnecessaryNodes(removeNodes, clonedObject);
    return JSON.stringify(clonedObject);
}
/**
 * preventDefaults method \
 *
 * @returns {string } preventDefaults method .\
 * @param {Object} clonedObject - provide the clonedObject  value.
 * @param {object} model - provide the model  value.
 * @param {object} defaultObject - provide the defaultObject  value.
 * @param {boolean} isNodeShape - provide the isNodeShape  value.
 * @private
 */
// eslint-disable-next-line
function preventDefaults(clonedObject, model, defaultObject, isNodeShape) {
    defaultObject = getConstructor(model, defaultObject);
    var properties = [];
    properties = properties.concat(Object.keys(clonedObject));
    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
        var property = properties_1[_i];
        if (model instanceof Node) {
            isNodeShape = (property === 'shape') ? true : false;
        }
        if (clonedObject["" + property] instanceof Array) {
            preventArrayDefaults(clonedObject, defaultObject, model, property);
        }
        else if ((clonedObject["" + property] instanceof Object) && defaultObject && defaultObject["" + property]) {
            if (property !== 'wrapper') {
                clonedObject["" + property] = preventDefaults(clonedObject["" + property], model["" + property], defaultObject["" + property], isNodeShape);
            }
        }
        else if ((defaultObject && clonedObject["" + property] === defaultObject["" + property]) || clonedObject["" + property] === undefined) {
            if (!(isNodeShape && property === 'type') && !(model instanceof SwimLane && property === 'orientation')) {
                delete clonedObject["" + property];
            }
        }
        if (JSON.stringify(clonedObject["" + property]) === '[]' ||
            JSON.stringify(clonedObject["" + property]) === '{}' ||
            clonedObject["" + property] === undefined) {
            delete clonedObject["" + property];
        }
    }
    defaultObject = undefined;
    properties = undefined;
    return clonedObject;
}
/**
 * preventArrayDefaults method \
 *
 * @returns {void } preventArrayDefaults method .\
 * @param {object} clonedObject - provide the clonedObject  value.
 * @param {object} defaultObject - provide the defaultObject  value.
 * @param {object} model - provide the model  value.
 * @param {string} property - provide the property  value.
 * @private
 */
// eslint-disable-next-line
function preventArrayDefaults(clonedObject, defaultObject, model, property) {
    if (clonedObject["" + property].length === 0) {
        delete clonedObject["" + property];
        // eslint-disable-next-line
    }
    else if (clonedObject[property].every(function (element) { return typeof element === 'number'; })) {
        var i = void 0;
        var isSameArray = true;
        for (i = 0; i < clonedObject["" + property].length; i++) {
            if (isSameArray && clonedObject["" + property][parseInt(i.toString(), 10)] === defaultObject["" + property][parseInt(i.toString(), 10)]) {
                isSameArray = true;
            }
            else {
                isSameArray = false;
            }
        }
        if (isSameArray) {
            delete clonedObject["" + property];
        }
    }
    else {
        var i = void 0;
        // Bug 826717: Unable to select swimlane child nodes after serializing the diagram when we enable preventDefault property.
        // Removed the codition to delete the layers from clonedObject.
        if (clonedObject["" + property] && property !== 'layers') {
            for (i = clonedObject["" + property].length - 1; i >= 0; i--) {
                if (property === 'nodes' || property === 'connectors') {
                    clonedObject["" + property][parseInt(i.toString(), 10)].wrapper = null;
                }
                if (property !== 'dataManager') {
                    clonedObject["" + property][parseInt(i.toString(), 10)] = preventDefaults(clonedObject["" + property][parseInt(i.toString(), 10)], model["" + property][parseInt(i.toString(), 10)], (defaultObject["" + property] !== undefined ? defaultObject["" + property][parseInt(i.toString(), 10)] : []));
                    if (JSON.stringify(clonedObject["" + property][parseInt(i.toString(), 10)]) === '[]' ||
                        JSON.stringify(clonedObject["" + property][parseInt(i.toString(), 10)]) === '{}' ||
                        clonedObject["" + property][parseInt(i.toString(), 10)] === undefined) {
                        clonedObject["" + property].splice(i, 1);
                    }
                }
            }
        }
    }
    clonedObject = undefined;
}
/* eslint-disable */
/**
 * getConstructor method \
 *
 * @returns {object } getConstructor method .\
 * @param {object} model - provide the model  value.
 * @param {object} defaultObject - provide the defaultObject  value.
 * @private
 */
/* tslint:disable */
function getConstructor(model, defaultObject) {
    var obj = [];
    var constructor;
    var getClassName = 'getClassName';
    if (model[getClassName]) {
        //EJ2-59327 - Memory leak occurs in saveDiagram method 
        var parent_1 = new Diagram();
        switch (model[getClassName]()) {
            case 'Diagram':
                constructor = parent_1;
                break;
            case 'Node':
                constructor = new Node(parent_1, '', obj);
                break;
            case 'Path':
                constructor = new Path(parent_1, '', obj);
                break;
            case 'Native':
                constructor = new Native(parent_1, '', obj);
                break;
            case 'Html':
                constructor = new Html(parent_1, '', obj);
                break;
            case 'Image':
                constructor = new Image(parent_1, '', obj);
                break;
            case 'Text':
                constructor = new Text(parent_1, '', obj);
                break;
            case 'BasicShape':
                constructor = new BasicShape(parent_1, '', obj);
                break;
            case 'FlowShape':
                constructor = new FlowShape(parent_1, '', obj);
                break;
            case 'BpmnShape':
                constructor = new BpmnShape(parent_1, '', obj);
                break;
            case 'UmlActivityShape':
                constructor = new UmlActivityShape(parent_1, '', obj);
                break;
            case 'UmlClassifierShape':
                constructor = new UmlClassifierShape(parent_1, '', obj);
                break;
            case 'SwimLane':
                constructor = new SwimLane(parent_1, '', obj);
                if (model.header) {
                    constructor.header = new Header(parent_1, '', obj);
                    constructor.header.style.fill = '';
                }
                break;
            case 'ShapeAnnotation':
                constructor = new ShapeAnnotation(parent_1, '', obj);
                break;
            case 'PointPort':
                constructor = new PointPort(parent_1, '', obj);
                break;
            case 'BpmnGateway':
                constructor = new BpmnGateway(parent_1, '', obj);
                break;
            case 'BpmnDataObject':
                constructor = new BpmnDataObject(parent_1, '', obj);
                break;
            case 'BpmnEvent':
                constructor = new BpmnEvent(parent_1, '', obj);
                break;
            case 'BpmnSubEvent':
                constructor = new BpmnSubEvent(parent_1, '', obj);
                break;
            case 'BpmnActivity':
                constructor = new BpmnActivity(parent_1, '', obj);
                break;
            case 'BpmnAnnotation':
                constructor = new BpmnAnnotation(parent_1, '', obj);
                break;
            case 'MethodArguments':
                constructor = new MethodArguments(parent_1, '', obj);
                break;
            case 'UmlClassAttribute':
                constructor = new UmlClassAttribute(parent_1, '', obj);
                break;
            case 'UmlClassMethod':
                constructor = new UmlClassMethod(parent_1, '', obj);
                break;
            case 'UmlClass':
                constructor = new UmlClass(parent_1, '', obj);
                break;
            case 'UmlInterface':
                constructor = new UmlInterface(parent_1, '', obj);
                break;
            case 'UmlEnumerationMember':
                constructor = new UmlEnumerationMember(parent_1, '', obj);
                break;
            case 'UmlEnumeration':
                constructor = new UmlEnumeration(parent_1, '', obj);
                break;
            case 'Lane':
                constructor = new Lane(parent_1, '', obj);
                break;
            case 'Phase':
                constructor = new Phase(parent_1, '', obj);
                break;
            case 'ChildContainer':
                constructor = new ChildContainer();
                break;
            case 'Connector':
                constructor = new Connector(parent_1, '', obj);
                break;
            case 'StraightSegment':
                constructor = new StraightSegment(parent_1, '', obj);
                break;
            case 'BezierSegment':
                constructor = new BezierSegment(parent_1, '', obj);
                break;
            case 'OrthogonalSegment':
                constructor = new OrthogonalSegment(parent_1, '', obj);
                break;
            case 'PathAnnotation':
                constructor = new PathAnnotation(parent_1, '', obj);
                break;
            case 'Stop':
                constructor = new Stop(parent_1, '', obj);
                break;
            case 'Point':
                if (!defaultObject) {
                    constructor = new Point(parent_1, '', obj);
                }
                else {
                    constructor = defaultObject;
                }
                break;
            case 'UserHandle':
                constructor = new UserHandle(parent_1, '', obj);
                break;
            case 'Command':
                constructor = new Command(parent_1, '', obj);
                break;
        }
    }
    else {
        constructor = defaultObject;
    }
    parent = undefined;
    defaultObject = undefined;
    return constructor;
}
/* eslint-enable */
/* eslint-disable */
/** @private */
export function deserialize(model, diagram) {
    diagram.enableServerDataBinding(false);
    var blazorAction = diagram.blazorActions;
    diagram.blazorActions = diagram.addConstraints(blazorAction, BlazorAction.ClearObject);
    diagram.clear();
    diagram.blazorActions = diagram.removeConstraints(blazorAction, BlazorAction.ClearObject);
    diagram.protectPropertyChange(true);
    var map = diagram.dataSourceSettings.doBinding;
    var nodeTemp = diagram.setNodeTemplate;
    var getDescription = diagram.getDescription;
    var getCustomProperty = diagram.getCustomProperty;
    var commands = {};
    for (var _i = 0, _a = diagram.commandManager.commands; _i < _a.length; _i++) {
        var command = _a[_i];
        commands[command.name] = { execute: command.execute, canExecute: command.canExecute };
    }
    var arrangeTickHorizontal = diagram.rulerSettings.horizontalRuler.arrangeTick;
    var arrangeTickVertical = diagram.rulerSettings.verticalRuler.arrangeTick;
    var getLayoutInfo = diagram.layout.getLayoutInfo;
    var getBranch = diagram.layout.getBranch;
    var nodeDefaults = diagram.getNodeDefaults;
    var connectorDefaults = diagram.getConnectorDefaults;
    var dataObj;
    if (!(model instanceof Object)) {
        dataObj = JSON.parse(model);
    }
    else {
        dataObj = model;
    }
    dataObj = upgrade(dataObj);
    diagram.contextMenuSettings = dataObj.contextMenuSettings || {};
    diagram.constraints = dataObj.constraints || DiagramConstraints.Default;
    diagram.tool = dataObj.tool || DiagramTools.Default;
    diagram.bridgeDirection = dataObj.bridgeDirection || 'Top';
    diagram.pageSettings = dataObj.pageSettings || {};
    diagram.drawingObject = dataObj.drawingObject || undefined;
    diagram.tooltip = dataObj.tooltip || {};
    diagram.addInfo = dataObj.addInfo || undefined;
    diagram.getDescription = getDescription;
    diagram.scrollSettings = dataObj.scrollSettings || {};
    diagram.commandManager = dataObj.commandManager || {};
    /**
    * EJ2-62846-Exception occurs after save and load when layers are undefined.
    */
    if (dataObj.layers && dataObj.layers.length > 0) {
        sortLayerObjects(dataObj);
    }
    diagram.layers = dataObj.layers || [];
    diagram.rulerSettings.horizontalRuler.arrangeTick = arrangeTickHorizontal;
    diagram.rulerSettings.verticalRuler.arrangeTick = arrangeTickVertical;
    for (var _b = 0, _c = diagram.commandManager.commands; _b < _c.length; _b++) {
        var cmd = _c[_b];
        if (commands[cmd.name]) {
            cmd.execute = commands[cmd.name].execute;
            cmd.canExecute = commands[cmd.name].canExecute;
        }
    }
    diagram.backgroundColor = dataObj.backgroundColor || 'transparent';
    diagram.basicElements = dataObj.basicElements || [];
    // EJ2-66465 - Added below code to empty the segment collection if connector type is bezier
    if (dataObj.connectors) {
        for (var i = 0; i < dataObj.connectors.length; i++) {
            // EJ2-69816 - Added below code to empty the segment collection if connector type is bezier and allowSegmentsReset is true
            if (dataObj.connectors[i].type === 'Bezier' && dataObj.connectors[i].segments.length > 0 && dataObj.connectors[i].bezierSettings && dataObj.connectors[i].bezierSettings.allowSegmentsReset) {
                dataObj.connectors[i].segments = [];
            }
        }
    }
    diagram.connectors = dataObj.connectors || [];
    diagram.dataSourceSettings = dataObj.dataSourceSettings || {};
    diagram.dataSourceSettings.doBinding = map;
    diagram.height = dataObj.height || '100%';
    diagram.setNodeTemplate = nodeTemp;
    diagram.getConnectorDefaults = connectorDefaults;
    diagram.getNodeDefaults = nodeDefaults;
    diagram.getCustomProperty = getCustomProperty;
    diagram.mode = dataObj.mode || 'SVG';
    if (dataObj.nodes) {
        for (var i = 0; i < dataObj.nodes.length; i++) {
            if (dataObj.nodes[i].shape && dataObj.nodes[i].shape.type === 'SwimLane') {
                if (dataObj.nodes[i].wrapper == null) {
                    {
                        dataObj.nodes[i].wrapper = {
                            actualSize: { width: dataObj.nodes[i].width, height: dataObj.nodes[i].height },
                            offsetX: dataObj.nodes[i].offsetX, offsetY: dataObj.nodes[i].offsetY
                        };
                    }
                }
                pasteSwimLane(dataObj.nodes[i], undefined, undefined, undefined, undefined, true);
            }
        }
    }
    diagram.nodes = dataObj.nodes || [];
    changeOldFlipDirectionType(diagram.nodes);
    changeOldFlipDirectionType(diagram.connectors);
    diagram.rulerSettings = dataObj.rulerSettings || {};
    diagram.snapSettings = dataObj.snapSettings || {};
    diagram.width = dataObj.width || '100%';
    diagram.layout = dataObj.layout || {};
    if (dataObj.layout && dataObj.layout.type !== "None") {
        diagram.canLayout = false;
    }
    diagram.layout.getLayoutInfo = getFunction(getLayoutInfo);
    diagram.layout.getBranch = getFunction(getBranch);
    diagram.diagramActions = 0;
    diagram.isLoading = true;
    diagram.protectPropertyChange(false);
    var key = 'refresh';
    var component;
    for (var i = 0; i < diagram.views.length; i++) {
        component = diagram.views[diagram.views[i]];
        diagram.blazorActions = diagram.addConstraints(blazorAction, BlazorAction.ClearObject);
        component.refresh();
        // Bug 849892: The Overview does not update properly When loading the diagram with the loadDiagram API.
        // For this -> EJ2-69580  issue the overview refresh got prevented which leads to this Bug 849892, so added below condition to reset 
        // the overview.
        if (component instanceof Overview) {
            component.onPropertyChanged({ sourceID: component.sourceID }, {});
        }
        diagram.blazorActions = diagram.removeConstraints(blazorAction, BlazorAction.ClearObject);
        if (component instanceof Diagram) {
            diagram.element.classList.add('e-diagram');
        }
    }
    //881117 - Event to notify after diagram elements are loaded.  
    var args = { name: 'loaded', diagram: diagram };
    diagram.triggerEvent(DiagramEvent.loaded, args);
    if (dataObj.selectedItems) {
        dataObj.selectedItems.nodes = [];
        dataObj.selectedItems.connectors = [];
        //EJ2-61674 Exception occurs when we move the node after save and load
        dataObj.selectedItems.selectedObjects = [];
    }
    diagram.selectedItems = dataObj.selectedItems;
    diagram.enableServerDataBinding(true);
    diagram.canLayout = true;
    diagram.swimlaneChildTable = {};
    diagram.swimlaneZIndexTable = {};
    // EJ2-913802 Sub process child won't get serialized when it is a child of a lane.
    diagram.nodes.forEach(function (node) {
        if (node.shape.type === 'SwimLane') {
            var processes = diagram.commandHandler.findProcesses(node);
            processes.forEach(function (processId) {
                var child = diagram.nameTable[processId];
                if (child && diagram.nameTable[child.processId]) {
                    var targetWrapper = diagram.nameTable[child.processId].wrapper;
                    targetWrapper.children.push(child.wrapper);
                }
            });
        }
    });
    return dataObj;
}
/**
 * To change the string type flip into enum type.\
 *
 * @param {(NodeModel | ConnectorModel)[]} obj - provide the node or connector collection.
 * @private
 */
export function changeOldFlipDirectionType(obj) {
    // Filter elements that have `flip` set as a string
    var filteredElements = obj.filter(function (element) { return typeof element.flip === 'string'; });
    // Loop through the filtered elements and update their `flip` property
    for (var _i = 0, filteredElements_1 = filteredElements; _i < filteredElements_1.length; _i++) {
        var element = filteredElements_1[_i];
        switch (element.flip) {
            case 'Horizontal':
                element.flip = FlipDirection.Horizontal;
                break;
            case 'Vertical':
                element.flip = FlipDirection.Vertical;
                break;
            case 'Both':
                element.flip = FlipDirection.Both;
                break;
            case 'None':
                element.flip = FlipDirection.None;
                break;
        }
    }
}
/**
 * EJ2-61537 - Connectors not connected to the node after save and load
 * when we add nodes and connectors at runtime.
 * */
/**
* Sort the nodes and connectors in the layers.
*
* @param {Diagram} dataObj - provide the model value.
* @private
* */
function sortLayerObjects(dataObj) {
    var i, j, k;
    var layers = [];
    for (i = 0; i < dataObj.layers.length; i++) {
        for (j = 0; j < dataObj.layers[i].objects.length; j++) {
            if (dataObj.nodes) {
                for (k = 0; k < dataObj.nodes.length; k++) {
                    if (dataObj.layers[i].objects[j] === dataObj.nodes[k].id) {
                        layers.push(dataObj.layers[i].objects[j]);
                    }
                }
            }
        }
        for (j = 0; j < dataObj.layers[i].objects.length; j++) {
            if (dataObj.connectors) {
                for (k = 0; k < dataObj.connectors.length; k++) {
                    if (dataObj.layers[i].objects[j] === dataObj.connectors[k].id) {
                        layers.push(dataObj.layers[i].objects[j]);
                    }
                }
            }
        }
        dataObj.layers[i].objects = layers;
        layers = [];
    }
}
/* eslint-enable */
/**
 * upgrade method \
 *
 * @returns {Diagram } upgrade method .\
 * @param {Diagram} dataObj - provide the model  value.
 * @private
 */
export function upgrade(dataObj) {
    if (dataObj && (dataObj.version === undefined || (dataObj.version < 17.1)) && dataObj.nodes) {
        var nodes = dataObj.nodes;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (node && node.ports && node.ports.length > 0) {
                for (var _a = 0, _b = node.ports; _a < _b.length; _a++) {
                    var port = _b[_a];
                    if (port && port.constraints && port.constraints === PortConstraints.None) {
                        port.constraints = PortConstraints.Default;
                    }
                }
            }
        }
    }
    return dataObj;
}
/**
 * updateStyle method \
 *
 * @returns {void } updateStyle method .\
 * @param {TextStyleModel} changedObject - provide the changedObject  value.
 * @param {DiagramElement} target - provide the target  value.
 * @private
 */
export function updateStyle(changedObject, target) {
    //since text style model is the super set of shape style model, we used text style model
    var style = target.style;
    var textElement = target;
    target.canApplyStyle = true;
    for (var _i = 0, _a = Object.keys(changedObject); _i < _a.length; _i++) {
        var key = _a[_i];
        switch (key) {
            case 'fill':
                style.fill = changedObject.fill;
                if (style instanceof StrokeStyle) {
                    /* tslint:disable:no-string-literal */
                    style['fill'] = 'transparent';
                }
                break;
            case 'textOverflow':
                style.textOverflow = changedObject.textOverflow;
                break;
            case 'opacity':
                style.opacity = changedObject.opacity;
                break;
            case 'strokeColor':
                style.strokeColor = changedObject.strokeColor;
                break;
            case 'strokeDashArray':
                style.strokeDashArray = changedObject.strokeDashArray;
                break;
            case 'strokeWidth':
                style.strokeWidth = changedObject.strokeWidth;
                break;
            case 'bold':
                style.bold = changedObject.bold;
                break;
            case 'color':
                style.color = changedObject.color;
                break;
            case 'textWrapping':
                style.textWrapping = changedObject.textWrapping;
                break;
            case 'fontFamily':
                style.fontFamily = changedObject.fontFamily;
                break;
            case 'fontSize':
                style.fontSize = changedObject.fontSize;
                break;
            case 'italic':
                style.italic = changedObject.italic;
                break;
            case 'textAlign':
                style.textAlign = changedObject.textAlign;
                break;
            case 'whiteSpace':
                style.whiteSpace = changedObject.whiteSpace;
                break;
            case 'textDecoration':
                style.textDecoration = changedObject.textDecoration;
                break;
            case 'gradient':
                if (style.gradient) {
                    updateGradient(changedObject.gradient, style.gradient);
                    break;
                }
        }
    }
    if (target instanceof TextElement) {
        textElement.refreshTextElement();
    }
}
/**
 * updateGradient method \
 *
 * @returns {void } updateGradient method .\
 * @param {GradientModel | LinearGradientModel | RadialGradientModel} changedGradient - provide the changedGradient  value.
 * @param {GradientModel | LinearGradientModel | RadialGradientModel} targetGradient - provide the targetGradient  value.
 * @private
 */
function updateGradient(changedGradient, targetGradient) {
    for (var _i = 0, _a = Object.keys(changedGradient); _i < _a.length; _i++) {
        var key = _a[_i];
        switch (key) {
            case 'type':
                targetGradient.type = changedGradient.type;
                break;
            case 'x1':
                targetGradient.x1 = changedGradient.x1;
                break;
            case 'x2':
                targetGradient.x2 = changedGradient.x2;
                break;
            case 'y1':
                targetGradient.y1 = changedGradient.y1;
                break;
            case 'y2':
                targetGradient.y2 = changedGradient.y2;
                break;
            case 'cx':
                targetGradient.cx = changedGradient.cx;
                break;
            case 'cy':
                targetGradient.cy = changedGradient.cy;
                break;
            case 'fx':
                targetGradient.fx = changedGradient.fx;
                break;
            case 'fy':
                targetGradient.fy = changedGradient.fy;
                break;
            case 'r':
                targetGradient.r = changedGradient.r;
                break;
            case 'stops':
                targetGradient.stops = changedGradient.stops;
                break;
        }
    }
}
/* eslint-disable */
/**
 * updateHyperlink method \
 *
 * @returns {void } updateHyperlink method .\
 * @param {HyperlinkModel} changedObject - provide the changedObject  value.
 * @param {DiagramElement} target - provide the target  value.
 * @param {AnnotationModel} actualAnnotation - provide the actualAnnotation  value.
 * @private
 */
export function updateHyperlink(changedObject, target, actualAnnotation) {
    var textElement = target;
    var hyperlink = textElement.hyperlink;
    for (var _i = 0, _a = Object.keys(changedObject); _i < _a.length; _i++) {
        var key = _a[_i];
        switch (key) {
            case 'color':
                textElement.style.color = hyperlink.color = changedObject.color;
                break;
            case 'content':
                textElement.content = hyperlink.content = changedObject.content || hyperlink.link;
                break;
            case 'link':
                var labelStyle = actualAnnotation.style;
                textElement.style.color = changedObject.link ? hyperlink.color : labelStyle.color;
                textElement.style.textDecoration = changedObject.link ? hyperlink.textDecoration : actualAnnotation.style.textDecoration;
                textElement.content = changedObject.link ? hyperlink.content || changedObject.link : actualAnnotation.content;
                hyperlink.link = changedObject.link;
                break;
            case 'textDecoration':
                textElement.style.textDecoration = hyperlink.textDecoration = changedObject.textDecoration;
                break;
            case 'hyperlinkOpenState':
                hyperlink.hyperlinkOpenState = changedObject.hyperlinkOpenState;
                break;
        }
    }
}
/* eslint-enable */
/**
 * updateShapeContent method \
 *
 * @returns {void } updateShapeContent method .\
 * @param {DiagramElement} content - provide the content  value.
 * @param {Node} actualObject - provide the actualObject  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @private
 */
export function updateShapeContent(content, actualObject, diagram) {
    content.width = actualObject.width;
    content.height = actualObject.height;
    content.minHeight = actualObject.minHeight;
    content.maxHeight = actualObject.maxHeight;
    content.minWidth = actualObject.minWidth;
    content.maxWidth = actualObject.maxWidth;
    content.horizontalAlignment = actualObject.wrapper.children[0].horizontalAlignment;
    content.verticalAlignment = actualObject.wrapper.children[0].verticalAlignment;
    content.relativeMode = actualObject.wrapper.children[0].relativeMode;
    content.visible = actualObject.wrapper.children[0].visible;
    if (actualObject.shape instanceof Text) {
        content.margin = actualObject.shape.margin;
    }
    content.id = actualObject.wrapper.children[0].id;
    content.style = actualObject.style;
    //let view: View;
    for (var _i = 0, _a = diagram.views; _i < _a.length; _i++) {
        var elementId = _a[_i];
        removeElement(actualObject.id + '_groupElement', elementId);
        removeElement(actualObject.id + '_content_groupElement', elementId);
        removeElement(actualObject.id + '_html_element', elementId);
    }
    actualObject.wrapper.children.splice(0, 1);
    actualObject.wrapper.children.splice(0, 0, content);
}
/* eslint-disable */
/**
 * updateShape method \
 *
 * @returns {void } updateShape method .\
 * @param {Node} node - provide the node  value.
 * @param {Node} actualObject - provide the actualObject  value.
 * @param {Node} oldObject - provide the oldObject  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @private
 */
export function updateShape(node, actualObject, oldObject, diagram) {
    var content = new DiagramElement();
    var i;
    //let textStyle: TextStyleModel; let nodeStyle: TextStyleModel;
    switch (node.shape.type) {
        case 'Path':
            var pathContent = new PathElement();
            pathContent.data = actualObject.shape.data;
            content = pathContent;
            updateShapeContent(content, actualObject, diagram);
            break;
        case 'Image':
            var imageContent = new ImageElement();
            imageContent.source = actualObject.shape.source;
            imageContent.imageAlign = actualObject.shape.align;
            imageContent.imageScale = actualObject.shape.scale;
            content = imageContent;
            updateShapeContent(content, actualObject, diagram);
            break;
        case 'Text':
            //issue
            var textContent = new TextElement();
            //  (textContent as TextElement).content = (node.shape as TextModel).content;
            content = textContent;
            updateShapeContent(content, actualObject, diagram);
            break;
        case 'Basic':
            var element = (actualObject.shape.shape === 'Rectangle') ? new DiagramElement() : new PathElement();
            if ((!isBlazor() && actualObject.shape.shape === 'Polygon')) {
                element.data = getPolygonPath(actualObject.shape.points);
            }
            else {
                element.data = getBasicShape(actualObject.shape.shape);
            }
            if ((!isBlazor() && actualObject.shape.shape === 'Rectangle')) {
                element.cornerRadius = actualObject.shape.cornerRadius;
            }
            //EJ2-70880 - Node disappeared after changing shape and type dynamically.
            content = element;
            updateShapeContent(content, actualObject, diagram);
            break;
        case 'Flow':
            /* eslint-disable */
            var flowShapeElement = new PathElement();
            var shape = actualObject.shape.shape;
            flowShapeElement.data = getFlowShape(shape);
            content = flowShapeElement;
            updateShapeContent(content, actualObject, diagram);
            break;
        case 'Native':
            var nativeContent = new DiagramNativeElement(node.id, diagram.element.id);
            nativeContent.content = actualObject.shape.content;
            nativeContent.scale = actualObject.shape.scale;
            content = nativeContent;
            updateShapeContent(content, actualObject, diagram);
            break;
        case 'HTML':
            var htmlContent = new DiagramHtmlElement(actualObject.id, diagram.element.id);
            htmlContent.content = actualObject.shape.content;
            content = htmlContent;
            updateShapeContent(content, actualObject, diagram);
    }
    if (node.shape.type === undefined || node.shape.type === oldObject.shape.type) {
        updateContent(node, actualObject, diagram, oldObject);
    }
    else {
        content.width = actualObject.wrapper.children[0].width;
        content.height = actualObject.wrapper.children[0].height;
        if (actualObject.shape instanceof Text) {
            content.margin = actualObject.shape.margin;
        }
        content.style = actualObject.style;
        actualObject.wrapper.children[0] = content;
    }
}
/* eslint-enable */
/**
 * updateContent method \
 *
 * @returns {void } updateContent method .\
 * @param {Node} newValues - provide the newValues  value.
 * @param {Node} actualObject - provide the actualObject  value.
 * @param {Diagram} diagram - provide the diagram  value.
 * @param {Node} oldObject - provide the oldObject  value.
 * @private
 */
export function updateContent(newValues, actualObject, diagram, oldObject) {
    if (Object.keys(newValues.shape).length > 0) {
        if (actualObject.shape.type === 'Path' && newValues.shape.data !== undefined) {
            actualObject.wrapper.children[0].data = newValues.shape.data;
        }
        else if (actualObject.shape.type === 'Text' && newValues.shape.content !== undefined) {
            actualObject.wrapper.children[0].content = newValues.shape.content;
        }
        else if (actualObject.shape.type === 'Image' && newValues.shape.source !== undefined) {
            actualObject.wrapper.children[0].source = newValues.shape.source;
        }
        else if (actualObject.shape.type === 'Native') {
            var nativeElement = void 0;
            for (var i = 0; i < diagram.views.length; i++) {
                nativeElement = getDiagramElement(actualObject.wrapper.children[0].id + '_native_element', diagram.views[parseInt(i.toString(), 10)]);
                if (newValues.shape.content !== undefined && nativeElement) {
                    nativeElement.removeChild(nativeElement.children[0]);
                    actualObject.wrapper.children[0].content = newValues.shape.content;
                    nativeElement.appendChild(getContent(actualObject.wrapper.children[0], false));
                }
            }
            actualObject.wrapper.children[0].scale = newValues.shape.scale ?
                newValues.shape.scale : actualObject.wrapper.children[0].scale;
        }
        else if (actualObject.shape.type === 'HTML') {
            var htmlElement = void 0;
            for (var i = 0; i < diagram.views.length; i++) {
                htmlElement = getDiagramElement(actualObject.wrapper.children[0].id + '_html_element', diagram.views[parseInt(i.toString(), 10)]);
                if (htmlElement) {
                    htmlElement.removeChild(htmlElement.children[0]);
                    actualObject.wrapper.children[0].content = newValues.shape.content;
                    htmlElement.appendChild(getContent(actualObject.wrapper.children[0], true));
                }
            }
        }
        else if (actualObject.shape.type === 'Flow' && (newValues.shape.shape !== undefined)) {
            actualObject.shape.shape = newValues.shape.shape;
            var shapes = actualObject.shape.shape;
            var flowshapedata = getFlowShape(shapes.toString());
            actualObject.wrapper.children[0].data = flowshapedata;
        }
        else if (actualObject.shape.type === 'UmlActivity' &&
            (!isBlazor() && newValues.shape.shape !== undefined)) {
            updateUmlActivityNode(actualObject, newValues);
        }
        else if (newValues.shape.cornerRadius !== undefined) {
            actualObject.wrapper.children[0].cornerRadius = newValues.shape.cornerRadius;
        }
        else if (actualObject.shape.type === 'Basic' && (oldObject && oldObject.shape.shape === 'Rectangle')) {
            var basicshape = new PathElement();
            var basicshapedata = getBasicShape(actualObject.shape.shape);
            basicshape.data = basicshapedata;
            var content = basicshape;
            updateShapeContent(content, actualObject, diagram);
        }
        else if (newValues.shape.shape !== undefined) {
            actualObject.shape.shape = newValues.shape.shape;
            var shapes = actualObject.shape.shape;
            var basicShapeData = getBasicShape(shapes.toString());
            actualObject.wrapper.children[0].data = basicShapeData;
        }
    }
    actualObject.wrapper.children[0].canMeasurePath = true;
}
/**
 * updateUmlActivityNode method \
 *
 * @returns {void } updateUmlActivityNode method .\
 * @param {Node} actualObject - provide the newValues  value.
 * @param {Node} newValues - provide the actualObject  value.
 * @private
 */
export function updateUmlActivityNode(actualObject, newValues) {
    if (!isBlazor()) {
        actualObject.shape.shape = newValues.shape.shape;
    }
    else {
        actualObject.shape.umlActivityShape = newValues.shape.umlActivityShape;
    }
    var shapes = !isBlazor() ? actualObject.shape.shape :
        actualObject.shape.umlActivityShape;
    var umlActivityShapeData = getUMLActivityShape(shapes.toString());
    if ((!isBlazor() && actualObject.shape.shape === 'InitialNode')) {
        actualObject.wrapper.children[0].style.fill = 'black';
    }
    else if ((!isBlazor() && (actualObject.shape.shape === 'ForkNode' ||
        actualObject.shape.shape === 'JoinNode'))) {
        actualObject.wrapper.children[0].style.fill = 'black';
    }
    else if ((!isBlazor() && actualObject.shape.shape === 'FinalNode')) {
        if (actualObject instanceof Node) {
            actualObject.wrapper = getUMLFinalNode(actualObject);
        }
    }
    if (umlActivityShapeData) {
        actualObject.wrapper.children[0].data = umlActivityShapeData;
    }
}
/**
 * getUMLFinalNode method \
 *
 * @returns {Canvas } getUMLFinalNode method .\
 * @param {Node} node - provide the newValues  value.
 * @private
 */
export function getUMLFinalNode(node) {
    var finalNodeShape = new Canvas();
    finalNodeShape.style.fill = 'transparent';
    //childNode0
    var pathData = 'M 25 50 C 11.21 50 0 38.79 0 25 C 0 11.21 11.21 0 25 0 C 38.78 0 50 11.21 50 25' +
        ' C 50 38.79 38.78 50 25 50';
    var innerFinalNode = new PathElement();
    innerFinalNode.data = pathData;
    innerFinalNode.id = node.id + '_0_finalNode';
    innerFinalNode.horizontalAlignment = 'Center';
    innerFinalNode.verticalAlignment = 'Center';
    innerFinalNode.relativeMode = 'Object';
    innerFinalNode.style.strokeColor = node.style.strokeColor;
    innerFinalNode.style.strokeWidth = node.style.strokeWidth;
    //childNode1
    var outerFinalNode = new PathElement();
    outerFinalNode.data = pathData;
    outerFinalNode.id = node.id + '_1_finalNode';
    outerFinalNode.horizontalAlignment = 'Center';
    outerFinalNode.verticalAlignment = 'Center';
    outerFinalNode.relativeMode = 'Object';
    outerFinalNode.style.fill = node.style.fill;
    outerFinalNode.style.strokeColor = node.style.strokeColor;
    outerFinalNode.style.strokeWidth = node.style.strokeWidth;
    //append child and set style
    finalNodeShape.children = [innerFinalNode, outerFinalNode];
    finalNodeShape.children[0].width = node.width;
    finalNodeShape.children[0].height = node.height;
    finalNodeShape.children[1].height = node.height / 1.5;
    finalNodeShape.children[1].width = node.width / 1.5;
    finalNodeShape.style.strokeWidth = 0;
    finalNodeShape.style.strokeColor = 'transparent';
    return finalNodeShape;
}
/**
 * getUMLActivityShapes method \
 *
 * @returns {DiagramElement } getUMLActivityShapes method .\
 * @param {PathElement} umlActivityShape - provide the umlActivityShape  value.
 * @param {DiagramElement} content - provide the content  value.
 * @param {Node} node - provide the node  value.
 * @private
 */
export function getUMLActivityShapes(umlActivityShape, content, node) {
    var shape = node.shape.shape;
    var umlActivityShapeData = getUMLActivityShape(shape);
    umlActivityShape.data = umlActivityShapeData;
    content = umlActivityShape;
    switch (shape) {
        case 'StructuredNode':
            if (node.annotations) {
                for (var i = 0; i < node.annotations.length; i++) {
                    node.annotations[parseInt(i.toString(), 10)].content = '<<' + node.annotations[parseInt(i.toString(), 10)].content + '>>';
                }
            }
            content = umlActivityShape;
            break;
        case 'FinalNode':
            content = getUMLFinalNode(node);
            break;
    }
    return content;
}
/**
 * removeGradient method \
 *
 * @returns {void } removeGradient method .\
 * @param {string} svgId - provide the umlActivityShape  value.
 * @private
 */
export function removeGradient(svgId) {
    removeElement(svgId + '_linear');
    removeElement(svgId + '_radial');
}
/**
 * removeItem method \
 *
 * @returns {void } removeItem method .\
 * @param {string[]} array - provide the umlActivityShape  value.
 * @param {string} item - provide the umlActivityShape  value.
 * @private
 */
export function removeItem(array, item) {
    var index = array.indexOf(item);
    if (index >= 0) {
        array.splice(index, 1);
    }
}
/**
 * updateConnector method \
 *
 * @returns {void } updateConnector method .\
 * @param {Connector} connector - provide the connector  value.
 * @param {PointModel[]} points - provide the points  value.
 * @param {DiagramAction} diagramActions - provide the diagramActions  value.
 * @private
 */
export function updateConnector(connector, points, diagramActions) {
    var anglePoint; //let srcDecorator: DecoratorModel;
    //let targetPoint: PointModel;
    connector.intermediatePoints = points;
    connector.updateSegmentElement(connector, points, connector.wrapper.children[0], diagramActions);
    var srcDecorator = connector.sourceDecorator;
    if (connector.type === 'Bezier') {
        var firstSegment = connector.segments[0];
        var lastSegment = connector.segments[connector.segments.length - 1];
        anglePoint = [!Point.isEmptyPoint(lastSegment.point2) ? lastSegment.point2 : lastSegment.bezierPoint2,
            !Point.isEmptyPoint(firstSegment.point1) ? firstSegment.point1 : firstSegment.bezierPoint1];
    }
    else {
        anglePoint = connector.intermediatePoints;
    }
    points = connector.clipDecorators(connector, points, diagramActions);
    var element = connector.wrapper.children[0];
    element.canMeasurePath = true;
    element = connector.wrapper.children[1];
    connector.updateDecoratorElement(element, points[0], anglePoint[1], srcDecorator);
    //const targetPoint: PointModel = connector.targetPoint;
    var tarDecorator = connector.targetDecorator;
    element = connector.wrapper.children[2];
    connector.updateDecoratorElement(element, points[points.length - 1], anglePoint[anglePoint.length - 2], tarDecorator);
    connector.updateShapeElement(connector);
}
/**
 * getUserHandlePosition method \
 *
 * @returns {PointModel } getUserHandlePosition method .\
 * @param {SelectorModel} selectorItem - provide the connector  value.
 * @param {UserHandleModel} handle - provide the handle  value.
 * @param {Transforms} transform - provide the transform  value.
 * @private
 */
export function getUserHandlePosition(selectorItem, handle, transform) {
    var wrapper = selectorItem.wrapper;
    //let positionPoints: PointModel;
    var bounds = wrapper.bounds;
    var offset = handle.offset;
    var size = handle.size / transform.scale;
    var margin = handle.margin;
    var point;
    var left = wrapper.offsetX - wrapper.actualSize.width * wrapper.pivot.x;
    var top = wrapper.offsetY - wrapper.actualSize.height * wrapper.pivot.y;
    point = { x: 0, y: 0 };
    if (selectorItem.nodes.length > 0) {
        switch (handle.side) {
            case 'Top':
                point.x += left + offset * wrapper.actualSize.width;
                point.y += top - (size);
                break;
            case 'Bottom':
                point.x += left + offset * wrapper.actualSize.width;
                point.y += top + wrapper.actualSize.height + (size);
                break;
            case 'Left':
                point.x += left - (size);
                point.y += top + offset * wrapper.actualSize.height;
                break;
            case 'Right':
                point.x += left + wrapper.actualSize.width + (size);
                point.y += top + offset * wrapper.actualSize.height;
                break;
        }
        point.x += ((margin.left - margin.right) / transform.scale) +
            (size / 2) * (handle.horizontalAlignment === 'Center' ? 0 : (handle.horizontalAlignment === 'Right' ? -1 : 1));
        point.y += ((margin.top - margin.bottom) / transform.scale) +
            (size / 2) * (handle.verticalAlignment === 'Center' ? 0 : (handle.verticalAlignment === 'Top' ? -1 : 1));
    }
    else if (selectorItem.connectors.length > 0) {
        var connector = selectorItem.connectors[0];
        var annotation = { offset: offset };
        var connectorOffset = getOffsetOfConnector(connector.intermediatePoints, annotation);
        var index = connectorOffset.index;
        point = connectorOffset.point;
        var getPointloop = getAnnotationPosition(connector.intermediatePoints, annotation, bounds);
        //const points: PointModel[] = connector.intermediatePoints;
        //const offsetLength: number;
        var angle = getPointloop.angle;
        var matrix = identityMatrix();
        rotateMatrix(matrix, -angle, connector.intermediatePoints[parseInt(index.toString(), 10)].x, connector.intermediatePoints[parseInt(index.toString(), 10)].y);
        point = transformPointByMatrix(matrix, point);
        point.x += (margin.left - margin.right) +
            (size / 2) * (handle.horizontalAlignment === 'Center' ? 0 : (handle.horizontalAlignment === 'Right' ? -1 : 1));
        point.y += (margin.top - margin.bottom) +
            (size / 2) * (handle.verticalAlignment === 'Center' ? 0 : (handle.verticalAlignment === 'Top' ? -1 : 1));
        matrix = identityMatrix();
        rotateMatrix(matrix, angle, connector.intermediatePoints[parseInt(index.toString(), 10)].x, connector.intermediatePoints[parseInt(index.toString(), 10)].y);
        point = transformPointByMatrix(matrix, point);
    }
    if (wrapper.rotateAngle !== 0 || wrapper.parentTransform !== 0) {
        var matrix = identityMatrix();
        rotateMatrix(matrix, wrapper.rotateAngle + wrapper.parentTransform, wrapper.offsetX, wrapper.offsetY);
        point = transformPointByMatrix(matrix, point);
    }
    return point;
}
/**
 * canResizeCorner method \
 *
 * @returns {SelectorConstraints } canResizeCorner method .\
 * @param {string} selectorConstraints - provide the selectorConstraints  value.
 * @param {string} action - provide the selectorConstraints  value.
 * @param {ThumbsConstraints} thumbsConstraints - provide the thumbsConstraints  value.
 * @param {Selector} selectedItems - provide the selectedItems  value.
 * @private
 */
export function canResizeCorner(selectorConstraints, action, thumbsConstraints, selectedItems) {
    if (selectedItems.annotation) {
        if (canResize(selectedItems.annotation)) {
            return true;
        }
    }
    else if ((SelectorConstraints["" + action] & selectorConstraints) && (ThumbsConstraints["" + action] & thumbsConstraints)) {
        return true;
    }
    return false;
}
/**
 * canShowCorner method \
 *
 * @returns {boolean } canShowCorner method .\
 * @param {SelectorConstraints} selectorConstraints - provide the selectorConstraints  value.
 * @param {string} action - provide the thumbsConstraints  value.
 * @private
 */
export function canShowCorner(selectorConstraints, action) {
    if (SelectorConstraints["" + action] & selectorConstraints) {
        return true;
    }
    return false;
}
/**
 * canShowControlPoints method \
 *
 * @returns {boolean } canShowControlPoints method .\
 * @param {ControlPointsVisibility} bezierControlPoints - provide the bezierControlPoints value.
 * @param {string} action - provide the value.
 * @private
 */
export function canShowControlPoints(bezierControlPoints, action) {
    if (ControlPointsVisibility["" + action] & bezierControlPoints) {
        return true;
    }
    return false;
}
/**
 * checkPortRestriction method \
 *
 * @returns {number } checkPortRestriction method .\
 * @param {PointPortModel} port - provide the port  value.
 * @param {PortVisibility} portVisibility - provide the portVisibility  value.
 * @private
 */
export function checkPortRestriction(port, portVisibility) {
    return port.visibility & portVisibility;
}
/**
 * findAnnotation method \
 *
 * @returns {ShapeAnnotationModel | PathAnnotationModel | TextModel } findAnnotation method .\
 * @param { NodeModel | ConnectorModel} node - provide the port  value.
 * @param {string} id - provide the portVisibility  value.
 * @private
 */
export function findAnnotation(node, id) {
    var annotation;
    if (node.shape.type === 'Text') {
        annotation = (node.shape);
    }
    else {
        var annotationId = id.split('_');
        id = annotationId[annotationId.length - 1];
        for (var i = 0; i < node.annotations.length; i++) {
            if (id === node.annotations[parseInt(i.toString(), 10)].id) {
                annotation = node.annotations[parseInt(i.toString(), 10)];
            }
        }
    }
    return annotation;
}
/**
 * findPort method \
 *
 * @returns {PointPortModel} findPort method .\
 * @param { NodeModel | ConnectorModel} node - provide the port  value.
 * @param {string} id - provide the portVisibility  value.
 * @private
 */
export function findPort(node, id) {
    var port;
    if (id) {
        var portId = id.split('_');
        id = portId[portId.length - 1];
    }
    if (node) {
        node = node;
        for (var i = 0; i < node.ports.length; i++) {
            if (id === node.ports[parseInt(i.toString(), 10)].id) {
                return node.ports[parseInt(i.toString(), 10)];
            }
        }
    }
    return port;
}
/**
 * getInOutConnectPorts method \
 *
 * @returns {PointPortModel} getInOutConnectPorts method .\
 * @param { NodeModel} node - provide the port  value.
 * @param {boolean} isInConnect - provide the portVisibility  value.
 * @private
 */
export function getInOutConnectPorts(node, isInConnect) {
    var port = {};
    var i = 0;
    if (node.ports) {
        var ports = node.ports;
        for (i = 0; i < ports.length; i++) {
            if (isInConnect) {
                if ((ports[parseInt(i.toString(), 10)].constraints & PortConstraints.InConnect)) {
                    port = ports[parseInt(i.toString(), 10)];
                }
            }
            else {
                if ((ports[parseInt(i.toString(), 10)].constraints & PortConstraints.OutConnect)) {
                    port = ports[parseInt(i.toString(), 10)];
                }
            }
        }
    }
    return port;
}
/**
 * findObjectIndex method \
 *
 * @returns {PointPortModel} findObjectIndex method .\
 * @param { NodeModel | ConnectorModel} node - provide the node  value.
 * @param {string} id - provide the string  value.
 * @param {boolean} annotation - provide the boolean  value.
 * @private
 */
export function findObjectIndex(node, id, annotation) {
    //let index: number;
    var collection = (annotation) ? node.annotations : node.ports;
    for (var i = 0; i < collection.length; i++) {
        if (collection[parseInt(i.toString(), 10)].id === id) {
            return (i).toString();
        }
    }
    return '-1';
}
/**
 * findPortIndex method \
 *
 * @returns {PointPortModel} findPortIndex method .\
 * @param { NodeModel | ConnectorModel} node - provide the node  value.
 * @param {string} id - provide the string  value.
 * @param {boolean} port - provide the boolean  value.
 * @private
 */
export function findPortIndex(node, id, port) {
    //let index: number;
    var collection = node.ports;
    for (var i = 0; i < collection.length; i++) {
        if (collection[parseInt(i.toString(), 10)].id === id) {
            return (i).toString();
        }
    }
    return '-1';
}
/**
 * getObjectFromCollection method \
 *
 * @returns {boolean} getObjectFromCollection method .\
 * @param { (NodeModel | ConnectorModel)[] } obj - provide the node  value.
 * @param {string} id - provide the string  value.
 * @private
 */
export function getObjectFromCollection(obj, id) {
    var i;
    for (i = 0; i < obj.length; i++) {
        if (id === obj[parseInt(i.toString(), 10)].id) {
            return true;
        }
    }
    return false;
}
/**
 * scaleElement method \
 *
 * @returns {void} scaleElement method .\
 * @param { DiagramElement } element - provide the element  value.
 * @param {number} sw - provide the string  value.
 * @param {number} sh - provide the string  value.
 * @param {DiagramElement} refObject - provide the refObject  value.
 * @private
 */
export function scaleElement(element, sw, sh, refObject) {
    if (element.width !== undefined && element.height !== undefined) {
        element.width *= sw;
        element.height *= sh;
    }
    if (element instanceof Container) {
        var matrix = identityMatrix();
        var width = refObject.width || refObject.actualSize.width;
        var height = refObject.height || refObject.actualSize.height;
        if (width !== undefined && height !== undefined) {
            var x = refObject.offsetX - width * refObject.pivot.x;
            var y = refObject.offsetY - height * refObject.pivot.y;
            var refPoint = {
                x: x + width * refObject.pivot.x,
                y: y + height * refObject.pivot.y
            };
            refPoint = rotatePoint(refObject.rotateAngle, refObject.offsetX, refObject.offsetY, refPoint);
            rotateMatrix(matrix, -refObject.rotateAngle, refPoint.x, refPoint.y);
            scaleMatrix(matrix, sw, sh, refPoint.x, refPoint.y);
            rotateMatrix(matrix, refObject.rotateAngle, refPoint.x, refPoint.y);
            for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.width !== undefined && child.height !== undefined) {
                    var newPosition = transformPointByMatrix(matrix, { x: child.offsetX, y: child.offsetY });
                    child.offsetX = newPosition.x;
                    child.offsetY = newPosition.y;
                    scaleElement(child, sw, sh, refObject);
                }
            }
        }
    }
}
/**
 * scaleElement method \
 *
 * @returns {void} scaleElement method .\
 * @param { Node } obj - provide the obj  value.
 * @param {number} x - provide the x  value.
 * @param {number} y - provide the y  value.
 * @param {DiagramElement} nameTable - provide the refObject  value.
 * @param {DiagramElement} drop - provide the drop  value.
 * @param {DiagramElement} diagram - provide the diagram  value.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function arrangeChild(obj, x, y, nameTable, drop, diagram) {
    var child = obj.children;
    var node;
    for (var i = 0; i < child.length; i++) {
        node = nameTable[child[parseInt(i.toString(), 10)]];
        if (node) {
            if (node.children) {
                arrangeChild(node, x, y, nameTable, drop, diagram);
            }
            else {
                node.offsetX -= x;
                node.offsetY -= y;
                if (!drop) {
                    //let content: DiagramElement;
                    //let container: Container;
                    nameTable[node.id] = node;
                    var container = node.initContainer();
                    if (!container.children) {
                        container.children = [];
                    }
                    var content = node.init(diagram);
                    container.children.push(content);
                    container.measure(new Size(node.width, node.height));
                    container.arrange(container.desiredSize);
                }
            }
        }
    }
}
/**
 * insertObject method \
 *
 * @returns {void} insertObject method .\
 * @param { NodeModel | ConnectorModel } obj - provide the obj  value.
 * @param { string } key - provide the obj  value.
 * @param { Object[]} collection - provide the x  value.
 * @private
 */
export function insertObject(obj, key, collection) {
    if (collection.length === 0) {
        collection.push(obj);
    }
    else if (collection.length === 1) {
        if (collection[0]["" + key] > obj["" + key]) {
            collection.splice(0, 0, obj);
        }
        else {
            collection.push(obj);
        }
    }
    else if (collection.length > 1) {
        var low = 0;
        var high = collection.length - 1;
        var mid = Math.floor((low + high) / 2);
        while (mid !== low) {
            if (collection[parseInt(mid.toString(), 10)]["" + key] < obj["" + key]) {
                low = mid;
                mid = Math.floor((low + high) / 2);
            }
            else if (collection[parseInt(mid.toString(), 10)]["" + key] > obj["" + key]) {
                high = mid;
                mid = Math.floor((low + high) / 2);
            }
            else {
                break;
            }
        }
        if (collection[parseInt(high.toString(), 10)]["" + key] < obj["" + key]) {
            collection.push(obj);
        }
        else if (collection[parseInt(low.toString(), 10)]["" + key] > obj["" + key]) {
            collection.splice(low, 0, obj);
        }
        else if ((collection[parseInt(low.toString(), 10)]["" + key] < obj["" + key]) && collection[parseInt(high.toString(), 10)]["" + key] > obj["" + key]) {
            collection.splice(high, 0, obj);
        }
    }
}
/**
 * getElement method \
 *
 * @returns {Object} getElement method .\
 * @param { DiagramHtmlElement | DiagramNativeElement } element - provide the obj  value.
 * @private
 */
export function getElement(element) {
    var diagramElement = document.getElementById(element.diagramId);
    var instance = 'ej2_instances';
    // eslint-disable-next-line
    var node = {};
    var nodes = diagramElement["" + instance][0].nodes;
    if (nodes === undefined) {
        nodes = getPaletteSymbols(diagramElement["" + instance][0]);
    }
    var length = 'length';
    for (var i = 0; nodes && i < nodes["" + length]; i++) {
        if (nodes[parseInt(i.toString(), 10)].id === element.nodeId) {
            return getAnnotation(nodes[parseInt(i.toString(), 10)], element);
        }
    }
    var connectors = diagramElement["" + instance][0].connectors;
    for (var i = 0; connectors && i < connectors["" + length]; i++) {
        if (connectors[parseInt(i.toString(), 10)].id === element.nodeId) {
            return getAnnotation(connectors[parseInt(i.toString(), 10)], element);
        }
    }
    // eslint-disable-next-line
    var enterObject = diagramElement[instance][0].enterObject;
    if (enterObject && (enterObject['id'] === element.nodeId || enterObject['children'])) {
        if (enterObject['children'] && groupHasType(enterObject, 'HTML', diagramElement["" + instance][0].enterTable)) {
            return diagramElement["" + instance][0].enterTable[element.nodeId];
        }
        else {
            return enterObject;
        }
    }
    return null;
}
/**
 * getAnnotation method \
 *
 * @returns {Object} getAnnotation method .\
 * @param { Object } obj - provide the obj  value.
 * @param {  DiagramHtmlElement | DiagramNativeElement } element - provide the obj  value.
 * @private
 */
function getAnnotation(obj, element) {
    var annotations = obj.annotations;
    var length = 'length';
    var j;
    for (j = 0; annotations && j < annotations["" + length]; j++) {
        if (element.annotationId
            && annotations[parseInt(j.toString(), 10)].id === element.annotationId) {
            return annotations[parseInt(j.toString(), 10)];
        }
    }
    return obj;
}
/**
 * getPaletteSymbols method \
 *
 * @returns {NodeModel[]} getPaletteSymbols method .\
 * @param { Object } symbolPalette - provide the symbolPalette  value.
 * @private
 */
function getPaletteSymbols(symbolPalette) {
    var nodes = [];
    for (var i = 0; i < symbolPalette.palettes.length; i++) {
        var symbols = symbolPalette.palettes[parseInt(i.toString(), 10)].symbols;
        for (var j = 0; j < symbols.length; j++) {
            if (symbols[parseInt(j.toString(), 10)] instanceof Node) {
                nodes.push(symbols[parseInt(j.toString(), 10)]);
            }
        }
    }
    return nodes;
}
/**
 * getCollectionChangeEventArguements method \
 *
 * @returns {IBlazorCollectionChangeEventArgs} getCollectionChangeEventArguements method .\
 * @param { IBlazorCollectionChangeEventArgs } args1 - provide the args1  value.
 * @param { NodeModel | ConnectorModel } obj - provide the obj  value.
 * @param { EventState } state - provide the state  value.
 * @param { ChangeType } type - provide the type  value.
 * @private
 */
export function getCollectionChangeEventArguements(args1, obj, state, type) {
    //Removed isBlazor code
    return args1;
}
/**
 * getDropEventArguements method \
 *
 * @returns {IBlazorDropEventArgs} getDropEventArguements method .\
 * @param { MouseEventArgs } args - provide the args1  value.
 * @param { IBlazorDropEventArgs } arg - provide the obj  value.
 * @private
 */
export function getDropEventArguements(args, arg) {
    //Removed isBlazor code
    return arg;
}
/**
 * getPoint method \
 *
 * @returns {PointModel} getPoint method .\
 * @param { number } x - provide the x  value.
 * @param { number } y - provide the y  value.
 * @param { number } w - provide the w  value.
 * @param { number } h - provide the y  value.
 * @param { number } angle - provide the y  value.
 * @param { number } offsetX - provide the y  value.
 * @param { number } offsetY - provide the y  value.
 * @param { PointModel } cornerPoint - provide the y  value.
 * @private
 */
export function getPoint(x, y, w, h, angle, offsetX, offsetY, cornerPoint) {
    var pivot = { x: 0, y: 0 };
    var trans = identityMatrix();
    rotateMatrix(trans, angle, offsetX, offsetY);
    switch (cornerPoint.x) {
        case 0:
            switch (cornerPoint.y) {
                case 0:
                    pivot = transformPointByMatrix(trans, ({ x: x, y: y }));
                    break;
                case 0.5:
                    pivot = transformPointByMatrix(trans, ({ x: x, y: y + h / 2 }));
                    break;
                case 1:
                    pivot = transformPointByMatrix(trans, ({ x: x, y: y + h }));
                    break;
            }
            break;
        case 0.5:
            switch (cornerPoint.y) {
                case 0:
                    pivot = transformPointByMatrix(trans, ({ x: x + w / 2, y: y }));
                    break;
                case 0.5:
                    pivot = transformPointByMatrix(trans, ({ x: x + w / 2, y: y + h / 2 }));
                    break;
                case 1:
                    pivot = transformPointByMatrix(trans, ({ x: x + w / 2, y: y + h }));
                    break;
            }
            break;
        case 1:
            switch (cornerPoint.y) {
                case 0:
                    pivot = transformPointByMatrix(trans, ({ x: x + w, y: y }));
                    break;
                case 0.5:
                    pivot = transformPointByMatrix(trans, ({ x: x + w, y: y + h / 2 }));
                    break;
                case 1:
                    pivot = transformPointByMatrix(trans, ({ x: x + w, y: y + h }));
                    break;
            }
            break;
    }
    return { x: pivot.x, y: pivot.y };
}
/* eslint-disable */
/**
 * Get the object as Node | Connector \
 *
 * @returns {Object} Get the object as Node | Connector .\
 * @param { number } obj - provide the x  value.
 * @private
 */
export var getObjectType = function (obj) {
    if (obj) {
        if (obj.sourceID !== undefined || obj.sourcePoint !== undefined ||
            obj.targetID !== undefined || obj.targetPoint !== undefined ||
            obj.type !== undefined) {
            obj = Connector;
        }
        else {
            obj = Node;
        }
    }
    return obj;
};
/** @private */
export var flipConnector = function (connector) {
    if (!connector.sourceID && !connector.targetID) {
        var source = { x: connector.sourcePoint.x, y: connector.sourcePoint.y };
        var target = { x: connector.targetPoint.x, y: connector.targetPoint.y };
        if (connector.flip === FlipDirection.Horizontal) {
            connector.sourcePoint.x = target.x;
            connector.targetPoint.x = source.x;
        }
        else if (connector.flip === FlipDirection.Vertical) {
            connector.sourcePoint.y = target.y;
            connector.targetPoint.y = source.y;
        }
        else if (connector.flip === FlipDirection.Both) {
            connector.sourcePoint = target;
            connector.targetPoint = source;
        }
    }
};
/** @private */
export var updatePortEdges = function (portContent, flip, port) {
    var offsetX = port.offset.x;
    var offsetY = port.offset.y;
    if (flip === FlipDirection.Horizontal) {
        offsetX = 1 - port.offset.x;
        offsetY = port.offset.y;
    }
    else if (flip === FlipDirection.Vertical) {
        offsetX = port.offset.x;
        offsetY = 1 - port.offset.y;
    }
    else if (flip === FlipDirection.Both) {
        offsetX = 1 - port.offset.x;
        offsetY = 1 - port.offset.y;
    }
    portContent.setOffsetWithRespectToBounds(offsetX, offsetY, 'Fraction');
    return portContent;
};
/** @private */
export var alignElement = function (element, offsetX, offsetY, diagram, flip, isHorizontal, isVertical, isInitialRendering) {
    if (element.hasChildren()) {
        for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var nodeObj = void 0;
            if (child instanceof Canvas) {
                nodeObj = diagram.nameTable[child.id];
                if (nodeObj) {
                    if (isHorizontal) {
                        nodeObj.flip ^= FlipDirection.Horizontal;
                    }
                    if (isVertical) {
                        nodeObj.flip ^= FlipDirection.Vertical;
                    }
                }
            }
            var childX = ((offsetX - child.offsetX) + offsetX);
            var childY = ((offsetY - child.offsetY) + offsetY);
            if (!(child instanceof TextElement)) {
                if (!(child.elementActions & ElementAction.ElementIsPort)) {
                    if (flip === FlipDirection.Horizontal || isHorizontal) {
                        child.offsetX = childX;
                        if (nodeObj) {
                            nodeObj.offsetX = childX;
                        }
                        child.flipOffset.x = childX - child.desiredSize.width / 2;
                    }
                    if (flip === FlipDirection.Vertical || isVertical) {
                        child.offsetY = childY;
                        if (nodeObj) {
                            nodeObj.offsetY = childY;
                        }
                        child.flipOffset.y = childY - child.desiredSize.height / 2;
                    }
                    else if (flip === FlipDirection.Both) {
                        child.offsetX = childX;
                        child.flipOffset.x = childX - child.desiredSize.width / 2;
                        child.offsetY = childY;
                        child.flipOffset.y = childY - child.desiredSize.height / 2;
                        if (nodeObj) {
                            nodeObj.offsetX = childX;
                            nodeObj.offsetY = childY;
                        }
                    }
                }
            }
            if (!isInitialRendering) {
                if (child instanceof Canvas || child instanceof Container) {
                    if (isHorizontal) {
                        child.flip ^= FlipDirection.Horizontal;
                    }
                    if (isVertical) {
                        child.flip ^= FlipDirection.Vertical;
                    }
                    if (!child.id.includes('group_container') && child.children) {
                        if (isHorizontal) {
                            child.children[0].flip ^= FlipDirection.Horizontal;
                        }
                        if (isVertical) {
                            child.children[0].flip ^= FlipDirection.Vertical;
                        }
                    }
                    alignElement(child, offsetX, offsetY, diagram, flip, isHorizontal, isVertical, isInitialRendering);
                }
            }
            child.measure(new Size(child.bounds.width, child.bounds.height));
            child.arrange(child.desiredSize);
            var node = diagram.nameTable[child.id];
            if (node) {
                diagram.updateConnectorEdges(node);
            }
        }
    }
};
/** @private */
export var cloneSelectedObjects = function (diagram) {
    var nodes = diagram.selectedItems.nodes;
    var connectors = diagram.selectedItems.connectors;
    var isProtectedOnChange = 'isProtectedOnChange';
    var isEnableServerDatabind = diagram.allowServerDataBinding;
    var isProtectedOnChangeValue = diagram[isProtectedOnChange];
    diagram.protectPropertyChange(true);
    diagram.allowServerDataBinding = false;
    diagram.selectedItems.nodes = [];
    diagram.selectedItems.connectors = [];
    diagram.allowServerDataBinding = isEnableServerDatabind;
    diagram.protectPropertyChange(isProtectedOnChangeValue);
    var clonedSelectedItems = cloneObject(diagram.selectedItems);
    for (var i = 0; i < nodes.length; i++) {
        diagram.selectedItems.nodes.push(diagram.nameTable[nodes[i].id]);
    }
    for (var i = 0; i < connectors.length; i++) {
        diagram.selectedItems.connectors.push(diagram.nameTable[connectors[i].id]);
    }
    return clonedSelectedItems;
};
/** @private */
export var updatePathElement = function (anglePoints, connector) {
    var pathElement = new PathElement();
    var pathseqData;
    for (var j = 0; j < anglePoints.length - 1; j++) {
        pathseqData = findPath(anglePoints[j], anglePoints[j + 1]);
        pathElement.data = pathseqData[0];
        pathElement.id = connector.id + '_' + (connector.shape.sequence);
        //Bug 860251: Bpmn message flow and sequence flow connector child path is not rendered properly.
        //To get the offset of default sequence path.
        var pathOffset = getPathOffset(anglePoints, connector);
        pathElement.offsetX = pathOffset.x;
        pathElement.offsetY = pathOffset.y;
        pathElement.rotateAngle = 45;
        pathElement.transform = Transform.Self;
        break;
    }
    return pathElement;
};
/** @private */
export var getPathOffset = function (anglePoints, connector, segmentOffset) {
    var offsetDistance = 10; // Distance from the source point
    var angle;
    var pt;
    var totalLength = 0;
    // Calculate total length of the path
    for (var i_1 = 0; i_1 < anglePoints.length - 1; i_1++) {
        totalLength += findDistance(anglePoints[parseInt(i_1.toString(), 10)], anglePoints[i_1 + 1]);
    }
    var targetLength;
    if (segmentOffset) {
        targetLength = totalLength * segmentOffset;
    }
    else {
        targetLength = (totalLength / 2) > 30 ? offsetDistance : (totalLength / 2);
    }
    // Find the segment where the position lies
    var accumulatedLength = 0;
    for (var i = 0; i < anglePoints.length - 1; i++) {
        var segmentLength = findDistance(anglePoints[parseInt(i.toString(), 10)], anglePoints[i + 1]);
        if (accumulatedLength + segmentLength >= targetLength) {
            var remainingLength = targetLength - accumulatedLength;
            angle = findAngle(anglePoints[i], anglePoints[i + 1]);
            pt = Point.transform(anglePoints[i], angle, remainingLength);
            break;
        }
        accumulatedLength += segmentLength;
    }
    return pt;
};
/** @private */
export var checkPort = function (node, element) {
    if (node instanceof Node || node instanceof Connector) {
        for (var i = 0; i < node.ports.length; i++) {
            if (node.ports[i].id === element.id.split('_').splice(1).join('_')) {
                return true;
            }
        }
    }
    return false;
};
/** @private */
export var findPath = function (sourcePoint, targetPoint) {
    var beginningpoint = { x: sourcePoint.x, y: sourcePoint.y };
    var distance = findDistance(sourcePoint, targetPoint);
    distance = Math.min(10, distance / 2);
    var angle = findAngle(sourcePoint, targetPoint);
    var transferpt = Point.transform({ x: beginningpoint.x, y: beginningpoint.y }, angle, distance);
    var startpoint = Point.transform({ x: transferpt.x, y: transferpt.y }, angle, -11);
    var endpoint = Point.transform({ x: startpoint.x, y: startpoint.y }, angle, 11 * 2);
    var path = 'M' + startpoint.x + ' ' + startpoint.y + ' L' + endpoint.x + ' ' + endpoint.y;
    return [path, transferpt];
};
/** @private */
export var getConnectorDirection = function (src, tar) {
    if (Math.abs(tar.x - src.x) > Math.abs(tar.y - src.y)) {
        return src.x < tar.x ? 'Right' : 'Left';
    }
    else {
        return src.y < tar.y ? 'Bottom' : 'Top';
    }
};
/** @private */
export var findDistance = function (point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};
/* eslint-enable */
/**
 * cloneBlazorObject method \
 *
 * @returns {Object} cloneBlazorObject method .\
 * @param { object } args - provide the args  value.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function cloneBlazorObject(args) {
    //Removed isBlazor code
    return args;
}
/**
 * checkBrowserInfo method \
 *
 * @returns {Object} checkBrowserInfo method .\
 * @private
 */
export function checkBrowserInfo() {
    if ((navigator.platform.indexOf('Mac') >= 0 || navigator.platform.indexOf('iPad') >= 0
        || navigator.platform.indexOf('iPhone') >= 0 || navigator.platform.indexOf('MacIntel') >= 0)
        && (Browser.info.name === 'safari' || Browser.info.name === 'webkit')) {
        return true;
    }
    return false;
}
/**
 * canMeasureDecoratorPath method \
 *
 * @returns {boolean} canMeasureDecoratorPath method .\
 * @param { string[] } objects - provide the args  value.
 * @private
 */
export function canMeasureDecoratorPath(objects) {
    if (objects.indexOf('shape') !== -1 || objects.indexOf('pathData') !== -1 ||
        objects.indexOf('width') !== -1 || objects.indexOf('height') !== -1) {
        return true;
    }
    return false;
}
/**
 * getPreviewSize method \
 *
 * @returns {Size} getPreviewSize method .\
 * @param { SymbolPaletteModel } sourceElement - provide the args  value.
 * @param { Node } clonedObject - provide the args  value.
 * @param { DiagramElement } wrapper - provide the args  value.
 * @private
 */
export function getPreviewSize(sourceElement, clonedObject, wrapper) {
    //let previewWidth: number;
    //let previewHeight: number;
    var previewWidth = getSymbolSize(sourceElement, clonedObject, wrapper, 'width');
    var previewHeight = getSymbolSize(sourceElement, clonedObject, wrapper, 'height');
    return new Size(previewWidth, previewHeight);
}
/**
 * getSymbolSize method \
 *
 * @returns {number} getSymbolSize method .\
 * @param { SymbolPaletteModel } sourceElement - provide the sourceElement  value.
 * @param { Node } clonedObject - provide the clonedObject  value.
 * @param { DiagramElement } wrapper - provide the wrapper  value.
 * @param { string } size - provide the size  value.
 * @private
 */
export function getSymbolSize(sourceElement, clonedObject, wrapper, size) {
    var previewSize = 0;
    if (clonedObject.previewSize["" + size] !== undefined) {
        previewSize = clonedObject.previewSize["" + size];
    }
    else if (sourceElement.symbolPreview["" + size] !== undefined) {
        previewSize = sourceElement.symbolPreview["" + size];
    }
    else {
        previewSize = clonedObject["" + size] || wrapper.actualSize["" + size];
    }
    return previewSize;
}
/**
 * findParent method \
 *
 * @returns {string} findParent method .\
 * @param { Node } node - provide the clonedObject  value.
 * @param { Diagram } diagram - provide the diagram  element.
 * @param { string } parent - provide the parent id.
 * @private
 */
export function findParentInSwimlane(node, diagram, parent) {
    if (node && node.parentId) {
        node = diagram.nameTable[node.parentId];
        if (node.parentId) {
            parent = findParentInSwimlane(node, diagram, parent);
        }
        else {
            parent = node.id;
        }
    }
    return parent;
}
/**
 * selectionHasConnector method \
 *
 * @returns {boolean} selectionHasConnector method .\
 * @param { Diagram } diagram - provide the diagram  element.
 * @param { selector } selector - provide the selector element.
 * @private
 */
export function selectionHasConnector(diagram, selector) {
    if (diagram.selectedItems.connectors.length > 1 && diagram.selectedItems.nodes.length === 0 && selector.rotateAngle !== 0) {
        return true;
    }
    return false;
}
/**
 * To Get connector style based on the arrow type
 * @param {FlowChartData} data - provide the flow chart data.
 * @returns {ArrowStyle} - Connector style
 */
export function getConnectorArrowType(data) {
    if (data.arrowType && data.arrowType.trim() !== '') {
        switch (data.arrowType) {
            case 'single-line-arrow':
                return { targetDecorator: 'Arrow', strokeWidth: 1 };
            case 'double-line-arrow':
                return { targetDecorator: 'Arrow', strokeWidth: 2 };
            case 'dotted-arrow':
                return { targetDecorator: 'Arrow', strokeDashArray: '2,2' };
            case 'single-line':
                return { targetDecorator: 'None', strokeWidth: 1 };
            case 'double-line':
                return { targetDecorator: 'None', strokeWidth: 2 };
            case 'dotted':
                return { targetDecorator: 'None', strokeDashArray: '2,2' };
            case 'wiggly-arrow':
                return { targetDecorator: 'None', strokeWidth: 1, opacity: 0 };
            default:
                return { targetDecorator: 'Arrow', strokeWidth: 1 };
        }
    }
    return { targetDecorator: 'Arrow', strokeWidth: 1 };
}
