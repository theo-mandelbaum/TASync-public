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
import { Point } from '../primitives/point';
import { Rect } from '../primitives/rect';
import { intersect3, cloneBlazorObject } from '../utility/diagram-util';
import { cloneObject } from '../utility/base-util';
import { DiagramEvent, ConnectorConstraints } from './../enum/enum';
import { contains } from './actions';
import { getOppositeDirection } from '../utility/connector';
import { StraightSegment, OrthogonalSegment } from '../objects/connector';
import { ToolBase } from './tool';
import { isBlazor } from '@syncfusion/ej2-base';
/**
 * Multiple segments editing for Connector
 */
var ConnectorEditing = /** @class */ (function (_super) {
    __extends(ConnectorEditing, _super);
    function ConnectorEditing(commandHandler, endPoint) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.oldValue = null;
        _this.endPoint = endPoint;
        return _this;
    }
    /**
     * mouseDown method\
     *
     * @returns {  void }    mouseDown method .\
     * @param {MouseEventArgs} args - provide the args value.
     * @private
     */
    ConnectorEditing.prototype.mouseDown = function (args) {
        var connectors;
        var edit = true;
        if (args.source && args.source.connectors) {
            connectors = args.source.connectors[0];
        }
        if (args.info && args.actualObject) {
            edit = args.info.ctrlKey && args.actualObject.type !== 'Orthogonal';
        }
        if (connectors && edit) {
            this.inAction = true;
            this.undoElement = cloneObject(args.source);
            _super.prototype.mouseDown.call(this, args);
            // 927583: Segment points cannot be dragged when the pointer is in the outer part of the segmentThumb
            var inheritSegmentThumbSize = (connectors.constraints & ConnectorConstraints.InheritSegmentThumbSize);
            var segmentThumbSize = inheritSegmentThumbSize ?
                this.commandHandler.diagram.segmentThumbSize : connectors.segmentThumbSize;
            var padding = (segmentThumbSize > 20) && connectors.type !== 'Straight' ? segmentThumbSize / 2 : 10;
            padding = padding / this.commandHandler.diagram.scrollSettings.currentZoom;
            // Sets the selected segment
            for (var i = 0; i < connectors.segments.length; i++) {
                var segment = connectors.segments[parseInt(i.toString(), 10)];
                if (this.endPoint === 'OrthoThumb') {
                    for (var j = 0; j < segment.points.length - 1; j++) {
                        var segPoint = { x: 0, y: 0 };
                        segPoint.x = ((segment.points[parseInt(j.toString(), 10)].x + segment.points[j + 1].x) / 2);
                        segPoint.y = ((segment.points[parseInt(j.toString(), 10)].y + segment.points[j + 1].y) / 2);
                        if (contains(this.currentPosition, segPoint, padding)) {
                            this.selectedSegment = segment;
                            this.segmentIndex = j;
                        }
                    }
                }
                else {
                    if (contains(this.currentPosition, segment.point, padding)) {
                        this.selectedSegment = segment;
                    }
                }
            }
        }
    };
    /**
     * mouseMove method\
     *
     * @returns {  void }    mouseMove method .\
     * @param {MouseEventArgs} args - provide the args value.
     * @private
     */
    ConnectorEditing.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        this.currentPosition = args.position;
        if (this.currentPosition && this.prevPosition) {
            var diffY = this.currentPosition.y - this.prevPosition.y;
            var diffX = this.currentPosition.x - this.prevPosition.x;
            this.currentPosition = this.commandHandler.snapConnectorEnd(this.currentPosition);
            var connector = void 0;
            var newValue = void 0;
            var isSame = false;
            if (args.source && args.source.connectors) {
                connector = args.source.connectors[0];
            }
            if (Point.equals(this.startPosition, this.prevPosition)) {
                isSame = true;
            }
            if (this.oldValue === null) {
                this.oldValue = cloneObject(this.selectedSegment);
            }
            var arg = {
                source: connector, state: 'Start', oldValue: this.oldValue, newValue: this.oldValue,
                segment: this.selectedSegment, cancel: false
            };
            //EJ2-66217 - Support to add event for segment points editing in connector.
            arg = {
                source: cloneBlazorObject(connector), state: 'Start', oldValue: cloneBlazorObject(this.oldValue),
                newValue: cloneBlazorObject(this.oldValue),
                segment: cloneBlazorObject(this.selectedSegment), cancel: false
            };
            if (isSame && !isBlazor()) {
                this.commandHandler.triggerEvent(DiagramEvent.segmentChange, arg);
            }
            // When cancel is set to true at state Start, the segment change will be prevented.
            if (arg.cancel) {
                this.commandHandler.diagram.resetTool();
            }
            if ((this.inAction && this.selectedSegment !== undefined && this.endPoint !== undefined)
                && (diffX !== 0 || diffY !== 0) && !arg.cancel) {
                if (this.endPoint === 'OrthoThumb') {
                    this.blocked = !this.dragOrthogonalSegment(connector, this.selectedSegment, this.currentPosition, this.segmentIndex);
                    if (this.oldValue.length === null && this.oldValue.direction === null) {
                        this.oldValue = cloneObject(this.selectedSegment);
                    }
                    newValue = cloneObject(this.selectedSegment);
                }
                else {
                    var tx = this.currentPosition.x - this.selectedSegment.point.x;
                    var ty = this.currentPosition.y - this.selectedSegment.point.y;
                    var index = connector.segments.indexOf(this.selectedSegment);
                    this.blocked = !this.commandHandler.dragControlPoint(connector, tx, ty, false, index);
                    newValue = cloneObject(this.selectedSegment);
                }
                this.commandHandler.updateSelector();
                this.currentPosition = args.position;
                var arg1 = {
                    source: cloneBlazorObject(connector), state: 'Progress', oldValue: cloneBlazorObject(this.oldValue),
                    newValue: cloneBlazorObject(newValue),
                    segment: cloneBlazorObject(this.selectedSegment), cancel: false
                };
                this.commandHandler.triggerEvent(DiagramEvent.segmentChange, arg1);
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * mouseUp method\
     *
     * @returns {  void }    mouseUp method .\
     * @param {MouseEventArgs} args - provide the args value.
     * @private
     */
    ConnectorEditing.prototype.mouseUp = function (args) {
        var connector;
        var oldValues;
        if (args.source && args.source.connectors) {
            connector = args.source.connectors[0];
            oldValues = { segments: connector.segments };
        }
        if (args && args.source && args.info && args.info.ctrlKey && args.info.shiftKey && connector.type === 'Straight') {
            this.addOrRemoveSegment(connector, this.currentPosition);
        }
        else {
            if (this.endPoint === 'OrthoThumb' && this.selectedSegment) {
                var index = connector.segments.indexOf(this.selectedSegment);
                var prev = connector.segments[index - 1];
                var next = connector.segments[index + 1];
                if (index === connector.segments.length - 2
                    && this.updateLastSegment(connector, this.selectedSegment)) {
                    connector.segments.splice(connector.segments.length - 2, 1);
                }
                else {
                    //Bug 853404: Exception occurs while adjusting the connector segment.
                    if (prev && Math.abs(prev.length) < 5 && prev.length > 0) {
                        if (index !== 1) {
                            this.removePrevSegment(connector, index);
                        }
                    }
                    else if (next) {
                        var len = Point.distancePoints(next.points[0], next.points[1]);
                        var length_1 = ((next.length || next.length === 0) ? next.length : len);
                        if ((Math.abs(length_1) <= 5)) {
                            this.removeNextSegment(connector, index);
                        }
                    }
                }
                this.commandHandler.updateEndPoint(connector, oldValues);
                // EJ2-65063 - While mouseUp set the selectedSegmentIndex as zero.
                connector.selectedSegmentIndex = 0;
            }
        }
        if (this.undoElement) {
            //let obj: SelectorModel;
            var obj = cloneObject(args.source);
            var entry = {
                type: 'SegmentChanged', redoObject: obj, undoObject: this.undoElement, category: 'Internal'
            };
            this.commandHandler.addHistoryEntry(entry);
        }
        if (connector.isBezierEditing) {
            connector.isBezierEditing = false;
        }
        if (this.prevPosition !== this.startPosition) {
            var arg = {
                source: cloneBlazorObject(connector), state: 'Completed', oldValue: cloneBlazorObject(this.oldValue),
                newValue: cloneObject(this.selectedSegment), cancel: false, segment: cloneBlazorObject(this.selectedSegment)
            };
            this.commandHandler.triggerEvent(DiagramEvent.segmentChange, arg);
        }
        _super.prototype.mouseUp.call(this, args);
    };
    ConnectorEditing.prototype.removePrevSegment = function (connector, index) {
        var first = connector.segments[index - 2];
        var next = connector.segments[index + 1];
        //Bug 905092: Exception through while dragging segment and reverted back to its original position.
        //Added next condition to check the next segment is not null.
        if (next) {
            var length_2 = (next.length || next.length === 0) ? next.length : Point.distancePoints(next.points[0], next.points[1]);
            if (!(length_2 <= 5)) {
                var removeSegments = connector.segments.slice(index - 1, index + 1);
                var args = {
                    element: connector, removeSegments: removeSegments, type: 'Removal', cancel: false
                };
                //Removed isBlazor code
                this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
                if (!args.cancel) {
                    var last = connector.segments[index + 1];
                    connector.segments.splice(index - 1, 2);
                    var segment = this.selectedSegment;
                    if (segment.direction === 'Left' || segment.direction === 'Right') {
                        first.points[first.points.length - 1].x = last.points[0].x;
                        last.points[0].y = first.points[first.points.length - 1].y;
                    }
                    else {
                        first.points[first.points.length - 1].y = last.points[0].y;
                        last.points[0].x = first.points[first.points.length - 1].x;
                    }
                    if (segment.length || segment.length === 0) {
                        this.findSegmentDirection(first);
                    }
                    this.findSegmentDirection(last);
                }
            }
        }
    };
    ConnectorEditing.prototype.findSegmentDirection = function (segment) {
        if (segment.direction && (segment.length || segment.length === 0)) {
            segment.length = Point.distancePoints(segment.points[0], segment.points[segment.points.length - 1]);
            segment.direction = Point.direction(segment.points[0], segment.points[segment.points.length - 1]);
        }
    };
    ConnectorEditing.prototype.removeNextSegment = function (connector, index) {
        var segment = this.selectedSegment;
        var first = connector.segments[index - 1];
        var last = connector.segments[index + 2];
        var next = connector.segments[index + 1];
        // eslint-disable-next-line
        var removeSegments;
        var args;
        if (next.length || next.length === 0) {
            removeSegments = connector.segments.slice(index, 2);
            args = {
                element: connector, removeSegments: removeSegments, type: 'Removal', cancel: false
            };
            args = {
                element: cloneBlazorObject(connector), removeSegments: cloneBlazorObject(removeSegments),
                type: 'Removal', cancel: false
            };
            //Removed isBlazor code
            this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
            if (!args.cancel) {
                connector.segments.splice(index, 2);
                if (segment.direction === 'Top' || segment.direction === 'Bottom') {
                    last.points[0].y = segment.points[0].y;
                    first.points[first.points.length - 1].x = last.points[0].x;
                }
                else {
                    last.points[0].x = segment.points[0].x;
                    first.points[first.points.length - 1].y = last.points[0].y;
                }
            }
        }
        else {
            removeSegments = connector.segments.slice(index + 1, 1);
            args = {
                element: connector, removeSegments: removeSegments, type: 'Removal', cancel: false
            };
            //Removed isBlazor code
            this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
            if (!args.cancel) {
                connector.segments.splice(index + 1, 1);
                if (segment.direction === 'Top' || segment.direction === 'Bottom') {
                    first.points[first.points.length - 1].x = next.points[next.points.length - 1].x;
                }
                else {
                    first.points[first.points.length - 1].y = next.points[next.points.length - 1].y;
                }
                this.findSegmentDirection(first);
                segment.length = segment.direction = null;
            }
        }
        if (first && last && !args.cancel) {
            first.length = Point.distancePoints(first.points[0], last.points[0]);
            first.direction = Point.direction(first.points[0], last.points[0]);
            if (last.length || last.length === 0) {
                last.length = Point.distancePoints(first.points[first.points.length - 1], last.points[last.points.length - 1]);
                var point1 = first.points;
                var point2 = last.points;
                last.direction = Point.direction(point1[point1.length - 1], point2[point2.length - 1]);
            }
        }
    };
    /**
     * addOrRemoveSegment method Used to add or remove intermediate segments to the straight connector. \
     *
     * @returns {void} addOrRemoveSegment method Used to add or remove intermediate segments to the straight connector.
     * @param {ConnectorModel} connector - provide the connector value in which segment to be added/removed.
     * @param {PointModel} point - provide the mouse clicked position as a point of the segment
     * @param {CommandHandler} commandHandler - provide the CommandHandler value that defines the behavior of commands
     * @private
     */
    ConnectorEditing.prototype.addOrRemoveSegment = function (connector, point, commandHandler) {
        var updateSeg;
        var segmentIndex;
        var segmentsChanged = [];
        var oldValues = { segments: connector.segments };
        for (var i = 0; i < connector.segments.length; i++) {
            var segment = (connector.segments)[parseInt(i.toString(), 10)];
            if (contains(point, segment.point, connector.hitPadding)) {
                segmentIndex = i;
                updateSeg = true;
                //848696-Trigger SegmentCollectionChange Event for straight connector
                segmentsChanged.push(segment);
                var args = {
                    element: connector, removeSegments: segmentsChanged, type: 'Removal', cancel: false
                };
                if (commandHandler) {
                    commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
                }
            }
        }
        //827745-support to edit Segment for Straight connector at runtime
        if (!this.commandHandler) {
            this.commandHandler = commandHandler;
        }
        if (updateSeg && segmentIndex !== undefined) {
            if (connector.segments && connector.segments[parseInt(segmentIndex.toString(), 10)] && connector.segments[parseInt(segmentIndex.toString(), 10)].type === 'Straight') {
                var segment = connector.segments[parseInt(segmentIndex.toString(), 10)];
                var previous = connector.segments[segmentIndex + 1];
                if (previous) {
                    connector.segments.splice(segmentIndex, 1);
                    previous.points[0] = segment.points[0];
                }
            }
        }
        else {
            this.commandHandler.enableServerDataBinding(false);
            var index = this.findIndex(connector, point);
            if (connector.segments && connector.segments[parseInt(index.toString(), 10)] && connector.segments[parseInt(index.toString(), 10)].type === 'Straight') {
                var segment = connector.segments[parseInt(index.toString(), 10)];
                var newseg = new StraightSegment(connector, 'segments', { type: 'Straight', point: point }, true);
                newseg.points[0] = segment.points[0];
                newseg.points[1] = point;
                segment.points[0] = point;
                connector.segments.splice(index, 0, newseg);
                updateSeg = true;
                //848696-Trigger SegmentCollectionchange Event for straight connector
                segmentsChanged.push(segment);
                var args = {
                    element: connector, addSegments: segmentsChanged, type: 'Addition', cancel: false
                };
                this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
            }
            this.commandHandler.enableServerDataBinding(true);
        }
        if (updateSeg) {
            this.commandHandler.updateEndPoint(connector, oldValues);
        }
    };
    ConnectorEditing.prototype.findIndex = function (connector, point) {
        var intersectingSegs = [];
        for (var i = 0; i < connector.segments.length; i++) {
            var segment = connector.segments[parseInt(i.toString(), 10)];
            var rect = Rect.toBounds([segment.points[0], segment.points[1]]);
            rect.Inflate(connector.hitPadding);
            if (rect.containsPoint(point)) {
                intersectingSegs.push(segment);
            }
        }
        if (intersectingSegs.length === 1) {
            return connector.segments.indexOf(intersectingSegs[0]);
        }
        else {
            var ratio = void 0;
            var min = void 0;
            var index = void 0;
            var seg = void 0;
            var v = void 0;
            var h = void 0;
            for (var i = 0; i < intersectingSegs.length; i++) {
                seg = intersectingSegs[parseInt(i.toString(), 10)];
                v = (point.y - seg.points[0].y) / (seg.points[1].y - point.y);
                h = (point.x - seg.points[0].x) / (seg.points[1].x - point.x);
                ratio = Math.abs(v - h);
                if (i === 0) {
                    min = ratio;
                    index = 0;
                }
                if (ratio < min) {
                    min = ratio;
                    index = i;
                }
            }
            return connector.segments.indexOf(intersectingSegs[parseInt(index.toString(), 10)]);
        }
    };
    ConnectorEditing.prototype.dragOrthogonalSegment = function (obj, segment, point, segmentIndex) {
        var segmentPoint = { x: 0, y: 0 };
        var oldValues = { segments: obj.segments };
        segmentPoint.x = ((segment.points[parseInt(segmentIndex.toString(), 10)].x + segment.points[segmentIndex + 1].x) / 2);
        segmentPoint.y = ((segment.points[parseInt(segmentIndex.toString(), 10)].y + segment.points[segmentIndex + 1].y) / 2);
        var ty = point.y - segmentPoint.y;
        var tx = point.x - segmentPoint.x;
        var index = obj.segments.indexOf(segment);
        var update = false;
        //const orientation: string = (segment.points[0].y.toFixed(2) === segment.points[1].y.toFixed(2)) ? 'horizontal' : 'vertical';
        //const prevSegment: OrthogonalSegmentModel; const nextSegment: OrthogonalSegmentModel;
        // EJ2-65063 - If the allowNodeOverlap is set as true means then we set the segment index which is going to drag in selectedSegmentIndex property
        if (obj.allowNodeOverlap) {
            obj.selectedSegmentIndex = index ? index : segmentIndex;
        }
        if (index !== -1) {
            if (index === 0 && obj.segments.length === 1 && segment.points.length === 2) {
                index = this.addSegments(obj, segment, tx, ty, index);
                update = true;
            }
            else if (index === obj.segments.length - 1 && (segment.direction === null || segment.length === null)) {
                index = this.addTerminalSegment(obj, segment, tx, ty, segmentIndex);
                update = true;
            }
            else if (index === 0) {
                index = this.insertFirstSegment(obj, segment, tx, ty, index);
                update = true;
            }
            if (index) {
                if (update) {
                    this.selectedSegment = segment = obj.segments[parseInt(index.toString(), 10)];
                    this.segmentIndex = 0;
                }
                this.updateAdjacentSegments(obj, index, tx, ty);
                this.commandHandler.updateEndPoint(obj, oldValues);
            }
        }
        return true;
    };
    ConnectorEditing.prototype.addSegments = function (obj, segment, tx, ty, coll) {
        var index;
        var segments = []; //let len: number;
        var length = Point.distancePoints(segment.points[0], segment.points[1]);
        var segmentDirection = Point.direction(segment.points[0], segment.points[1]);
        segments.push(new OrthogonalSegment(obj, 'segments', { type: 'Orthogonal', direction: segmentDirection, length: length / 4 }, true));
        var direction = (segment.points[0].y === segment.points[1].y) ? ((ty > 0) ? 'Bottom' : 'Top') : ((tx > 0) ? 'Right' : 'Left');
        var len = (segment.points[0].x === segment.points[1].x) ? ty : tx;
        segments.push(new OrthogonalSegment(obj, 'segments', { type: 'Orthogonal', direction: direction, length: len }, true));
        segments.push(new OrthogonalSegment(obj, 'segments', { type: 'Orthogonal', direction: segmentDirection, length: length / 2 }, true));
        var args = {
            element: obj, addSegments: segments, type: 'Addition', cancel: false
        };
        //Removed isBlazor code
        this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
        if (!args.cancel) {
            obj.segments = segments.concat(obj.segments);
            index = coll + 2;
        }
        return index;
    };
    // eslint-disable-next-line
    ConnectorEditing.prototype.insertFirstSegment = function (obj, segment, tx, ty, coll) {
        var direction;
        var length;
        var segments = [];
        var segValues;
        var index;
        var insertseg;
        if (obj.sourcePortID && segment.length && obj.segments[0].points.length > 2) {
            var prev = void 0;
            for (var i = 0; i < segment.points.length - 1; i++) {
                var len = Point.distancePoints(segment.points[parseInt(i.toString(), 10)], segment.points[i + 1]);
                var dir = Point.direction(segment.points[parseInt(i.toString(), 10)], segment.points[i + 1]);
                insertseg = new OrthogonalSegment(obj, 'segments', { type: 'Orthogonal', direction: dir, length: len }, true);
                if (insertseg.length === 0) {
                    if (prev && (prev.direction === 'Top' || prev.direction === 'Bottom')) {
                        insertseg.direction = tx > 0 ? 'Right' : 'Left';
                    }
                    else {
                        insertseg.direction = ty > 0 ? 'Bottom' : 'Top';
                    }
                }
                prev = insertseg;
                segments.push(insertseg);
            }
        }
        else {
            segValues = { type: 'Orthogonal', direction: segment.direction, length: segment.length / 3 };
            segments.push(new OrthogonalSegment(obj, 'segments', segValues, true));
            if (segment.direction === 'Bottom' || segment.direction === 'Top') {
                length = Math.abs(tx);
                direction = tx > 0 ? 'Right' : 'Left';
            }
            else {
                length = Math.abs(ty);
                direction = ty > 0 ? 'Bottom' : 'Top';
            }
            insertseg = new OrthogonalSegment(obj, 'segments', { type: 'Orthogonal', direction: direction, length: length }, true);
            segments.push(insertseg);
        }
        var args = {
            element: obj, addSegments: segments, type: 'Addition', cancel: false
        };
        //Removed isBlazor code
        this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args);
        if (!args.cancel) {
            if (obj.sourcePortID && segment.length && obj.segments[0].points.length > 2) {
                obj.segments.splice(0, 1);
                index = 1;
            }
            else {
                var nextseg = obj.segments[1];
                if (nextseg && nextseg.length) {
                    nextseg.length = (direction !== nextseg.direction) ? nextseg.length + length : nextseg.length - length;
                }
                index = 2;
                segment.length = 2 * segment.length / 3;
            }
            obj.segments = segments.concat(obj.segments);
        }
        return index;
    };
    ConnectorEditing.prototype.updateAdjacentSegments = function (obj, index, tx, ty) {
        var current = obj.segments[parseInt(index.toString(), 10)];
        var endPoint = current.points[current.points.length - 1];
        var startPoint = current.points[0];
        var isNextUpdate = true;
        if (current.type === 'Orthogonal') {
            current.points[0] = startPoint;
            current.points[current.points.length - 1] = endPoint;
            var prev = obj.segments[index - 1];
            if (prev) {
                isNextUpdate = this.updatePreviousSegment(tx, ty, obj, index);
            }
            if (obj.segments.length - 1 > index && isNextUpdate) {
                var nextSegment = obj.segments[index + 1];
                this.updateNextSegment(obj, current, nextSegment, tx, ty);
            }
        }
    };
    ConnectorEditing.prototype.addTerminalSegment = function (connector, segment, tx, ty, segmentIndex) {
        //const oldValues: Connector = { segments: connector.segments } as Connector;
        var index = connector.segments.indexOf(segment);
        var first;
        var insertseg;
        var len;
        var dir;
        var segments = [];
        var removeSegment = connector.segments.pop();
        var last = connector.segments[connector.segments.length - 1];
        first = (last && last.type === 'Orthogonal') ? last : null;
        for (var i = 0; i < segment.points.length - 2; i++) {
            len = Point.distancePoints(segment.points[parseInt(i.toString(), 10)], segment.points[i + 1]);
            dir = Point.direction(segment.points[parseInt(i.toString(), 10)], segment.points[i + 1]);
            insertseg = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal', length: len, direction: dir }, true);
            segments.push(insertseg);
            first = insertseg;
        }
        var sec = segmentIndex;
        if (segment.points.length === 2 || sec === segment.points.length - 2) {
            if (first) {
                first.length += 5;
            }
            if (sec !== undefined) {
                //let newseg: OrthogonalSegment;
                len = 2 * Point.distancePoints(segment.points[segment.points.length - 2], segment.points[segment.points.length - 1]) / 3;
                dir = Point.direction(segment.points[segment.points.length - 2], segment.points[segment.points.length - 1]);
                var newseg = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal', length: len, direction: dir });
                segments.push(newseg);
            }
        }
        var lastseg = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
        segments.push(lastseg);
        var args = {
            element: connector, addSegments: segments, type: 'Addition', cancel: false
        };
        var args1 = {
            element: cloneBlazorObject(connector), addSegments: cloneBlazorObject(segments),
            type: 'Addition', cancel: args.cancel
        };
        //Removed isBlazor code
        this.commandHandler.triggerEvent(DiagramEvent.segmentCollectionChange, args1);
        if (!args1.cancel) {
            connector.segments = connector.segments.concat(segments);
            index = index + segmentIndex;
        }
        else {
            connector.segments.push(removeSegment);
        }
        this.commandHandler.updateEndPoint(connector);
        return index;
    };
    // eslint-disable-next-line
    ConnectorEditing.prototype.updatePortSegment = function (prev, connector, index, tx, ty) {
        if (index === 1 && prev.points.length === 2 && prev.length < 0) {
            var source = connector.sourceWrapper.corners;
            var current = connector.segments[parseInt(index.toString(), 10)];
            var next = connector.segments[index + 1];
            var newseg = void 0;
            var segment = [];
            newseg = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal', length: 13, direction: prev.direction });
            segment.push(newseg);
            var len = void 0;
            if (current.direction === 'Left') {
                len = (current.points[0].x - (source.middleLeft.x - 20));
            }
            else if (current.direction === 'Right') {
                len = ((source.middleRight.x + 20) - current.points[0].x);
            }
            else if (current.direction === 'Bottom') {
                len = ((source.bottomCenter.y + 20) - current.points[0].y);
            }
            else {
                len = (current.points[0].y - (source.topCenter.y - 20));
            }
            //const dir: Direction = current.direction;
            newseg = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal', length: len, direction: current.direction });
            segment.push(newseg);
            current.length = current.length - len;
            if (next && next.length && next.direction) {
                if (next.direction === prev.direction) {
                    next.length -= 13;
                }
                else if (next.direction === getOppositeDirection(prev.direction)) {
                    next.length += 13;
                }
            }
            connector.segments = segment.concat(connector.segments);
            this.selectedSegment = connector.segments[3];
        }
    };
    ConnectorEditing.prototype.updatePreviousSegment = function (tx, ty, connector, index) {
        var current = connector.segments[parseInt(index.toString(), 10)];
        var prev = connector.segments[index - 1];
        //const firstSegment: boolean = (index === 1) ? true : false;
        prev.points[prev.points.length - 1] = current.points[0];
        var isSourceNode = (connector.sourceID && connector.sourcePortID === '') ? false : true;
        var isNextUpdate = true;
        if (prev.type === 'Orthogonal') {
            if (prev.direction === 'Bottom') {
                prev.length += ty;
            }
            else if (prev.direction === 'Top') {
                prev.length -= ty;
            }
            else if (prev.direction === 'Right') {
                prev.length += tx;
            }
            else {
                prev.length -= tx;
            }
            // EJ2-65063 - Added the below condition !allowNodeOverlap to prevent the segment to split into two segments while intersect with source node.
            if (connector.sourcePortID !== '' && prev.length < 0 && !connector.allowNodeOverlap) {
                this.updatePortSegment(prev, connector, index, tx, ty);
            }
            else if (connector.sourceID && connector.sourcePortID === '' && prev.length < 0 && index === 1) {
                isNextUpdate = false;
                this.updateFirstSegment(connector, current);
            }
            if (isSourceNode) {
                this.changeSegmentDirection(prev, connector);
            }
        }
        return isNextUpdate;
    };
    ConnectorEditing.prototype.changeSegmentDirection = function (segment, connector) {
        if (!connector.maxSegmentThumb) {
            if (segment.length < 0) {
                segment.direction = getOppositeDirection(segment.direction);
                segment.length *= -1;
            }
        }
    };
    ConnectorEditing.prototype.updateNextSegment = function (obj, current, next, tx, ty) {
        next.points[0] = current.points[current.points.length - 1];
        if (next && next.type === 'Orthogonal') {
            if (next.length || next.length === 0) {
                if (next.direction === 'Left' || next.direction === 'Right') {
                    if (tx !== 0) {
                        next.length = (next.direction === 'Right') ? next.length - tx : next.length + tx;
                        if (next.length || next.length === 0) {
                            this.changeSegmentDirection(next, obj);
                        }
                    }
                }
                else {
                    if (ty !== 0) {
                        next.length = (next.direction === 'Bottom') ? next.length - ty : next.length + ty;
                        if (next.length || next.length === 0) {
                            this.changeSegmentDirection(next, obj);
                        }
                    }
                }
            }
        }
    };
    ConnectorEditing.prototype.updateFirstSegment = function (connector, selectedSegment) {
        var index = connector.segments.indexOf(selectedSegment);
        var insertfirst = false;
        var current = connector.segments[parseInt(index.toString(), 10)];
        var prev = connector.segments[index - 1];
        var con = connector;
        var sourcePoint;
        var oldValues = { segments: connector.segments };
        if (prev.length < 0 && connector.sourceID) {
            var sourceNode = connector.sourceWrapper.corners;
            var segments = [];
            var segValues = void 0;
            var removeCurrentPrev = false;
            this.changeSegmentDirection(current, connector);
            var next = connector.segments[index + 1];
            var nextNext = connector.segments[index + 2];
            if (next) {
                this.changeSegmentDirection(next, connector);
            }
            if (nextNext) {
                this.changeSegmentDirection(nextNext, connector);
            }
            switch (prev.direction) {
                case 'Top':
                case 'Bottom':
                    sourcePoint = (current.length > 0 && current.direction === 'Left') ? sourceNode.middleLeft : sourceNode.middleRight;
                    if (current.length > sourceNode.width / 2) {
                        if (Math.abs(prev.length) < sourceNode.height / 2) {
                            prev.length = Point.distancePoints(sourceNode.center, prev.points[prev.points.length - 1]);
                            current.points[0].x = sourcePoint.x;
                            current.length = Point.distancePoints(current.points[0], current.points[current.points.length - 1]);
                            current.length -= 20;
                            insertfirst = true;
                        }
                    }
                    else {
                        if (next && next.direction && next.length) {
                            next.points[0].y = sourcePoint.y;
                            next.points[0].x = next.points[next.points.length - 1].x = (current.direction === 'Right') ?
                                sourcePoint.x + 20 : sourcePoint.x - 20;
                        }
                        insertfirst = true;
                        removeCurrentPrev = true;
                    }
                    break;
                case 'Left':
                case 'Right':
                    sourcePoint = (current.length > 0 && current.direction === 'Top') ? sourceNode.topCenter : sourceNode.bottomCenter;
                    if (current.length > sourceNode.height / 2) {
                        if (Math.abs(prev.length) < sourceNode.width / 2) {
                            prev.length = Point.distancePoints(sourceNode.center, prev.points[prev.points.length - 1]);
                            current.points[0].y = sourcePoint.y;
                            current.length = Point.distancePoints(current.points[0], current.points[current.points.length - 1]);
                            current.length -= 20;
                            insertfirst = true;
                        }
                    }
                    else {
                        if (next && next.direction && next.length) {
                            next.points[0].x = sourcePoint.x;
                            next.points[0].y = next.points[next.points.length - 1].y = (current.direction === 'Bottom') ?
                                sourcePoint.y + 20 : sourcePoint.y - 20;
                        }
                        insertfirst = true;
                        removeCurrentPrev = true;
                    }
                    break;
            }
            this.changeSegmentDirection(prev, connector);
            this.changeSegmentDirection(current, connector);
            if (insertfirst) {
                segValues = { type: 'Orthogonal', direction: current.direction, length: 20 };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
                if (removeCurrentPrev) {
                    if (next && next.direction && next.length) {
                        next.length = Point.distancePoints(next.points[0], next.points[next.points.length - 1]);
                    }
                    if (nextNext && nextNext.direction && nextNext.length) {
                        nextNext.length = Point.distancePoints(next.points[next.points.length - 1], nextNext.points[nextNext.points.length - 1]);
                    }
                    connector.segments.splice(index - 1, 2);
                }
                connector.segments = segments.concat(connector.segments);
            }
            this.selectedSegment = ((removeCurrentPrev) ? connector.segments[index - 1] :
                connector.segments[index + 1]);
            this.commandHandler.updateEndPoint(connector, oldValues);
        }
    };
    ConnectorEditing.prototype.updateLastSegment = function (connector, selectedSegment) {
        if (connector.targetID && connector.targetPortID === '') {
            var line1Start = void 0;
            var line1End = void 0;
            var line2Start = void 0;
            var line2End = void 0;
            var corners = connector.targetWrapper.corners;
            var firstSegPoint = selectedSegment.points[0];
            var lastSegPoint = selectedSegment.points[selectedSegment.points.length - 1];
            if (selectedSegment.direction === 'Right' || selectedSegment.direction === 'Left') {
                line1Start = { x: firstSegPoint.x, y: firstSegPoint.y };
                line1End = {
                    x: (selectedSegment.direction === 'Left') ? lastSegPoint.x - corners.width / 2 : lastSegPoint.x + corners.width / 2,
                    y: lastSegPoint.y
                };
                line2Start = { x: corners.center.x, y: corners.center.y - corners.height };
                line2End = { x: corners.center.x, y: corners.center.y + corners.height };
            }
            else {
                line1Start = { x: firstSegPoint.x, y: firstSegPoint.y };
                line1End = {
                    x: lastSegPoint.x,
                    y: (selectedSegment.direction === 'Bottom') ? lastSegPoint.y + corners.height / 2 : lastSegPoint.y - corners.height / 2
                };
                line2Start = { x: corners.center.x - corners.width, y: corners.center.y };
                line2End = { x: corners.center.x + corners.width, y: corners.center.y };
            }
            var line1 = { x1: line1Start.x, y1: line1Start.y, x2: line1End.x, y2: line1End.y };
            var line2 = { x1: line2Start.x, y1: line2Start.y, x2: line2End.x, y2: line2End.y };
            return (intersect3(line1, line2).enabled);
        }
        return false;
    };
    /**
     *To destroy the module
     *
     * @returns {void} To destroy the module
     */
    ConnectorEditing.prototype.destroy = function () {
        /**
         * Destroys the connector editing module
         */
    };
    /**
     * Get module name.
     */
    /**
     * Get module name.\
     *
     * @returns {  string  }    Get module name.\
     */
    ConnectorEditing.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'ConnectorEditingTool';
    };
    return ConnectorEditing;
}(ToolBase));
export { ConnectorEditing };
