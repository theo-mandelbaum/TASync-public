"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import React and necessary components from Syncfusion's EJ2 React Diagrams library for building the diagram.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var diagram_data_1 = require("./diagram-data");
// Define the basic shape for nodes
var shape = {
    type: "Basic",
    shape: "Ellipse",
    cornerRadius: 10
};
// Holds an instance of the DiagramComponent for global access
var diagramInstance;
// Sets default properties for nodes
function setNodeDefaults(node) {
    if (!node.children) {
        node.shape = shape;
        node.width = 70;
        node.height = 70;
    }
    return node;
}
// Configures the command manager with custom and modified keyboard shortcuts
function getCommandManagerSettings() {
    return {
        commands: [
            createCommand("customGroup", ej2_react_diagrams_1.Keys.G, ej2_react_diagrams_1.KeyModifiers.Control, function () { return groupItems(); }, canGroupItems),
            createCommand("customUnGroup", ej2_react_diagrams_1.Keys.U, ej2_react_diagrams_1.KeyModifiers.Control, function () { return unGroupItems(); }, canUnGroupItems),
            createCommand("navigationDown", ej2_react_diagrams_1.Keys.Down, undefined, function () { return navigateLevels(true); }, alwaysTrue),
            createCommand("navigationUp", ej2_react_diagrams_1.Keys.Up, undefined, function () { return navigateLevels(false); }, alwaysTrue),
            createCommand("navigationLeft", ej2_react_diagrams_1.Keys.Left, undefined, function () { return navigateToSiblings(false); }, alwaysTrue),
            createCommand("navigationRight", ej2_react_diagrams_1.Keys.Right, undefined, function () { return navigateToSiblings(true); }, alwaysTrue)
        ]
    };
}
// Creates a command with specified properties
function createCommand(name, key, keyModifiers, execute, canExecute) {
    return { name: name, gesture: { key: key, keyModifiers: keyModifiers }, canExecute: canExecute, execute: execute };
}
// Checks if grouping of selected items is possible
function canGroupItems() {
    return diagramInstance.selectedItems.nodes.length > 0 || diagramInstance.selectedItems.connectors.length > 0;
}
// Groups the selected items in the diagram
function groupItems() {
    diagramInstance.group();
}
// Checks if ungrouping of selected items is possible
function canUnGroupItems() {
    var _a;
    return ((_a = diagramInstance.selectedItems.nodes[0]) === null || _a === void 0 ? void 0 : _a.children) !== undefined;
}
// Ungroups the selected items in the diagram
function unGroupItems() {
    diagramInstance.unGroup();
}
// Always returns true, used as a default for command execution
function alwaysTrue() {
    return true;
}
// Navigates to the child or parent node of the selected node
function navigateLevels(isParent) {
    var selectedNode = diagramInstance.selectedItems.nodes[0];
    if (selectedNode) {
        var connectorId = isParent ? selectedNode.outEdges[0] : selectedNode.inEdges[0];
        var altNode = isParent ? getChildNode(connectorId) : getParentNode(connectorId);
        diagramInstance.select(altNode);
    }
}
// Navigates to the sibling node of the selected node based on direction
function navigateToSiblings(isRightSibling) {
    var selectedNode = diagramInstance.selectedItems.nodes[0];
    if (selectedNode) {
        var connectorId = selectedNode.inEdges[0];
        var altConnectorId = '';
        var parentNode = getParentNode(connectorId)[0];
        if (parentNode) {
            for (var i = 0; i < parentNode.outEdges.length; i++) {
                if (parentNode.outEdges[i] === connectorId) {
                    altConnectorId = isRightSibling ? parentNode.outEdges[i + 1] : parentNode.outEdges[i - 1];
                }
            }
            var siblingNode = getChildNode(altConnectorId);
            diagramInstance.select(siblingNode);
        }
    }
}
// Retrieves child node elements based on connector ID
function getChildNode(connectorId) {
    var childNode = [];
    var connector = diagramInstance.getObject(connectorId);
    if (connector) {
        childNode.push(diagramInstance.getObject(connector.targetID));
    }
    return childNode;
}
// Retrieves parent node elements based on connector ID
function getParentNode(connectorId) {
    var parentNode = [];
    var connector = diagramInstance.getObject(connectorId);
    if (connector) {
        parentNode.push(diagramInstance.getObject(connector.sourceID));
    }
    return parentNode;
}
// Renders a table of commands and their keyboard gestures
function renderCommandTable(title, commands) {
    return (React.createElement("div", null,
        React.createElement("h4", { className: "property-panel-header" }, title),
        React.createElement("div", { className: "property-panel-content" },
            React.createElement("table", { style: { fontSize: "12px" } },
                React.createElement("tr", null,
                    React.createElement("td", { style: { width: "70%" } },
                        React.createElement("h5", null, "Command")),
                    React.createElement("td", { style: { width: "30%" } },
                        React.createElement("h5", null, "Gesture"))),
                commands.map(function (cmd, index) { return (React.createElement("tr", { key: index },
                    React.createElement("td", { style: { width: "70%" } }, cmd.command),
                    React.createElement("td", { style: { width: "30%" } }, cmd.gesture))); })))));
}
// Functional component for keyboard interaction
function KeyBoardInteraction() {
    // useEffect hook to perform side effects when the component mounts
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Renders the component UI.
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { ref: function (diagram) { return (diagramInstance = diagram); }, id: "diagram", width: "100%", height: "645", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, contextMenuSettings: { show: true }, getNodeDefaults: setNodeDefaults.bind(this), layout: { type: "HierarchicalTree" }, dataSourceSettings: {
                        id: "id",
                        parentId: "ancestor",
                        dataSource: new ej2_data_1.DataManager(diagram_data_1.keyBoardData),
                        doBinding: function (nodeModel, data) {
                            nodeModel.annotations = [
                                {
                                    /* tslint:disable:no-string-literal */
                                    content: data["id"],
                                    style: { color: "white" }
                                }
                            ];
                            nodeModel.style = {
                                strokeColor: "transparent" /* tslint:disable:no-string-literal */,
                                fill: data["fill"]
                            };
                        }
                    }, commandManager: getCommandManagerSettings() },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [
                            ej2_react_diagrams_1.UndoRedo,
                            ej2_react_diagrams_1.DiagramContextMenu,
                            ej2_react_diagrams_1.HierarchicalTree,
                            ej2_react_diagrams_1.DataBinding
                        ] })))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            renderCommandTable("Built-In Commands", [
                { command: "Select All", gesture: "Ctrl + A" },
                { command: "Cut", gesture: "Ctrl + X" },
                { command: "Copy", gesture: "Ctrl + C" },
                { command: "Paste", gesture: "Ctrl + V" },
                { command: "Undo", gesture: "Ctrl + Z" },
                { command: "Redo", gesture: "Ctrl + Y" },
                { command: "Delete", gesture: "Delete" },
            ]),
            renderCommandTable("Custom Commands", [
                { command: "Group", gesture: "Ctrl + G" },
                { command: "Ungroup", gesture: "Ctrl + U" },
            ]),
            renderCommandTable("Modified Commands", [
                { command: "Navigate to Parent Node", gesture: "Up Arrow" },
                { command: "Navigate to Child Node", gesture: "Down Arrow" },
                { command: "Navigate to Previous Child", gesture: "Left Arrow" },
                { command: "Navigate to Next Child", gesture: "Right Arrow" },
            ])),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates interaction with diagram control using shortcut keys. Command Manager support is used to manage keyboard interactions.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This example shows how to interact with the diagram control using shortcut keys. The",
                React.createElement("code", null, "commandManager"),
                " property can be used to map the commands with key gestures. In this example, along with the built-in commands a few custom commands are added and a few built-in commands (nudge) are overridden. That is, when the arrow keys are pressed, selection will be navigated instead of moving the selected objects. The different kinds of interactions and the corresponding key gestures are listed in the property panel."),
            React.createElement("br", null))));
}
exports.default = KeyBoardInteraction;
