import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Connectors Directive
 * ```html
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * ```
 */
export declare class ConnectorDirective extends ComplexBase<ConnectorDirective> {
    private viewContainerRef;
    directivePropList: any;
    childFixedUserHandles: any;
    childAnnotations: any;
    tags: string[];
    /**
     * Defines the type of the connector
     * * Straight - Sets the segment type as Straight
     * * Orthogonal - Sets the segment type as Orthogonal
     * * Bezier - Sets the segment type as Bezier
     * @default 'Straight'
     * @asptype Syncfusion.EJ2.Diagrams.Segments
     */
    type: any;
    /**
     * Allows the user to save custom information/data about a node/connector
     * @aspdefaultvalueignore
     * @default undefined
     */
    addInfo: any;
    /**
     * Specifies a value indicating whether to overlap the connector over with the source and target node.
     * If the LineRouting is enabled in the diagram, then allowNodeOverlap property will not work.
     * @default false
     */
    allowNodeOverlap: any;
    /**
     *
     */
    annotations: any;
    /**
     * Sets the bezier settings of editing the segments.
     * @default null
     */
    bezierSettings: any;
    /**
     * Defines the bridgeSpace of connector
     * @default 10
     */
    bridgeSpace: any;
    /**
     * Sets the connector padding value
     * @default 0
     */
    connectionPadding: any;
    /**
     * Sets the distance between source node and connector
     * @default 13
     */
    connectorSpacing: any;
    /**
     * Defines the constraints of connector
     * * None - Interaction of the connectors cannot be done.
     * * Select - Selects the connector.
     * * Delete - Delete the connector.
     * * Drag - Drag the connector.
     * * DragSourceEnd - Drag the source end of the connector.
     * * DragTargetEnd - Drag the target end of the connector.
     * * DragSegmentThump - Drag the segment thumb of the connector.
     * * AllowDrop - Allow to drop a node.
     * * Bridging - Creates bridge  on intersection of two connectors.
     * * InheritBridging - Creates bridge  on intersection of two connectors.
     * * PointerEvents - Sets the pointer events.
     * * Tooltip - Displays a tooltip for the connectors.
     * * InheritToolTip - Displays a tooltip for the connectors.
     * * Interaction - Features of the connector used for interaction.
     * * ReadOnly - Enables ReadOnly
     * @default 'Default'
     * @aspnumberenum
     */
    constraints: any;
    /**
     * Sets the corner radius of the connector
     * @default 0
     */
    cornerRadius: any;
    /**
     * Defines the size of a drop symbol
     * @aspdefaultvalueignore
     * @default undefined
     */
    dragSize: any;
    /**
     * Defines whether the node should be automatically positioned or not. Applicable, if layout option is enabled.
     * @default false
     */
    excludeFromLayout: any;
    /**
     * Specifies the collection of the fixed user handle
     * @aspdefaultvalueignore
     * @default undefined
     */
    fixedUserHandles: any;
    /**
     * Flip the element in Horizontal/Vertical directions
     * @aspdefaultvalueignore
     * @default None
     */
    flip: any;
    /**
     * Allows you to flip only the node or along with port and label
     * @aspdefaultvalueignore
     * @default All
     */
    flipMode: any;
    /**
     * Sets the connector padding value
     * @default 10
     */
    hitPadding: any;
    /**
     * Represents the unique id of nodes/connectors
     * @default ''
     */
    id: any;
    /**
     * Defines the space to be left between the node and its immediate parent
     * @default {}
     */
    margin: any;
    /**
     * Sets the maximum segment thumb for the connector
     * @default null
     */
    maxSegmentThumb: any;
    /**
     * Defines the behavior of connection ports
     * @aspdefaultvalueignore
     * @default undefined
     */
    ports: any;
    /**
     * Defines the size of the symbol preview
     * @aspdefaultvalueignore
     * @default undefined
     */
    previewSize: any;
    /**
     * Defines the shape for the connector segmentThumb
     * Rhombus - Sets the segmentThumb shape as Rhombus
     * Square - Sets the segmentThumb shape as Square
     * Rectangle - Sets the segmentThumb shape as Rectangle
     * Ellipse - Sets the segmentThumb shape as Ellipse
     * Arrow - Sets the segmentThumb shape as Arrow
     * Diamond - Sets the segmentThumb shape as Diamond
     * OpenArrow - Sets the segmentThumb shape as OpenArrow
     * Circle - Sets the segmentThumb shape as Circle
     * Fletch - Sets the segmentThumb shape as Fletch
     * OpenFetch - Sets the segmentThumb shape as OpenFetch
     * IndentedArrow - Sets the segmentThumb shape as Indented Arrow
     * OutdentedArrow - Sets the segmentThumb shape as Outdented Arrow
     * DoubleArrow - Sets the segmentThumb shape as DoubleArrow
     * @default 'Circle'
     */
    segmentThumbShape: any;
    /**
     * Specifies the size of the segment thumb for individual connector. When not set, it defaults to matching the underlying path data
     * @default 10
     */
    segmentThumbSize: any;
    /**
     * Defines the segments
     * @default []
     * @asptype object
     */
    segments: any;
    /**
     * Defines the shape of the connector
     * @default 'Bpmn'
     * @asptype object
     */
    shape: any;
    /**
     * Defines the source decorator of the connector
     * @default new Decorator()
     */
    sourceDecorator: any;
    /**
     * Sets the source node/connector object of the connector
     * @default null
     */
    sourceID: any;
    /**
     * Sets the source padding of the connector
     * @default 0
     */
    sourcePadding: any;
    /**
     * Sets the beginning point of the connector
     * @default new Point(0,0)
     */
    sourcePoint: any;
    /**
     * Sets the unique id of the source port of the connector
     * @default ''
     */
    sourcePortID: any;
    /**
     * Defines the appearance of the connection path
     * @default ''
     */
    style: any;
    /**
     * Defines the symbol info of a connector
     * @aspdefaultvalueignore
     * @default undefined
     * @ignoreapilink
     */
    symbolInfo: any;
    /**
     * Defines the target decorator of the connector
     * @default new Decorator()
     */
    targetDecorator: any;
    /**
     * Sets the target node/connector object of the connector
     * @default null
     */
    targetID: any;
    /**
     * Sets the target padding of the connector
     * @default 0
     */
    targetPadding: any;
    /**
     * Sets the end point of the connector
     * @default new Point(0,0)
     */
    targetPoint: any;
    /**
     * Sets the unique id of the target port of the connector
     * @default ''
     */
    targetPortID: any;
    /**
     * defines the tooltip for the connector
     * @default new DiagramToolTip();
     */
    tooltip: any;
    /**
     * Sets the visibility of the node/connector
     * @default true
     */
    visible: any;
    /**
     * Defines the UI of the connector
     * @default null
     * @deprecated
     */
    wrapper: any;
    /**
     * Defines the visual order of the node/connector in DOM
     * @aspdefaultvalue 5e-324
     * @default Number.MIN_VALUE
     */
    zIndex: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConnectorDirective, "e-connectors>e-connector", never, { "addInfo": "addInfo"; "allowNodeOverlap": "allowNodeOverlap"; "annotations": "annotations"; "bezierSettings": "bezierSettings"; "bridgeSpace": "bridgeSpace"; "connectionPadding": "connectionPadding"; "connectorSpacing": "connectorSpacing"; "constraints": "constraints"; "cornerRadius": "cornerRadius"; "dragSize": "dragSize"; "excludeFromLayout": "excludeFromLayout"; "fixedUserHandles": "fixedUserHandles"; "flip": "flip"; "flipMode": "flipMode"; "hitPadding": "hitPadding"; "id": "id"; "margin": "margin"; "maxSegmentThumb": "maxSegmentThumb"; "ports": "ports"; "previewSize": "previewSize"; "segmentThumbShape": "segmentThumbShape"; "segmentThumbSize": "segmentThumbSize"; "segments": "segments"; "shape": "shape"; "sourceDecorator": "sourceDecorator"; "sourceID": "sourceID"; "sourcePadding": "sourcePadding"; "sourcePoint": "sourcePoint"; "sourcePortID": "sourcePortID"; "style": "style"; "symbolInfo": "symbolInfo"; "targetDecorator": "targetDecorator"; "targetID": "targetID"; "targetPadding": "targetPadding"; "targetPoint": "targetPoint"; "targetPortID": "targetPortID"; "tooltip": "tooltip"; "type": "type"; "visible": "visible"; "wrapper": "wrapper"; "zIndex": "zIndex"; }, {}, ["childFixedUserHandles", "childAnnotations"]>;
}
/**
 * Connector Array Directive
 * @private
 */
export declare class ConnectorsDirective extends ArrayBase<ConnectorsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConnectorsDirective, "ej-diagram>e-connectors", never, {}, {}, ["children"]>;
}
