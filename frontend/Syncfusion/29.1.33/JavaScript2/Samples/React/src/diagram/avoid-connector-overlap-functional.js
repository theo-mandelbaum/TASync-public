"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
function create1to16Node(id, x, y, width, height) {
    var node = createNode(id, x, y, width, height);
    addShape(node, 1, 16);
    addPorts(node, 1, 'in');
    addPorts(node, 16, 'out');
    addPortsLabels(node, 16, 'out');
    return node;
}
function create16to1Node(id, x, y, width, height) {
    var node = createNode(id, x, y, width, height);
    addShape(node, 16, 1);
    addPorts(node, 16, 'in');
    addPorts(node, 1, 'out');
    addPortsLabels(node, 16, 'in');
    return node;
}
function create9to5Node(id, x, y, width, height) {
    var leftLabels = ['A_0', 'A_1', 'A_2', 'A_3', 'B_0', 'B_1', 'B_2', 'B_3', 'Cin'];
    var rightLabels = ['S_0', 'S_1', 'S_2', 'S_3', 'Cout'];
    var node = createNode(id, x, y, width, height, '4 Bit\nRCA');
    addShape(node, 9, 5);
    addPorts(node, 9, 'in');
    addPorts(node, 5, 'out', 9);
    addPortsLabels(node, 9, 'in', leftLabels);
    addPortsLabels(node, 5, 'out', rightLabels, 9);
    return node;
}
function createInputNode(id, x, y, width, height, label) {
    var node = createNode(id, x, y, width, height, label);
    addShape(node, 0, 1);
    addPorts(node, 1, 'out');
    var annotation = node.annotations[0];
    annotation.offset = { x: (width - 25) / (2 * width), y: 0.5 };
    return node;
}
function createOutputNode(id, x, y, width, height, label) {
    var node = createNode(id, x, y, width, height, label);
    addShape(node, 1, 0);
    addPorts(node, 1, 'in');
    var annotation = node.annotations[0];
    annotation.offset = { x: 1 - ((width - 25) / (2 * width)), y: 0.5 };
    return node;
}
function addShape(node, inCount, outCount) {
    var maxCount = Math.max(inCount, outCount);
    var rightX = outCount === 0 ? node.width : node.width - 25;
    var pathData = "M ".concat(rightX, " 0 ");
    if (outCount > 1) {
        for (var i = 1; i <= outCount; i++) {
            var portY = ((i / maxCount) - (1 / (2 * maxCount))) * node.height;
            pathData += "L ".concat(rightX, " ").concat(portY, " L ").concat(node.width, " ").concat(portY, " L ").concat(rightX, " ").concat(portY, " ");
        }
    }
    else if (outCount === 1) {
        pathData += "L ".concat(rightX, " ").concat(node.height * 0.5, " L ").concat(node.width, " ").concat(node.height * 0.5, " L ").concat(rightX, " ").concat(node.height * 0.5, " ");
    }
    var leftX = inCount === 0 ? 0 : 25;
    pathData += "L ".concat(rightX, " ").concat(node.height, " L ").concat(leftX, " ").concat(node.height, " ");
    if (inCount > 1) {
        for (var i = inCount; i >= 1; i--) {
            var portY = ((i / maxCount) - (1 / (2 * maxCount))) * node.height;
            pathData += "L ".concat(leftX, " ").concat(portY, " L 0 ").concat(portY, " L ").concat(leftX, " ").concat(portY, " ");
        }
    }
    else if (inCount === 1) {
        pathData += "L ".concat(leftX, " ").concat(node.height * 0.5, " L 0 ").concat(node.height * 0.5, " L ").concat(leftX, " ").concat(node.height * 0.5, " ");
    }
    pathData += "L ".concat(leftX, " 0 Z");
    node.shape = { type: 'Path', data: pathData };
}
function addPorts(node, count, side, factor) {
    if (factor === undefined) {
        factor = count;
    }
    if (count > 1) {
        for (var i = 1; i <= count; i++) {
            var port = {
                id: "".concat(node.id, "_").concat(side, "_").concat((i - 1)),
                offset: { x: side === 'out' ? 1 : 0, y: (i / factor) - (1 / (2 * factor)) },
                visibility: ej2_react_diagrams_1.PortVisibility.Visible,
                shape: 'Circle',
                style: { fill: 'black' },
                width: 8,
                height: 8
            };
            node.ports.push(port);
        }
    }
    else {
        var port = {
            id: "".concat(node.id, "_").concat(side, "_0"),
            offset: { x: side === 'out' ? 1 : 0, y: 0.5 },
            visibility: ej2_react_diagrams_1.PortVisibility.Visible,
            shape: 'Circle',
            style: { fill: 'black' },
            width: 8,
            height: 8
        };
        node.ports.push(port);
    }
}
function addPortsLabels(node, count, side, labels, factor) {
    if (factor === undefined) {
        factor = count;
    }
    var x = side === 'out' ? (node.width - 25 * 0.5) / node.width : (25 * 0.5) / node.width;
    for (var i = 1; i <= count; i++) {
        var label = {
            content: labels ? labels[i - 1] : "".concat(i - 1),
            offset: { x: x, y: (i / factor) - (1 / (2 * factor)) },
            style: { fontSize: 7 },
            verticalAlignment: 'Bottom',
            margin: { bottom: 2 }
        };
        node.annotations.push(label);
    }
}
function createNode(id, x, y, width, height, label) {
    var shapeStyle = { strokeColor: "black", strokeWidth: 2 };
    var diagramNode = {
        id: id,
        offsetX: x,
        offsetY: y,
        width: width,
        height: height,
        style: shapeStyle,
        shape: { type: 'Basic' },
        ports: [],
        annotations: []
    };
    if (label) {
        var annotation = { content: label, style: { fontSize: 14 } };
        diagramNode.annotations.push(annotation);
    }
    return diagramNode;
}
function createConnector(id, sourceId, targetId, sourcePortIndex, targetPortIndex, strokeColor) {
    if (strokeColor === void 0) { strokeColor = null; }
    var color = strokeColor ? strokeColor : "green";
    if (color === 'lightGreen') {
        color = '#1AD81A';
    }
    else if (color === 'green') {
        color = '#005100';
    }
    var diagramConnector = {
        id: id,
        cornerRadius: 5,
        sourceID: sourceId,
        targetID: targetId,
        sourcePortID: sourceId + '_out_' + sourcePortIndex,
        targetPortID: targetId + '_in_' + targetPortIndex,
        type: 'Orthogonal',
        segments: [{ type: 'Orthogonal' }],
        style: { strokeColor: color, strokeWidth: 2 },
        targetDecorator: { shape: 'None' }
    };
    return diagramConnector;
}
var nodes = [
    create1to16Node('node1', 205, 180, 80, 240),
    create1to16Node('node2', 205, 427.5, 80, 240),
    create9to5Node('node3', 415, 127.5, 100, 135),
    create9to5Node('node4', 415, 367.5, 100, 135),
    create9to5Node('node5', 615, 127.5, 100, 135),
    create9to5Node('node6', 615, 367.5, 100, 135),
    create16to1Node('node7', 820, 240, 80, 240),
    createInputNode('node8', 70, 40, 80, 30, 'Cin'),
    createInputNode('node9', 70, 180, 80, 30, 'A'),
    createInputNode('node10', 70, 427.5, 80, 30, 'B'),
    createOutputNode('node11', 950, 240, 80, 30, 'S'),
    createOutputNode('node12', 950, 367.5, 80, 30, 'Cout')
];
var connectors = [
    createConnector('connector01', 'node8', 'node3', 0, 8, 'lightGreen'),
    createConnector('connector02', 'node9', 'node1', 0, 0, 'orange'),
    createConnector('connector03', 'node10', 'node2', 0, 0, 'orange'),
    createConnector('connector04', 'node7', 'node11', 0, 0, 'orange'),
    createConnector('connector05', 'node6', 'node12', 4, 0),
    createConnector('connector06', 'node3', 'node5', 4, 8),
    createConnector('connector07', 'node5', 'node4', 4, 8, 'lightGreen'),
    createConnector('connector08', 'node4', 'node6', 4, 8),
    createConnector('connector1', 'node1', 'node3', 0, 0),
    createConnector('connector2', 'node1', 'node3', 1, 1),
    createConnector('connector3', 'node1', 'node3', 2, 2),
    createConnector('connector4', 'node1', 'node3', 3, 3),
    createConnector('connector5', 'node1', 'node5', 4, 0, 'lightGreen'),
    createConnector('connector6', 'node1', 'node5', 5, 1),
    createConnector('connector7', 'node1', 'node5', 6, 2),
    createConnector('connector8', 'node1', 'node5', 7, 3, 'lightGreen'),
    createConnector('connector9', 'node1', 'node4', 8, 0, 'lightGreen'),
    createConnector('connector10', 'node1', 'node4', 9, 1, 'lightGreen'),
    createConnector('connector11', 'node1', 'node4', 10, 2),
    createConnector('connector12', 'node1', 'node4', 11, 3, 'lightGreen'),
    createConnector('connector13', 'node1', 'node6', 12, 0),
    createConnector('connector14', 'node1', 'node6', 13, 1, 'lightGreen'),
    createConnector('connector15', 'node1', 'node6', 14, 2, 'lightGreen'),
    createConnector('connector16', 'node1', 'node6', 15, 3),
    createConnector('connector17', 'node2', 'node3', 0, 4, 'lightGreen'),
    createConnector('connector18', 'node2', 'node3', 1, 5, 'lightGreen'),
    createConnector('connector19', 'node2', 'node3', 2, 6),
    createConnector('connector20', 'node2', 'node3', 3, 7),
    createConnector('connector21', 'node2', 'node5', 4, 4, 'lightGreen'),
    createConnector('connector22', 'node2', 'node5', 5, 5, 'lightGreen'),
    createConnector('connector23', 'node2', 'node5', 6, 6, 'lightGreen'),
    createConnector('connector24', 'node2', 'node5', 7, 7, 'lightGreen'),
    createConnector('connector25', 'node2', 'node4', 8, 4),
    createConnector('connector26', 'node2', 'node4', 9, 5, 'lightGreen'),
    createConnector('connector27', 'node2', 'node4', 10, 6),
    createConnector('connector28', 'node2', 'node4', 11, 7),
    createConnector('connector29', 'node2', 'node6', 12, 4, 'lightGreen'),
    createConnector('connector30', 'node2', 'node6', 13, 5),
    createConnector('connector31', 'node2', 'node6', 14, 6),
    createConnector('connector32', 'node2', 'node6', 15, 7),
    createConnector('connector33', 'node3', 'node7', 0, 0),
    createConnector('connector34', 'node3', 'node7', 1, 1),
    createConnector('connector35', 'node3', 'node7', 2, 2, 'lightGreen'),
    createConnector('connector36', 'node3', 'node7', 3, 3),
    createConnector('connector37', 'node5', 'node7', 0, 4),
    createConnector('connector38', 'node5', 'node7', 1, 5),
    createConnector('connector39', 'node5', 'node7', 2, 6),
    createConnector('connector40', 'node5', 'node7', 3, 7, 'lightGreen'),
    createConnector('connector41', 'node4', 'node7', 0, 8),
    createConnector('connector42', 'node4', 'node7', 1, 9),
    createConnector('connector43', 'node4', 'node7', 2, 10, 'lightGreen'),
    createConnector('connector44', 'node4', 'node7', 3, 11),
    createConnector('connector45', 'node6', 'node7', 0, 12),
    createConnector('connector46', 'node6', 'node7', 1, 13),
    createConnector('connector47', 'node6', 'node7', 2, 14),
    createConnector('connector48', 'node6', 'node7', 3, 15, 'lightGreen')
];
var diagramInstance;
function AvoidConnectorOverlapDiagram() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    /**
     * Adjusts the diagram view to fit the page on render completion.
     */
    function rendereComplete() {
        diagramInstance.fitToPage();
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "580", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, constraints: ej2_react_diagrams_1.DiagramConstraints.Default | ej2_react_diagrams_1.DiagramConstraints.LineRouting | ej2_react_diagrams_1.DiagramConstraints.AvoidLineOverlapping, nodes: nodes, connectors: connectors, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.LineRouting, ej2_react_diagrams_1.AvoidLineOverlapping, ej2_react_diagrams_1.Snapping] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the connectors that automatically adjust to minimize visual overlap, ensuring clear and distinct representations of connections within the diagram.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This example showcases a circuit diagram created using the Syncfusion",
                React.createElement("sup", null, "\u00AE"),
                " Diagram control. It demonstrates the",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/diagram/constraints#diagram-constraints" }, "AvoidLineOverlapping")),
                "feature, which ensures that connectors do not visually overlap by automatically adjusting line segments for better visualization of connections."),
            React.createElement("br", null),
            React.createElement("p", null,
                "To use this feature we need to inject the ",
                React.createElement("code", null, "AvoidLineOverlapping"),
                " module in our diagram project into",
                React.createElement("code", null, "services"),
                " and enable the ",
                React.createElement("b", null, "AvoidLineOverlapping"),
                " feature in the",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/diagram/constraints#diagram-constraints" }, "DiagramConstraints")),
                " property."))));
}
exports.default = AvoidConnectorOverlapDiagram;
