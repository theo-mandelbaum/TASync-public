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
exports.GettingStartedNodes = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var point_1 = require("@syncfusion/ej2-diagrams/src/diagram/primitives/point");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
//Initializes the nodes for the diagram
var sdlc = [
    { id: "sdlc", addInfo: { text: "SDLC" } },
    { id: "analysis", addInfo: { text: "Analysis" } },
    { id: "design", addInfo: { text: "Design" } },
    { id: "implement", addInfo: { text: "Implement" } },
    { id: "deploy", addInfo: { text: "Deploy" } },
    { id: "support", addInfo: { text: "Support" } },
];
//arranges the nodes in a circular path
var count = 5;
var space = 80;
var radius = (count * 100 + space * count) / (2 * Math.PI);
sdlc[0].offsetX = 300;
sdlc[0].offsetY = 300;
var delta = 360 / 5;
var angle = 270;
for (var i = 1; i < 6; i++) {
    var offset = point_1.Point.transform({ x: 300, y: 300 }, angle, radius);
    sdlc[i].offsetX = offset.x;
    sdlc[i].offsetY = offset.y;
    angle += delta;
}
//Initializes the connector for the diagram
var connections = [];
for (var i = 1; i < 6; i++) {
    connections.push({ sourceID: sdlc[i].id, targetID: sdlc[(i % 5) + 1].id });
}
// CSS styles for the sample
var SAMPLE_CSS = ".diagramNodes-property .image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 75px;\n        width: calc((100% - 12px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .diagramNodes-property .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .diagramNodes-property .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .diagramNodes-property .row-header {\n        font-size: 13px;\n        font-weight: 500;\n    }\n\n    .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .e-checkbox-wrapper .e-label {\n        font-size: 12px;\n    }";
// Declaring variables for the diagram instance and UI elements
var diagramInstance;
var node;
var connector;
var aspectRatioInstance;
var appearanceInstance;
// React component for the diagram sample
var GettingStartedNodes = /** @class */ (function (_super) {
    __extends(GettingStartedNodes, _super);
    function GettingStartedNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GettingStartedNodes.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
        //Click event for Appearance of the Property Panel
        appearanceInstance.onclick = function (args) {
            var target = args.target;
            // Remove existing selection style
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            // Apply styles based on clicked target
            if (target.className === "image-pattern-style") {
                for (var i = 0; i < diagramInstance.nodes.length; i++) {
                    node = diagramInstance.nodes[i];
                    switch (target.id) {
                        case "preview0":
                            applyNodeStyle(node, 0, undefined, ~ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, undefined, target);
                            break;
                        case "preview1":
                            applyNodeStyle(node, 2, undefined, ~ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, undefined, target);
                            break;
                        case "preview2":
                            applyNodeStyle(node, 2, "5 5", ~ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, undefined, target);
                            break;
                        case "preview3":
                            applyNodeStyle(node, 2, "5 5", ~ej2_react_diagrams_1.NodeConstraints.Shadow, "Radial", undefined, target);
                            break;
                        case "preview4":
                            var shadow = {
                                angle: 45,
                                distance: 15,
                                opacity: 0.3,
                                color: "grey"
                            };
                            applyNodeStyle(node, 2, "5 5", ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, shadow, target);
                            break;
                    }
                }
            }
        };
    };
    // Render method for the React component
    GettingStartedNodes.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "645px", nodes: sdlc, connectors: connections, getNodeDefaults: function (obj) {
                            //Sets the default values of a node
                            obj.width = 100;
                            obj.height = 100;
                            obj.shape = { type: "Basic", shape: "Ellipse" };
                            obj.style = { fill: "#37909A", strokeColor: "#024249" };
                            obj.annotations = [
                                {
                                    content: obj.addInfo.text,
                                    margin: { left: 10, right: 10 },
                                    style: {
                                        color: "white",
                                        fill: "none",
                                        strokeColor: "none",
                                        bold: true
                                    }
                                }
                            ];
                            return obj;
                        }, getConnectorDefaults: function (obj) {
                            //Sets the default values of a Connector
                            obj.targetDecorator.style = {
                                fill: "#024249",
                                strokeColor: "#024249"
                            };
                            return { style: { strokeColor: "#024249", strokeWidth: 2 } };
                        }, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, selectionChange: function (args) {
                            // Disable aspect ratio checkbox if more than one node or any connector is selected
                            if (args.state === 'Changed') {
                                if (diagramInstance.selectedItems.nodes.length > 1 || diagramInstance.selectedItems.connectors.length > 0) {
                                    aspectRatioInstance.disabled = true;
                                }
                                else {
                                    aspectRatioInstance.disabled = false;
                                }
                            }
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] })))),
            React.createElement("div", { className: "col-lg-4 property-section diagramNodes-property" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance", ref: function (appearance) { return (appearanceInstance = appearance); } },
                    React.createElement("div", { className: "row row-header", style: { paddingTop: "8px" } }, "Appearance"),
                    React.createElement("div", { className: "row", style: { paddingTop: "3px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "preview0", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_1.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "preview1", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_2.png')",
                                marginRight: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "preview2", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_3.png')",
                                margin: "0px 3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "3px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "preview3", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_4.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "preview4", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_5.png')",
                                margin: "3px"
                            } }))),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row row-header" }, "Behavior"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: "Aspect ratio", id: "aspectRatio", ref: function (aspectRatio) { return (aspectRatioInstance = aspectRatio); }, change: setNodeAspectConstraints })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: "Lock", id: "lock", change: setLockConstraints })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the different stages of a software development life cycle using a circular flow diagram. Customizing the appearance of the nodes is illustrated in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to add nodes to a diagram control and how to customize the appearance of the nodes. The",
                    React.createElement("code", null, "style"),
                    " property of the node can be used to customize the appearance of the nodes."),
                React.createElement("p", null, "To change the appearance, click different styles in the property panel."),
                React.createElement("p", null,
                    "Here, you can see how to lock nodes to disable editing and how to enable proportional resizing. The",
                    React.createElement("code", null, "constraints"),
                    " property of the node allows you to enable/disable editing and proportional resizing."),
                React.createElement("br", null))));
    };
    return GettingStartedNodes;
}(sample_base_1.SampleBase));
exports.GettingStartedNodes = GettingStartedNodes;
//Set customStyle for Node.
function applyNodeStyle(//it is in dedicated line here.
node, width, array, con, type, sh, target) {
    node.style.fill = "#37909A";
    node.style.strokeWidth = width;
    node.style.strokeColor = "#024249";
    node.style.strokeDashArray = array;
    if (!type) {
        node.style.gradient.type = "None";
    }
    else {
        var gradient = void 0;
        gradient = {
            cx: 50,
            cy: 50,
            fx: 50,
            fy: 50,
            stops: [
                { color: "#00555b", offset: 0 },
                { color: "#37909A", offset: 90 }
            ],
            type: "Radial"
        };
        node.style.gradient = gradient;
    }
    if (con & ej2_react_diagrams_1.NodeConstraints.Shadow) {
        node.shadow = { angle: 45, distance: 15, opacity: 0.3, color: "grey" };
        node.constraints |= con;
    }
    else {
        node.constraints &= con;
    }
    diagramInstance.dataBind();
    target.classList.add("e-selected-style");
}
//Enable or disable the Lock Constraints for Node and connector
function setLockConstraints(args) {
    for (var i = 0; i < diagramInstance.nodes.length; i++) {
        var node_1 = diagramInstance.nodes[i];
        if (args.checked) {
            node_1.constraints &= ~(ej2_react_diagrams_1.NodeConstraints.Resize | ej2_react_diagrams_1.NodeConstraints.Rotate | ej2_react_diagrams_1.NodeConstraints.Drag | ej2_react_diagrams_1.NodeConstraints.Delete);
            node_1.constraints |= ej2_react_diagrams_1.NodeConstraints.ReadOnly;
        }
        else {
            node_1.constraints |= ej2_react_diagrams_1.NodeConstraints.Default & ~(ej2_react_diagrams_1.NodeConstraints.ReadOnly);
        }
    }
    diagramInstance.dataBind();
    for (var i = 0; i < diagramInstance.connectors.length; i++) {
        connector = diagramInstance.connectors[i];
        if (args.checked) {
            connector.constraints &= ~(ej2_react_diagrams_1.ConnectorConstraints.DragSourceEnd | ej2_react_diagrams_1.ConnectorConstraints.DragTargetEnd | ej2_react_diagrams_1.ConnectorConstraints.Drag | ej2_react_diagrams_1.ConnectorConstraints.Delete);
            connector.constraints |= ej2_react_diagrams_1.ConnectorConstraints.ReadOnly;
        }
        else {
            connector.constraints |= ej2_react_diagrams_1.ConnectorConstraints.Default & ~ej2_react_diagrams_1.ConnectorConstraints.ReadOnly;
        }
    }
    diagramInstance.dataBind();
}
//Enable or disable the Aspect Ratio Constraints for Node.
function setNodeAspectConstraints(args) {
    for (var i = 0; i < diagramInstance.nodes.length; i++) {
        var node_2 = diagramInstance.nodes[i];
        if (args.checked) {
            node_2.constraints |= ej2_react_diagrams_1.NodeConstraints.AspectRatio;
        }
        else {
            node_2.constraints &= ~ej2_react_diagrams_1.NodeConstraints.AspectRatio;
        }
        diagramInstance.dataBind();
    }
}
