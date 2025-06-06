import * as React from "react";
import { Node, DataBinding, DiagramComponent, SnapConstraints, Inject } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
let port1 = { id: 'port1', offset: { x: 0.5, y: 1 } };
let port = { id: 'port', offset: { x: 1, y: 0.5 } };
// Initialize Diagram Nodes
let nodes = [];
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
let connectors = [];
connectors.push(createConnector('connector1', 'node1', 'node2', ''));
connectors.push(createConnector('connector2', 'node2', 'node3', ''));
connectors.push(createConnector('connector3', 'node3', 'node4', 'Yes'));
connectors.push(createConnector('connector4', 'node3', 'node5', 'No'));
connectors.push(createConnector('connector5', 'node5', 'node6', ''));
connectors.push(createConnector('connector6', 'node6', 'node7', ''));
connectors.push(createConnector('connector7', 'node8', 'node6', ''));
connectors.push(createConnector('connector8', 'node7', 'node9', ''));
connectors.push(createConnector('connector10', 'node4', 'node5', '', 'Orthogonal', 'Bottom', 'port', 220));
let SAMPLE_CSS = `
#flowExecitionPropertySection .row {
            margin-left: 0px;
            margin-right: 0px;
        }

        #flowExecitionPropertySection .col-xs-7 {
            width: 300px;
        }

        #flowExecitionPropertySection .col-xs-7 {
            padding-left: 0px;
            padding-right: 0px;
        }

        #flowExecitionControlSection.content-wrapper {
            border: 1px solid #D7D7D7;
        }
`;
let diagramInstance;
export class FlowExecution extends SampleBase {
    renderComplete() {
        diagramInstance.select([diagramInstance.nodes[2]]);
        diagramInstance.selectionChange = (arg) => {
            applyChanges(selectedButton);
        };
    }
    render() {
        return (<div className="control-pane1">
                <div className="col-lg-8 control-section">
                    <style>{SAMPLE_CSS}</style>
                    <div id="flowExecitionControlSection" className="content-wrapper" style={{ width: "100%" }}>
                        <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"600px"} nodes={nodes} snapSettings={{ constraints: SnapConstraints.None }} connectors={connectors} created={(args) => {
                diagramInstance.select([diagramInstance.nodes[2]]);
            }} selectionChange={(args) => {
                applyChanges(selectedButton);
            }}>
                            <Inject services={[DataBinding]}/>
                        </DiagramComponent>
                    </div>
                </div>
                <div id="flowExecitionPropertySection" className="col-lg-4 property-section">
                    <div className="property-panel-header"> Choose a flow</div>
                    <div className="row property-panel-content" id="appearance">
                        <div className="row property-panel-content" style={{ overflow: "hidden" }}>
                            {[
                { id: "UnhighlightAll", label: "None" },
                { id: "LinksInto", label: "Incoming connections" },
                { id: "LinksOutOf", label: "Outgoing connections" },
                { id: "LinksConnected", label: "Incoming and outgoing connections", checked: true },
                { id: "NodesInto", label: "Incoming nodes" },
                { id: "NodesOutOf", label: "Outgoing nodes" },
                { id: "NodesConnected", label: "Incoming and outgoing nodes" },
                { id: "NodesReachable", label: "Flow of Execution" },
            ].map(({ id, label, checked }, index) => (<div className="row" style={{ paddingTop: index === 0 ? "0px" : "8px" }}>
                                    <div className="col-xs-7">
                                        <RadioButtonComponent id={id} name='radio' value={id} label={label} checked={checked} change={(args) => {
                    buttonChange(args);
                }}/>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how we can process and get the consecutive nodes and connectors respectively.
                    </p>
                </div>
                <div id="description">
                    <p>
                        We can get the inward connections and outward connections of the node using <code>inEdges</code> and <code>outEdges</code>        properties of the node. By using this connector’s name collection, we can find the node using <code>getObject</code>.
                        And also, we can get the nodes connected on the connector using <code>sourceNode</code> and <code>targetNode</code>        properties of the connector. method can be used to print the diagrams.
                    </p>
                    <br />
                </div>
            </div>);
    }
}
// Initialize the connector object with basic properties.
function createConnector(name, source, target, content, type, direction, targePort, length) {
    let connector = {};
    connector.id = name;
    connector.sourceID = source;
    connector.targetID = target;
    if (targePort) {
        connector.targetPortID = targePort;
    }
    connector.style = { strokeWidth: 2, strokeColor: '#8D8D8D' };
    let annotation = { content: content, style: { fill: 'white' } };
    connector.annotations = [annotation];
    connector.targetDecorator = { style: { strokeColor: '#8D8D8D', fill: '#8D8D8D' } };
    if (type) {
        connector.type = type;
        let segment = { type: type, direction: direction, length: length };
        connector.segments = [segment];
    }
    return connector;
}
// Initialize the node object with basic properties.
function createNodes(id, offsetX, offsetY, shapeType, content, ports) {
    let node = {
        id,
        offsetX,
        offsetY,
        width: 150,
        height: 50,
        style: { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 },
        shape: { type: 'Flow', shape: shapeType }
    };
    let annotations = { content: content };
    node.annotations = [annotations];
    if (ports) {
        node.ports = ports;
    }
    return node;
}
let highlightedObjects = [];
let selectedButton = 'LinksConnected';
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
    edges.forEach(edge => {
        let index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[edge]);
        highlightedObjects.push(edge);
        let connector = diagramInstance.connectors[index];
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
        let edges = diagramInstance.selectedItems.nodes[0].inEdges;
        highlightConnectors(edges);
    }
}
// Function to display the outgoing connectors.
function highlightOutgoingConnections() {
    if (diagramInstance.selectedItems.nodes.length) {
        let edges = diagramInstance.selectedItems.nodes[0].outEdges;
        highlightConnectors(edges);
    }
}
// Highlight Nodes
function highlightNodes(edges, edgeType) {
    edges.forEach(edge => {
        let nodeId = diagramInstance.nameTable[edge][edgeType];
        highlightedObjects.push(nodeId);
        let index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[nodeId]);
        diagramInstance.nodes[index].style.strokeColor = '#1413F8';
        diagramInstance.dataBind();
    });
}
;
// Function to display the incoming Nodes.
function highlightIncomingNodes() {
    if (diagramInstance.selectedItems.nodes.length) {
        let edges = diagramInstance.selectedItems.nodes[0].inEdges;
        highlightNodes(edges, 'sourceID');
    }
}
// Function to display the outgoing Nodes.
function highlightOutgoingNodes() {
    if (diagramInstance.selectedItems.nodes.length) {
        let edges = diagramInstance.selectedItems.nodes[0].outEdges;
        highlightNodes(edges, 'targetID');
    }
}
// Function to display the flow of execution.
function highlightReachableNodes() {
    if (diagramInstance.selectedItems.nodes.length) {
        let connectors = diagramInstance.selectedItems.nodes[0].outEdges;
        let nodeList = findConnectedNodes(connectors, []);
        highlightConnectors(nodeList);
    }
}
// Function to find the connected nodes.
function findConnectedNodes(edges, nodeList) {
    for (let i = 0; i < edges.length; i++) {
        let connector = diagramInstance.nameTable[edges[i]];
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
    for (let i = highlightedObjects.length - 1; i >= 0; i--) {
        if (diagramInstance.nameTable[highlightedObjects[i]] instanceof Node) {
            let index = diagramInstance.nodes.indexOf(diagramInstance.nameTable[highlightedObjects[i]]);
            diagramInstance.nodes[index].style.strokeColor = '#E8DFB6';
            diagramInstance.dataBind();
        }
        else {
            let index = diagramInstance.connectors.indexOf(diagramInstance.nameTable[highlightedObjects[i]]);
            let connector = diagramInstance.connectors[index];
            connector.style.strokeColor = '#8D8D8D';
            connector.targetDecorator.style.strokeColor = '#8D8D8D';
            connector.targetDecorator.style.fill = '#8D8D8D';
            diagramInstance.dataBind();
        }
    }
    highlightedObjects = [];
}
