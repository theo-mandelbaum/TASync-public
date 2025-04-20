"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the diagram.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
// Global variables for diagram and property panel instances, and UI components.
var diagramInstance;
var propertypanelInstance;
var portVisibilityDrop;
var portFillDrop;
var portBorderDrop;
var portShapeDrop;
var portSizeNum;
var portWidthNum;
// Creates a node with specified properties and ports.
function createNode(id, offsetX, offsetY, annotationContent, ports) {
    return {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        annotations: [{ content: annotationContent }],
        ports: ports
    };
}
// Creates a connector linking two ports of different nodes.
function createConnector(id, sourceID, sourcePortID, targetID, targetPortID) {
    return {
        id: id,
        sourceID: sourceID,
        sourcePortID: sourcePortID,
        targetID: targetID,
        targetPortID: targetPortID
    };
}
// Creates a port with specified properties.
function createPort(id, shape, offsetX, offsetY, text) {
    return {
        id: id,
        shape: shape,
        offset: { x: offsetX, y: offsetY },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: text
    };
}
// Predefined ports for nodes.
var node1Port = [
    createPort('port1', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port2', 'Circle', 1, 0.5, 'OUT - 1'),
    createPort('port3', 'Circle', 0.25, 1, 'In - 2'),
    createPort('port4', 'Circle', 0.5, 1, 'OUT - 2'),
    createPort('port5', 'Circle', 0.75, 1, 'In - 3')
];
var node2Port = [
    createPort('port6', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port7', 'Circle', 1, 0.35, 'OUT - 1'),
    createPort('port8', 'Circle', 1, 0.70, 'In - 2'),
    createPort('port9', 'Circle', 0.5, 1, 'OUT - 2')
];
var node3Port = [
    createPort('port10', 'Circle', 0, 0.5, 'Out - 1'),
    createPort('port11', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port12', 'Circle', 0.5, 1, 'OUT - 2')
];
var node4Port = [
    createPort('port13', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port14', 'Circle', 0.5, 0, 'In - 2'),
    createPort('port15', 'Circle', 0.5, 1, 'OUT - 1')
];
var node5Port = [
    createPort('port16', 'Circle', 0, 0.5, 'out - 1'),
    createPort('port17', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port18', 'Circle', 1, 0.5, 'OUT - 2')
];
var node6Port = [
    createPort('port19', 'Circle', 0, 0.35, 'In - 1'),
    createPort('port20', 'Circle', 0.5, 1, 'Out - 1')
];
var node7Port = [
    createPort('port21', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port22', 'Circle', 0.5, 1, 'Out - 1')
];
// Basic shapes for nodes.
var shape1 = { type: "Basic", shape: "Rectangle" };
var shape2 = { type: "Basic", shape: "Diamond" };
// Node definitions for the diagram.
var nodes = [
    createNode('node1', 100, 100, 'Publisher', node1Port),
    createNode('node2', 300, 100, 'Completed Book', node2Port),
    createNode('node3', 300, 200, '1st Review', node3Port),
    createNode('node4', 300, 300, 'Legal Terms', node4Port),
    createNode('node5', 300, 400, '2nd Review', node5Port),
    createNode('node6', 500, 100, 'Board', node6Port),
    createNode('node7', 500, 200, 'Approval', node7Port)
];
// Connector definitions for the diagram.
var connectors = [
    createConnector('connector1', 'node1', 'port2', 'node2', 'port6'),
    createConnector('connector2', 'node1', 'port4', 'node4', 'port13'),
    createConnector('connector3', 'node2', 'port9', 'node3', 'port11'),
    createConnector('connector4', 'node2', 'port7', 'node6', 'port19'),
    createConnector('connector5', 'node3', 'port10', 'node1', 'port5'),
    createConnector('connector6', 'node3', 'port12', 'node4', 'port14'),
    createConnector('connector7', 'node4', 'port15', 'node5', 'port17'),
    createConnector('connector8', 'node5', 'port18', 'node2', 'port8'),
    createConnector('connector9', 'node5', 'port16', 'node1', 'port3'),
    createConnector('connector10', 'node6', 'port20', 'node7', 'port21'),
    createConnector('connector11', 'node7', 'port22', 'node1', 'port1')
];
// Port visibility options for the dropdown.
var visibility = [
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Visible, text: "Visible" },
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Hidden, text: "Hidden" },
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Hover, text: "Hover" },
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Connect, text: "Connect" }
];
// Port shape options for the dropdown.
var shape = [
    { shape: "X", text: "X" },
    { shape: "Circle", text: "Circle" },
    { shape: "Square", text: "Square" },
    { shape: "Custom", text: "Custom" }
];
// CSS styles for the property panel.
var sample_css = " \n.sb-child-row {\n  margin-top: 8px;\n}\n\n.property-panel-header {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\n.property-section .e-remove-selection{\n  cursor: not-allowed;\n}\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n  padding-left: 10px\n}\n\n.e-remove-selection .property-section-content {\n  pointer-events: none;\n}";
// Handles changes in selection within the diagram.
// It updates the property panel based on the selected node's port properties.
function onSelectionChange(args) {
    if (args.state === "Changed") {
        var selectedElement = document.getElementsByClassName("e-remove-selection");
        if (args.newValue) {
            if (!propertypanelInstance.classList.contains("e-remove-selection")) {
                propertypanelInstance.classList.add("e-remove-selection");
            }
            if (args.newValue[0] instanceof ej2_react_diagrams_1.Node && selectedElement.length) {
                selectedElement[0].classList.remove("e-remove-selection");
                var port = getSelectedPort()[0];
                // Update UI components with the selected port's properties.
                portVisibilityDrop.value = port.visibility;
                portVisibilityDrop.dataBind();
                portFillDrop.value = port.style.fill;
                portFillDrop.dataBind();
                portBorderDrop.value = port.style.strokeColor;
                portBorderDrop.dataBind();
                portShapeDrop.value = port.shape;
                portShapeDrop.dataBind();
                portSizeNum.value = port.height;
                portSizeNum.dataBind();
                portWidthNum.value = port.style.strokeWidth;
                portWidthNum.dataBind();
            }
        }
    }
}
// Retrieves the ports of the currently selected node in the diagram.
function getSelectedPort() {
    var node = diagramInstance.selectedItems.nodes[0];
    var port = [];
    if (node) {
        port = node.ports;
    }
    return port;
}
// Updates the visibility of the selected port(s) based on the user's selection in the dropdown.
function onPortVisibilityChange(args) {
    var port = getSelectedPort();
    if (port) {
        for (var j = 0; j < port.length; j++) {
            port[j].visibility = portVisibilityDrop.value;
            diagramInstance.dataBind();
        }
    }
}
// Updates the shape of the selected port(s) based on the user's selection in the dropdown.
function onPortShapeChange(args) {
    var port = getSelectedPort();
    for (var j = 0; j < port.length; j++) {
        switch (portShapeDrop.value) {
            case "X":
                port[j].shape = "X";
                break;
            case "Circle":
                port[j].shape = "Circle";
                break;
            case "Square":
                port[j].shape = "Square";
                break;
            case "Custom":
                port[j].shape = "Custom";
                port[j].pathData = "M6.805,0L13.61,10.703L0,10.703z";
                break;
        }
        diagramInstance.dataBind();
    }
}
// Applies the selected style (size or stroke width) to the selected port(s).
function applyPortStyle(value) {
    var port = getSelectedPort();
    for (var j = 0; j < port.length; j++) {
        if (value === "size" && portSizeNum) {
            port[j].height = portSizeNum.value;
            port[j].width = portSizeNum.value;
        }
        else if (value === "strokewidth" && portWidthNum) {
            port[j].style.strokeWidth = portWidthNum.value;
        }
    }
    diagramInstance.dataBind();
}
// Component for Port
function Port() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    // This method is called after the component is rendered.
    // It fits the diagram content within the diagram viewport and selects the first node.
    function rendereComplete() {
        diagramInstance.fitToPage();
        diagramInstance.select([diagramInstance.nodes[0]]);
    }
    // Renders the diagram and property panel UI components.
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, sample_css),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: 580, nodes: nodes, connectors: connectors, selectionChange: onSelectionChange, snapSettings: { constraints: 0 }, 
                // Sets default properties for nodes, including shape, size, and style.
                getNodeDefaults: function (node) {
                    // Initialize shape based on node ID.
                    if (node.id === "node1" || node.id === "node2" ||
                        node.id === "node4" || node.id === "node6") {
                        node.shape = shape1;
                    }
                    else if (node.id === "node3" || node.id === "node5" ||
                        node.id === "node7") {
                        node.shape = shape2;
                    }
                    // Sets height, width, and style for nodes.
                    node.height = 65;
                    node.width = 100;
                    node.style = { fill: "#ebf8fb", strokeColor: "#baeaf5" };
                    // Sets styles for the ports of the node.
                    node.ports.forEach(function (port) {
                        port.style = {
                            fill: "#366f8c",
                            strokeColor: "#366f8c"
                        };
                        port.width = 6;
                        port.height = 6;
                    });
                    // Sets style for the node annotations.
                    node.annotations[0].style = {
                        bold: true,
                        fontSize: 13,
                        color: "black"
                    };
                }, 
                // Sets default properties for connectors, including type and style.
                getConnectorDefaults: function (connector) {
                    // Defines type and style of the connectors.
                    connector.type = "Orthogonal";
                    connector.style = { strokeColor: "#8cdcef", strokeWidth: 1 };
                    // Sets the target decorator style.
                    connector.targetDecorator = {
                        width: 5,
                        height: 5,
                        style: { fill: "#8cdcef", strokeColor: "#8cdcef" }
                    };
                } })),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("div", { className: "property-panel-content" },
                React.createElement("div", { id: "propertypanel", className: "e-remove-selection", ref: function (propertypanel) { return (propertypanelInstance = propertypanel); } },
                    React.createElement("div", { className: "property-section-content" },
                        React.createElement("div", { className: "row row-header", style: { fontSize: "13px" } }, "Port Customization"),
                        React.createElement("div", { className: "row sb-child-row" },
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { style: { paddingBottom: "8px" } }, "Visibility"),
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "portsVisiblity", enabled: true, dataSource: visibility, fields: { value: "PortVisibility", text: "text" }, change: onPortVisibilityChange, ref: function (portVisibilityref) { portVisibilityDrop = portVisibilityref; } },
                                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { style: { paddingBottom: "8px" } }, "Shape"),
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "shape", enabled: true, placeholder: "Select a Shape", dataSource: shape, value: "Circle", fields: { value: "shape", text: "text" }, change: onPortShapeChange, ref: function (portShapeDropref) {
                                            return (portShapeDrop = portShapeDropref);
                                        } })))),
                        React.createElement("div", { className: "row sb-child-row" },
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { style: { paddingBottom: "8px" } }, "Fill Color"),
                                React.createElement("div", { style: { paddingBottom: "8px" } },
                                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "fillcolor", value: "#000", disabled: false, change: function (arg) {
                                            var port = getSelectedPort();
                                            port.forEach(function (p) {
                                                p.style.fill = arg.currentValue.rgba;
                                            });
                                        }, ref: function (fillcolor) { return (portFillDrop = fillcolor); } }))),
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { style: { paddingBottom: "8px" } }, "Stroke Color"),
                                React.createElement("div", { style: { paddingBottom: "8px" } },
                                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "strokecolor", value: "#000", disabled: false, change: function (arg) {
                                            var port = getSelectedPort();
                                            port.forEach(function (p) {
                                                p.style.strokeColor = arg.currentValue.rgba;
                                            });
                                        }, ref: function (strokecolor) { return (portBorderDrop = strokecolor); } })))),
                        React.createElement("div", { className: "row sb-child-row" },
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { style: { paddingBottom: "8px" } }, "Stroke Width"),
                                React.createElement("div", { style: { paddingBottom: "8px" } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (widthRef) { return (portWidthNum = widthRef); }, id: "width", enabled: true, format: "###.##", value: 1, step: 0.5, max: 20, min: 1, change: function (args) {
                                            applyPortStyle("strokewidth");
                                        } }))),
                            React.createElement("div", { className: "col-lg-6" },
                                React.createElement("div", { style: { paddingBottom: "8px" } }, "Size"),
                                React.createElement("div", { style: { paddingBottom: "8px" } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (sizeRef) { return (portSizeNum = sizeRef); }, id: "size", enabled: true, format: "###.##", value: 6, step: 1, max: 30, min: 1, change: function (args) {
                                            applyPortStyle("size");
                                        } })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the process flow of publishing a book using connection points. Connection points are static points over the shapes that allow creating connections to the shapes. Customizing the size and appearance of the connection points is illustrated in this example.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This example shows how to add connection ports to shapes. The",
                " ",
                React.createElement("code", null, "ports"),
                " property of the node defines the static connection ports. The ",
                React.createElement("code", null, "offset"),
                ",",
                React.createElement("code", null, "horizontalAlignment"),
                ", ",
                React.createElement("code", null, "verticalAlignment"),
                " and",
                " ",
                React.createElement("code", null, "margin"),
                " properties of the ports define its position."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "style"),
                " property of the port can be used to customize its appearance. The ",
                React.createElement("code", null, "visibility"),
                " property can also be used to define when the connection ports should be visible."),
            React.createElement("p", null, "In this example, the appearance and visibility of the ports can be customized using the options added to the property panel."))));
}
exports.default = Port;
