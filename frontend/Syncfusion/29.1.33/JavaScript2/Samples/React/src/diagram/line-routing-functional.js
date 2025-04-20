"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
//Initialize Diagram Nodes
var nodes = [
    {
        id: 'start', offsetX: 115, offsetY: 110,
        shape: { type: 'Flow', shape: 'Terminator' },
        style: { fill: '#D5535D' },
        ports: [{ id: 'port1', offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden }],
        annotations: [{
                content: 'Start',
                style: { color: 'white' }
            }]
    },
    {
        id: 'process', offsetX: 115, offsetY: 255,
        shape: { type: 'Flow', shape: 'Process' },
        style: { fill: "#65B091" },
        annotations: [{
                content: 'Process',
                style: { color: 'white' }
            }]
    },
    {
        id: 'document', offsetX: 115, offsetY: 400,
        shape: { type: 'Flow', shape: 'Document' },
        style: { fill: "#5BA5F0" },
        ports: [{ id: 'port1', offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden }],
        annotations: [{
                content: 'Document',
                style: { color: 'white' }
            }]
    },
    {
        id: 'decision', offsetX: 390, offsetY: 110,
        shape: { type: 'Flow', shape: 'Decision' },
        style: { fill: "#9A8AF7" },
        annotations: [{
                content: 'Decision',
                style: { color: 'white' }
            }]
    },
    {
        id: 'document2', offsetX: 390, offsetY: 255,
        shape: { type: 'Flow', shape: 'Document' },
        style: { fill: "#5BA5F0" },
        annotations: [{
                content: 'Document',
                style: { color: 'white' }
            }]
    },
    {
        id: 'end', offsetX: 390, offsetY: 400,
        shape: { type: 'Flow', shape: 'Terminator' },
        style: { fill: "#9A8AF7" },
        annotations: [{
                content: 'End',
                style: { color: 'white' }
            }]
    },
    {
        id: 'process2', offsetX: 640, offsetY: 110,
        shape: { type: 'Flow', shape: 'Process' },
        style: { fill: "#65B091" },
        annotations: [{
                content: 'Process',
                style: { color: 'white' }
            }]
    },
    {
        id: 'card', offsetX: 640, offsetY: 255,
        shape: { type: 'Flow', shape: 'Card' },
        style: { fill: "#9A8AF7" },
        annotations: [{
                content: 'Card',
                style: { color: 'white' }
            }],
        ports: [
            { id: 'port1', offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden },
            { id: 'port2', offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_1.PortVisibility.Hidden }
        ],
    }
];
//Initialize Diagram Connectors
var connectors = [
    {
        id: 'Connector1', sourceID: 'start', targetID: 'process',
    },
    {
        id: 'Connector2', sourceID: 'process', targetID: 'document'
    },
    {
        id: 'Connector3', sourceID: 'document', targetID: 'end',
    },
    {
        id: 'Connector4', sourceID: 'start', targetID: 'decision'
    },
    {
        id: 'Connector5', sourceID: 'decision', targetID: 'process2',
    },
    {
        id: 'Connector6', sourceID: 'process2', targetID: 'card',
    },
    {
        id: 'Connector7', sourceID: 'process', targetID: 'document2'
    },
    {
        id: 'Connector8', sourceID: 'document2', targetID: 'card',
    },
    {
        id: 'Connector9', sourceID: 'start', sourcePortID: "port1",
        targetID: 'card', targetPortID: 'port1'
    },
    {
        id: 'Connector10', sourceID: 'card', sourcePortID: 'port2',
        targetID: 'document', targetPortID: 'port1'
    },
];
var diagramInstance;
function LineRoutingSample() {
    // React useEffect hook to run once on component mount
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete(); // Call rendereComplete function
    }, []);
    // Function to complete rendering actions
    function rendereComplete() {
        diagramInstance.fitToPage({ mode: 'Width' });
    }
    // Function to define defaults for nodes in the diagram
    function getNodeDefaults(node) {
        node.height = 50; // Default height for nodes
        if (node.id === 'decision') {
            node.height = 70; // Adjust height for specific node with id 'decision'
        }
        node.width = 120; // Default width for nodes
        node.style = { strokeColor: 'transparent' }; // Styling for nodes
        return node;
    }
    // Function to define defaults for connectors in the diagram
    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal'; // Connector type (Orthogonal)
        connector.style = { strokeColor: '#707070 ', strokeWidth: 1.25 }; // Connector styling (color and width)
        connector.targetDecorator = { style: { fill: '#707070 ', strokeColor: '#707070 ' } }; // Decorator styling for connectors
        return connector;
    }
    // Return JSX for rendering the component
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "499px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, constraints: ej2_react_diagrams_1.DiagramConstraints.Default | ej2_react_diagrams_1.DiagramConstraints.LineRouting | ej2_react_diagrams_1.DiagramConstraints.Bridging, nodes: nodes, connectors: connectors, getConnectorDefaults: getConnectorDefaults, getNodeDefaults: getNodeDefaults },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.LineRouting, ej2_react_diagrams_1.ConnectorBridging] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the connectors that are automatically re-routing or moving away if any shape found on the connectors path.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This example shows how the connectors are automatically re-routing or moving away on dragging a shape near it. This can be achieved by the constraints property of the diagram and connector."))));
}
exports.default = LineRoutingSample;
