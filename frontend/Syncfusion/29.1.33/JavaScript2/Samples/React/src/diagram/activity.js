"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UmlActivityDiagram = void 0;
// Importing React and necessary components from Syncfusion's EJ2 React Diagrams library for building the UML Activity diagram.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
// Creates a UML activity node with specified properties
var createNode = function (id, offsetX, offsetY, shapeType, width, height, content) {
    if (width === void 0) { width = 40; }
    if (height === void 0) { height = 40; }
    if (content === void 0) { content = ''; }
    return ({
        id: id,
        width: width,
        height: height,
        offsetX: offsetX,
        offsetY: offsetY,
        shape: { type: "UmlActivity", shape: shapeType },
        annotations: content ? [{ content: content }] : []
    });
};
// Initializes nodes representing the flow of a customer service call process
var nodes = [
    createNode("Start", 300, 20, "InitialNode"),
    createNode("ReceiveCall", 300, 100, "Action", 105, 40, "Receive Customer Call"),
    createNode("ForkNode", 300, 170, "ForkNode", 70, 10),
    createNode("Determine", 190, 250, "Action", 105, 40, "Determine Type of Call"),
    createNode("Log", 410, 250, "Action", 105, 40, "Customer Logging a Call"),
    createNode("Decision", 190, 350, "Decision", 50, 50),
    createNode("transfer_sales", 100, 450, "Action", 105, 40, "Transfer the Call to Sales"),
    createNode("transfer_desk", 280, 450, "Action", 105, 40, "Transfer the Call to Help Desk"),
    createNode("MergeNode", 190, 540, "MergeNode", 50, 50),
    createNode("JoinNode", 300, 630, "JoinNode", 70, 10),
    createNode("CloseCall", 300, 710, "Action", 105, 40, "Close Call"),
    createNode("FinalNode", 300, 800, "FinalNode")
];
// Creates a UML activity diagram connector with specified properties
var createConnector = function (id, sourceID, targetID, sourcePortID, targetPortID, additionalProps) {
    if (sourcePortID === void 0) { sourcePortID = ""; }
    if (targetPortID === void 0) { targetPortID = ""; }
    if (additionalProps === void 0) { additionalProps = {}; }
    return (__assign({ id: id, sourceID: sourceID, targetID: targetID, sourcePortID: sourcePortID, targetPortID: targetPortID }, additionalProps));
};
// Defines common segments for connectors
var commonSegments = {
    orthogonalShort: [{ type: "Orthogonal", length: 20, direction: "Bottom" }],
    orthogonalLongLeft: [{ type: "Orthogonal", length: 50, direction: "Left" }],
    orthogonalLongRight: [{ type: "Orthogonal", length: 50, direction: "Right" }],
    orthogonalBottom: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
};
// Initializes connectors for transitions between activities
var connectors = [
    createConnector("connector1", "Start", "ReceiveCall"),
    createConnector("connector2", "ReceiveCall", "ForkNode"),
    createConnector("connector3", "ForkNode", "Determine", "port1", "portTop", {
        segments: __spreadArray(__spreadArray([], commonSegments.orthogonalShort, true), commonSegments.orthogonalLongLeft, true)
    }),
    createConnector("connector4", "ForkNode", "Log", "port2", "portTop", {
        segments: __spreadArray(__spreadArray([], commonSegments.orthogonalShort, true), commonSegments.orthogonalLongRight, true)
    }),
    createConnector("connector5", "Determine", "Decision"),
    createConnector("connector6", "Decision", "transfer_sales", "portLeft", "portTop", {
        shape: { type: "UmlActivity", flow: "Association" },
        annotations: [{
                id: "connector6Label", content: "type=New Customer", offset: 0.715,
                style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
            }]
    }),
    createConnector("connector7", "Decision", "transfer_desk", "portRight", "portTop", {
        shape: { type: "UmlActivity", flow: "Association" },
        annotations: [{
                id: "connector7Label", content: "type=Existing Customer", offset: 0.75,
                style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
            }]
    }),
    createConnector("connector8", "transfer_sales", "MergeNode", "portBottom", "portLeft", {
        segments: commonSegments.orthogonalBottom
    }),
    createConnector("connector9", "transfer_desk", "MergeNode", "portBottom", "portRight", {
        segments: commonSegments.orthogonalBottom
    }),
    createConnector("connector10", "MergeNode", "JoinNode", "portBottom", "port3"),
    createConnector("connector11", "Log", "JoinNode", "portBottom", "port4", {
        segments: __spreadArray([
            { type: "Orthogonal", length: 265, direction: "Bottom" }
        ], commonSegments.orthogonalLongLeft, true)
    }),
    createConnector("connector12", "JoinNode", "CloseCall"),
    createConnector("connector13", "CloseCall", "FinalNode")
];
// Holds instances of DiagramComponent and HTMLElement for diagram manipulation and UI interaction
var diagramInstance;
var diagramSpaceInstance;
var paletteIconInstance;
var paletteSpaceInstance;
// Initializes an array of UML activity shapes for the symbol palette
var umlActivityShapes = [
    'Action', 'Decision', 'MergeNode', 'InitialNode', 'FinalNode', 'ForkNode',
    'JoinNode', 'TimeEvent', 'AcceptingEvent', 'SendSignal', 'ReceiveSignal',
    'StructuredNode', 'Note'
].map(function (shape) { return ({ id: shape, shape: { type: 'UmlActivity', shape: shape } }); });
// Defines a base connector symbol to standardize connector creation
var baseConnector = {
    sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 2, strokeColor: '#757575' }
};
// Initializes connector symbols with varying styles for the symbol palette
var connectorSymbols = [
    __assign(__assign({}, baseConnector), { id: 'Link1', type: 'Orthogonal' }),
    __assign(__assign({}, baseConnector), { id: 'Link2', type: 'Orthogonal', style: __assign(__assign({}, baseConnector.style), { strokeDashArray: '4 4' }) }),
    __assign(__assign({}, baseConnector), { id: 'Link3', type: 'Straight' })
];
// CSS styles for the diagram editor's layout, enhancing mobile responsiveness
var SAMPLE_CSS = "\n.sb-mobile-palette {\n  width: 210px;\n  height: 100%;\n  float: left;\n}\n\n.sb-mobile-palette-bar {\n  display: none;\n}\n\n.sb-mobile-diagram {\n  width: calc(100% - 212px);\n  height: 100%;\n  float: left;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-left: none;\n}\n\n@media (max-width: 550px) {\n\n  .sb-mobile-palette {\n      z-index: 19;\n      position: absolute;\n      display: none;\n      transition: transform 300ms linear, visibility 0s linear 300ms;\n      width: 39%;\n      height: 100%;\n  }\n\n  .sb-mobile-palette-bar {\n      display: block;\n      width: 100%;\n      background: #fafafa;\n      padding: 10px 10px;\n      border: 0.5px solid #e0e0e0;\n      min-height: 40px;\n  }\n\n  .sb-mobile-diagram {\n      width: 100%;\n      height: 100%;\n      float: left;\n      left: 0px;\n  }\n\n  #paletteIcon {\n      font-size: 20px;\n  }\n}\n\n.sb-mobile-palette-open {\n  position: absolute;\n  display: block;\n  right: 15px;\n}\n\n.e-toggle-palette::before {\n  content: \"e700\"\n}";
var UmlActivityDiagram = /** @class */ (function (_super) {
    __extends(UmlActivityDiagram, _super);
    function UmlActivityDiagram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Adds mobile-specific event listeners and centers the diagram upon rendering completion.
    UmlActivityDiagram.prototype.renderComplete = function () {
        addMobileEvents();
        var rect = diagramSpaceInstance.getBoundingClientRect();
        var panX = (rect.width - rect.x) / 2;
        // Pan diagram to center horizontally
        diagramInstance.pan(panX, 0);
    };
    // Renders the UML Activity Diagram component.
    UmlActivityDiagram.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: "umlActivityDiagram", style: { width: "100%", height: "521px" } },
                    React.createElement("div", { className: "sb-mobile-palette-bar" },
                        React.createElement("div", { id: "paletteIcon", ref: function (paletteIcon) { return (paletteIconInstance = paletteIcon); }, style: { float: "right" }, className: "e-ddb-icons1 e-toggle-palette" })),
                    React.createElement("div", { id: "paletteSpace", ref: function (paletteSpace) { return (paletteSpaceInstance = paletteSpace); }, className: "sb-mobile-palette" },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", palettes: [
                                {
                                    id: "umlActivity",
                                    expanded: true,
                                    symbols: umlActivityShapes,
                                    title: "UML Shapes"
                                },
                                {
                                    id: "connectors",
                                    expanded: true,
                                    symbols: connectorSymbols,
                                    title: "Connectors"
                                }
                            ], width: "100%", height: "505px", 
                            // Sets the default values for nodes
                            getNodeDefaults: function (symbol) {
                                if (symbol.id === 'JoinNode') {
                                    symbol.width = 20;
                                    symbol.height = 50;
                                }
                                else if (symbol.id === 'ForkNode') {
                                    symbol.width = 50;
                                    symbol.height = 20;
                                }
                                else if (symbol.id === 'Decision' || symbol.id === 'MergeNode') {
                                    symbol.width = 50;
                                    symbol.height = 40;
                                }
                                else {
                                    symbol.width = 50;
                                    symbol.height = 50;
                                }
                                if (symbol.id === 'InitialNode' || symbol.id === 'FinalNode' || symbol.id === 'JoinNode' || symbol.id === 'ForkNode') {
                                    symbol.style.fill = '#757575';
                                }
                                symbol.style.strokeColor = '#757575';
                            }, symbolHeight: 55, symbolWidth: 55, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, getSymbolInfo: function (symbol) {
                                return { fit: true };
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] }))),
                    React.createElement("div", { id: "diagramSpace", ref: function (diagramSpace) { return (diagramSpaceInstance = diagramSpace); }, className: "sb-mobile-diagram" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "100%", nodes: nodes, connectors: connectors, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                            // Sets the default values for nodes
                            getNodeDefaults: function (node) {
                                node.ports = getNodePorts(node);
                                if (node.ports) {
                                    for (var i = 0; i < node.ports.length; i++) {
                                        node.ports[i].visibility = ej2_react_diagrams_1.PortVisibility.Hidden;
                                    }
                                }
                                if (node.id === 'Start' || node.id === 'ForkNode' || node.id === 'JoinNode' || node.id === 'FinalNode') {
                                    node.style.fill = '#444';
                                }
                                node.style.strokeColor = '#444';
                                return node;
                            }, 
                            // Sets the default values for connectors
                            getConnectorDefaults: function (connector) {
                                if (connector.id.indexOf('connector') !== -1) {
                                    connector.type = 'Orthogonal';
                                    connector.cornerRadius = 10;
                                    connector.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
                                }
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample represents the message flow from one activity to another in customer service using built-in UML activity shapes")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to create activity shapes using diagram ",
                    React.createElement("code", null, "UMLActivity"),
                    " shapes. The   ",
                    React.createElement("code", null, "type"),
                    " property of the",
                    React.createElement("code", null, "shape"),
                    " can be used to create ",
                    React.createElement("code", null, "UMLActivity"),
                    " nodes. The ",
                    React.createElement("code", null, "shape"),
                    " property of the shape allows you to create UML activity shapes."),
                React.createElement("br", null))));
    };
    return UmlActivityDiagram;
}(sample_base_1.SampleBase));
exports.UmlActivityDiagram = UmlActivityDiagram;
// Determines the port positions for a node based on its type.
function getNodePorts(node) {
    if (node.id === 'ForkNode' || node.id === 'JoinNode') {
        // Ports for ForkNode and JoinNode
        var node2Ports = [
            { id: 'port1', offset: { x: 0.2, y: 1 } },
            { id: 'port2', offset: { x: 0.8, y: 1 } },
            { id: 'port3', offset: { x: 0.2, y: 0 } },
            { id: 'port4', offset: { x: 0.8, y: 0 } },
        ];
        return node2Ports;
    }
    else {
        // Default ports for other nodes
        var ports = [
            { id: 'portLeft', offset: { x: 0, y: 0.5 } },
            { id: 'portRight', offset: { x: 1, y: 0.5 } },
            { id: 'portBottom', offset: { x: 0.5, y: 1 } },
            { id: 'portTop', offset: { x: 0.5, y: 0 } },
        ];
        return ports;
    }
}
// Indicates whether the current device is mobile based on the screen width.
var isMobile;
// Adds event listeners for mobile-specific interactions.
function addMobileEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    // Check if device is mobile
    if (isMobile && paletteIconInstance) {
        paletteIconInstance.addEventListener('click', togglePalette, false);
    }
}
// Toggles the symbol palette's visibility on mobile devices.
function togglePalette() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpaceInstance.classList.contains('sb-mobile-palette-open')) {
            // Open palette
            paletteSpaceInstance.classList.add('sb-mobile-palette-open');
        }
        else {
            // Close palette
            paletteSpaceInstance.classList.remove('sb-mobile-palette-open');
        }
    }
}
