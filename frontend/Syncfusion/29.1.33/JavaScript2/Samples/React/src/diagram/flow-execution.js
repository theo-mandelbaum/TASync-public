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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowExecution = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var port1 = { id: 'port1', offset: { x: 0.5, y: 1 } };
var port = { id: 'port', offset: { x: 1, y: 0.5 } };
// Initialize Diagram Nodes
var nodes = [];
nodes.push(createNodes('node1', 100, 125, 'Terminator', 'Begin'));
nodes.push(createNodes('node2', 300, 125, 'Process', 'Specify collection', [port]));
nodes.push(createNodes('node3', 500, 125, 'Decision', 'Particulars \n required?', [port1]));
nodes.push(createNodes('node4', 730, 125, 'Process', 'Specify particulars'));
nodes.push(createNodes('node5', 500, 225, 'Process', 'Design collection', [port]));
nodes.push(createNodes('node6', 500, 320, 'Process', 'Cluster of events'));
nodes.push(createNodes('node7', 500, 420, 'Process', 'Start the process'));
nodes.push(createNodes('node8', 730, 320, 'Process', 'Record and analyze \n results', [port]));
nodes.push(createNodes('node9', 730, 420, 'Terminator', 'End '));
// Initialize diagram connectors
var connectors = [];
connectors.push(createConnector('connector1', 'node1', 'node2', ''));
connectors.push(createConnector('connector2', 'node2', 'node3', ''));
connectors.push(createConnector('connector3', 'node3', 'node4', 'Yes'));
connectors.push(createConnector('connector4', 'node3', 'node5', 'No'));
connectors.push(createConnector('connector5', 'node5', 'node6', ''));
connectors.push(createConnector('connector6', 'node6', 'node7', ''));
connectors.push(createConnector('connector7', 'node8', 'node6', ''));
connectors.push(createConnector('connector8', 'node7', 'node9', ''));
connectors.push(createConnector('connector10', 'node4', 'node5', '', 'Orthogonal', 'Bottom', 'port', 220));
var SAMPLE_CSS = "\n#flowExecitionPropertySection .row {\n            margin-left: 0px;\n            margin-right: 0px;\n        }\n\n        #flowExecitionPropertySection .col-xs-7 {\n            width: 300px;\n        }\n\n        #flowExecitionPropertySection .col-xs-7 {\n            padding-left: 0px;\n            padding-right: 0px;\n        }\n\n        #flowExecitionControlSection.content-wrapper {\n            border: 1px solid #D7D7D7;\n        }\n";
var diagramInstance;
var FlowExecution = /** @class */ (function (_super) {
    __extends(FlowExecution, _super);
    function FlowExecution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlowExecution.prototype.renderComplete = function () {
        diagramInstance.select([diagramInstance.nodes[2]]);
        diagramInstance.selectionChange = function (arg) {
            applyChanges(selectedButton);
        };
    };
    FlowExecution.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane1" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { id: "flowExecitionControlSection", className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "600px", nodes: nodes, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, connectors: connectors, created: function (args) {
                            diagramInstance.select([diagramInstance.nodes[2]]);
                        }, selectionChange: function (args) {
                            applyChanges(selectedButton);
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding] })))),
            React.createElement("div", { id: "flowExecitionPropertySection", className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, " Choose a flow"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row property-panel-content", style: { overflow: "hidden" } }, [
                        { id: "UnhighlightAll", label: "None" },
                        { id: "LinksInto", label: "Incoming connections" },
                        { id: "LinksOutOf", label: "Outgoing connections" },
                        { id: "LinksConnected", label: "Incoming and outgoing connections", checked: true },
                        { id: "NodesInto", label: "Incoming nodes" },
                        { id: "NodesOutOf", label: "Outgoing nodes" },
                        { id: "NodesConnected", label: "Incoming and outgoing nodes" },
                        { id: "NodesReachable", label: "Flow of Execution" },
                    ].map(function (_a, index) {
                        var id = _a.id, label = _a.label, checked = _a.checked;
                        return (React.createElement("div", { className: "row", style: { paddingTop: index === 0 ? "0px" : "8px" } },
                            React.createElement("div", { className: "col-xs-7" },
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: id, name: 'radio', value: id, label: label, checked: checked, change: function (args) {
                                        buttonChange(args);
                                    } }))));
                    })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how we can process and get the consecutive nodes and connectors respectively.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "We can get the inward connections and outward connections of the node using ",
                    React.createElement("code", null, "inEdges"),
                    " and ",
                    React.createElement("code", null, "outEdges"),
                    "        properties of the node. By using this connector\u2019s name collection, we can find the node using ",
                    React.createElement("code", null, "getObject"),
                    ". And also, we can get the nodes connected on the connector using ",
                    React.createElement("code", null, "sourceNode"),
                    " and ",
                    React.createElement("code", null, "targetNode"),
                    "        properties of the connector. method can be used to print the diagrams."),
                React.createElement("br", null))));
    };
    return FlowExecution;
}(sample_base_1.SampleBase));
exports.FlowExecution = FlowExecution;
// Initialize the connector object with basic properties.
function createConnector(name, source, target, content, type, direction, targePort, length) {
    var connector = {};
    connector.id = name;
    connector.sourceID = source;
    connector.targetID = target;
    if (targePort) {
        connector.targetPortID = targePort;
    }
    connector.style = { strokeWidth: 2, strokeColor: '#8D8D8D' };
    var annotation = { content: content, style: { fill: 'white' } };
    connector.annotations = [annotation];
    connector.targetDecorator = { style: { strokeColor: '#8D8D8D', fill: '#8D8D8D' } };
    if (type) {
        connector.type = type;
        var segment = { type: type, direction: direction, length: length };
        connector.segments = [segment];
    }
    return connector;
}
// Initialize the node object with basic properties.
function createNodes(id, offsetX, offsetY, shapeType, content, ports) {
    var node = {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        width: 150,
        height: 50,
        style: { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 },
        shape: { type: 'Flow', shape: shapeType }
    };
    var annotations = { content: content };
    node.annotations = [annotations];
    if (ports) {
        node.ports = ports;
    }
    return node;
}
var highlightedObjects = [];
var selectedButton = 'LinksConnected';
function buttonChange(args) {
    applyChanges(args.event.srcElement.id);
    selectedButton = args.event.srcElement.id;
}
// Function To call respective methods based on user selection.
function applyChanges(id) {
    Unhighlight();
    switch (id) {
        case 'LinksInto':
            highlightIncomingConnections();
            break;
        case 'LinksOutOf':
            highlightOutgoingConnections();
            break;
        case 'LinksConnected':
            highlightIncomingConnections();
            highlightOutgoingConnections();
            break;
        case 'NodesInto':
            highlightIncomingNodes();
            break;
        case 'NodesOutOf':
            highlightOutgoingNodes();
            break;
        case 'NodesConnected':
            highlightIncomingNodes();
            highlightOutgoingNodes();
            break;
        case 'NodesReachable':
            highlightReachableNodes();
            break;
    }
}
// Highlight connectors
function highlightConnectors(edges) {
    edges.forEach(function (edge) {
        var index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[edge]);
        highlightedObjects.push(edge);
        var connector = diagramInstance.connectors[index];
        connector.style.strokeColor = '#1413F8';
        connector.targetDecorator.style.strokeColor = '#1413F8';
        connector.targetDecorator.style.fill = '#1413F8';
        diagramInstance.dataBind();
    });
}
;
// Function to display the incoming connectors.
function highlightIncomingConnections() {
    if (diagramInstance.selectedItems.nodes.length) {
        var edges = diagramInstance.selectedItems.nodes[0].inEdges;
        highlightConnectors(edges);
    }
}
// Function to display the outgoing connectors.
function highlightOutgoingConnections() {
    if (diagramInstance.selectedItems.nodes.length) {
        var edges = diagramInstance.selectedItems.nodes[0].outEdges;
        highlightConnectors(edges);
    }
}
// Highlight Nodes
function highlightNodes(edges, edgeType) {
    edges.forEach(function (edge) {
        var nodeId = diagramInstance.nameTable[edge][edgeType];
        highlightedObjects.push(nodeId);
        var index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[nodeId]);
        diagramInstance.nodes[index].style.strokeColor = '#1413F8';
        diagramInstance.dataBind();
    });
}
;
// Function to display the incoming Nodes.
function highlightIncomingNodes() {
    if (diagramInstance.selectedItems.nodes.length) {
        var edges = diagramInstance.selectedItems.nodes[0].inEdges;
        highlightNodes(edges, 'sourceID');
    }
}
// Function to display the outgoing Nodes.
function highlightOutgoingNodes() {
    if (diagramInstance.selectedItems.nodes.length) {
        var edges = diagramInstance.selectedItems.nodes[0].outEdges;
        highlightNodes(edges, 'targetID');
    }
}
// Function to display the flow of execution.
function highlightReachableNodes() {
    if (diagramInstance.selectedItems.nodes.length) {
        var connectors_1 = diagramInstance.selectedItems.nodes[0].outEdges;
        var nodeList = findConnectedNodes(connectors_1, []);
        highlightConnectors(nodeList);
    }
}
// Function to find the connected nodes.
function findConnectedNodes(edges, nodeList) {
    for (var i = 0; i < edges.length; i++) {
        var connector = diagramInstance.nameTable[edges[i]];
        if (nodeList.indexOf(connector.id) > -1) {
            break;
        }
        if (!connector.annotations[0] || connector.annotations[0].content !== 'No') {
            nodeList.push(connector.id);
        }
        if (diagramInstance.nameTable[connector.targetID].outEdges.length) {
            if (edges.indexOf(connector.targetID) === -1) {
                findConnectedNodes(diagramInstance.nameTable[connector.targetID].outEdges, nodeList);
            }
        }
    }
    return nodeList;
}
// Function To unhighlight highlighted objects.
function Unhighlight() {
    for (var i = highlightedObjects.length - 1; i >= 0; i--) {
        if (diagramInstance.nameTable[highlightedObjects[i]] instanceof ej2_react_diagrams_1.Node) {
            var index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[highlightedObjects[i]]);
            diagramInstance.nodes[index].style.strokeColor = '#E8DFB6';
            diagramInstance.dataBind();
        }
        else {
            var index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[highlightedObjects[i]]);
            var connector = diagramInstance.connectors[index];
            connector.style.strokeColor = '#8D8D8D';
            connector.targetDecorator.style.strokeColor = '#8D8D8D';
            connector.targetDecorator.style.fill = '#8D8D8D';
            diagramInstance.dataBind();
        }
    }
    highlightedObjects = [];
}
