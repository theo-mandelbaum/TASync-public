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
exports.ConstraintsSample = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
ej2_react_diagrams_1.Diagram.Inject(ej2_react_diagrams_1.ConnectorEditing);
var diagramInstance;
var SAMPLE_CSS = "\n  .diagram-peoperty-tab .row {\n    margin-left: 0px;\n    margin-right: 0px;\n    padding-top: 8px;\n  }";
var handles = [
    {
        name: 'delete',
        pathData: 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76 96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04 91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z',
        visible: true,
        offset: 0.5,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];
//Initialize Diagram Nodes
var nodes = [
    {
        id: 'textNode1',
        // Position of the node
        offsetX: 340,
        offsetY: 50,
        // Size of the node
        width: 550,
        height: 50,
        //Sets type of the node
        shape: {
            type: 'Text',
            content: 'Use Node Constraints to restrict end-users from performing certain operations on Node.',
        },
        //Customizes the appearances such as text, font, fill, and stroke.
        style: {
            strokeColor: 'none',
            fill: 'none',
            color: 'black',
            textAlign: 'Center',
        },
        constraints: ej2_react_diagrams_1.NodeConstraints.None,
    },
    {
        id: 'rectangle',
        offsetX: 80,
        offsetY: 160,
        height: 65,
        shape: { type: 'Basic', shape: 'Rectangle' },
        annotations: [{ content: 'Selection = False' }],
        constraints: ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Select,
    },
    {
        id: 'ellipse',
        offsetX: 190,
        offsetY: 160,
        height: 80,
        shape: { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 },
        annotations: [{ content: 'Dragging = False' }],
        constraints: ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Drag,
    },
    {
        id: 'heptagon',
        offsetX: 295,
        offsetY: 160,
        height: 80,
        shape: { type: 'Basic', shape: 'Heptagon' },
        annotations: [{ content: 'Delete = False' }],
        constraints: ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Delete,
    },
    {
        id: 'directData',
        offsetX: 410,
        offsetY: 160,
        height: 80,
        rotateAngle: -45,
        shape: { type: 'Flow', shape: 'DirectData' },
        annotations: [{ content: 'Rotate = False' }],
        constraints: ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Rotate,
    },
    {
        id: 'Plus',
        offsetX: 530,
        offsetY: 160,
        height: 80,
        shape: { type: 'Basic', shape: 'Plus' },
        annotations: [
            {
                content: 'TextEdit = False',
                constraints: ej2_react_diagrams_1.AnnotationConstraints.ReadOnly,
            },
        ],
    },
    {
        id: 'decision',
        offsetX: 630,
        offsetY: 160,
        height: 80,
        shape: { type: 'Flow', shape: 'Decision' },
        annotations: [{ content: 'Resizing = False' }],
        constraints: ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Resize,
    },
    {
        id: 'textNode2',
        // Position of the node
        offsetX: 350,
        offsetY: 280,
        // Size of the node
        width: 550,
        height: 50,
        //Sets type of the node
        shape: {
            type: 'Text',
            content: 'Use Connector Constraints to restrict end-users from performing certain operations on Connector.',
        },
        //Customizes the appearances such as text, font, fill, and stroke.
        style: {
            strokeColor: 'none',
            fill: 'none',
            color: 'black',
            textAlign: 'Center',
        },
        constraints: ej2_react_diagrams_1.NodeConstraints.None,
    },
];
//Initialize Diagram connectors
var connectors = [
    {
        id: 'select',
        type: 'Orthogonal',
        annotations: [
            {
                content: 'Selection = False',
                horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom',
            },
        ],
        constraints: ej2_react_diagrams_1.ConnectorConstraints.Default & ~ej2_react_diagrams_1.ConnectorConstraints.Select,
        sourcePoint: {
            x: 40,
            y: 350,
        },
        targetPoint: {
            x: 120,
            y: 430,
        },
    },
    {
        id: 'connector2',
        type: 'Orthogonal',
        annotations: [
            {
                content: 'Dragging = True',
                horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom',
            },
        ],
        constraints: ej2_react_diagrams_1.ConnectorConstraints.Default |
            ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb |
            ej2_react_diagrams_1.ConnectorConstraints.Drag,
        sourcePoint: {
            x: 140,
            y: 350,
        },
        targetPoint: {
            x: 220,
            y: 430,
        },
    },
    {
        id: 'delete',
        type: 'Orthogonal',
        annotations: [
            {
                content: 'Delete = False',
                horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom',
            },
        ],
        constraints: (ej2_react_diagrams_1.ConnectorConstraints.Default | ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb) &
            ~(ej2_react_diagrams_1.ConnectorConstraints.Delete | ej2_react_diagrams_1.ConnectorConstraints.Drag),
        sourcePoint: {
            x: 250,
            y: 350,
        },
        targetPoint: {
            x: 320,
            y: 430,
        },
    },
    {
        id: 'endThumb',
        type: 'Orthogonal',
        annotations: [
            {
                content: 'EndThumb = False',
                horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom',
            },
        ],
        constraints: ej2_react_diagrams_1.SelectorConstraints.All &
            ~(ej2_react_diagrams_1.SelectorConstraints.ConnectorSourceThumb |
                ej2_react_diagrams_1.SelectorConstraints.ConnectorTargetThumb),
        sourcePoint: {
            x: 360,
            y: 350,
        },
        targetPoint: {
            x: 440,
            y: 430,
        },
    },
    {
        id: 'draggable',
        type: 'Orthogonal',
        annotations: [
            {
                content: 'EndDraggable = False',
                horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom',
            },
        ],
        constraints: (ej2_react_diagrams_1.ConnectorConstraints.Default | ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb) &
            ~(ej2_react_diagrams_1.ConnectorConstraints.DragSourceEnd | ej2_react_diagrams_1.ConnectorConstraints.DragTargetEnd),
        sourcePoint: {
            x: 460,
            y: 350,
        },
        targetPoint: {
            x: 540,
            y: 430,
        },
    },
    {
        id: 'segmentThumb',
        type: 'Orthogonal',
        annotations: [
            {
                content: 'SegmentThumb = False',
                horizontalAlignment: 'Right',
                verticalAlignment: 'Bottom',
            },
        ],
        constraints: ej2_react_diagrams_1.ConnectorConstraints.Default & ~ej2_react_diagrams_1.ConnectorConstraints.Drag,
        sourcePoint: {
            x: 580,
            y: 350,
        },
        targetPoint: {
            x: 660,
            y: 430,
        },
    },
];
var ConstraintsSample = /** @class */ (function (_super) {
    __extends(ConstraintsSample, _super);
    function ConstraintsSample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Method to fit diagramInstance to page width
    ConstraintsSample.prototype.rendereComplete = function () {
        diagramInstance.fitToPage({ mode: 'Width' });
    };
    ConstraintsSample.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-10 control-section" },
                React.createElement("div", { className: "control-wrapper" },
                    React.createElement("div", { className: "content-wrapper", style: { width: '100%', background: 'white' } },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '550px', nodes: nodes, connectors: connectors, selectedItems: {
                                constraints: ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                                userHandles: handles,
                            }, contextMenuSettings: {
                                show: true,
                            }, rulerSettings: { showRulers: true }, getNodeDefaults: getNodeDefaults, getConnectorDefaults: getConnectorDefaults, getCustomTool: getTool, created: function () {
                                for (var i = 0; i < diagramInstance.connectors.length; i++) {
                                    if (diagramInstance.connectors[i].id === 'endThumb') {
                                        diagramInstance.connectors[i].constraints =
                                            (ej2_react_diagrams_1.ConnectorConstraints.Default |
                                                ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb) &
                                                ~ej2_react_diagrams_1.ConnectorConstraints.Drag;
                                    }
                                }
                            }, selectionChange: function (args) {
                                {
                                    if (args.state === 'Changing') {
                                        if (args.type === 'Addition') {
                                            if (args.newValue.length > 0 && args.newValue[0].id === 'endThumb') {
                                                diagramInstance.selectedItems.constraints =
                                                    ej2_react_diagrams_1.SelectorConstraints.All &
                                                        ~(ej2_react_diagrams_1.SelectorConstraints.ConnectorSourceThumb |
                                                            ej2_react_diagrams_1.SelectorConstraints.ConnectorTargetThumb);
                                            }
                                            else {
                                                diagramInstance.selectedItems.constraints =
                                                    ej2_react_diagrams_1.SelectorConstraints.All;
                                            }
                                        }
                                        else {
                                            diagramInstance.selectedItems.constraints =
                                                ej2_react_diagrams_1.SelectorConstraints.All;
                                        }
                                    }
                                    if (args.state === 'Changed') {
                                        if (args.newValue.length > 0 &&
                                            args.newValue[0] instanceof ej2_react_diagrams_1.Node) {
                                            diagramInstance.selectedItems = {
                                                constraints: ej2_react_diagrams_1.SelectorConstraints.All |
                                                    ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                                                userHandles: handles,
                                            };
                                        }
                                        else {
                                            if (args.newValue[0].id !== 'endThumb') {
                                                diagramInstance.selectedItems = {
                                                    constraints: ej2_react_diagrams_1.SelectorConstraints.All &
                                                        ~ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                                                };
                                            }
                                            else {
                                                diagramInstance.selectedItems = {
                                                    constraints: ej2_react_diagrams_1.SelectorConstraints.All &
                                                        ~(ej2_react_diagrams_1.SelectorConstraints.UserHandle |
                                                            ej2_react_diagrams_1.SelectorConstraints.ConnectorSourceThumb |
                                                            ej2_react_diagrams_1.SelectorConstraints.ConnectorTargetThumb),
                                                };
                                            }
                                        }
                                    }
                                }
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DiagramContextMenu, ej2_react_diagrams_1.UndoRedo] }))))),
            React.createElement("div", { className: "col-lg-2 diagram-property-tab" },
                React.createElement("div", { className: "property-panel-header" }, "Diagram Constraints"),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: '10px' } },
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Zooming", id: "zooming", change: Zoomchanged })),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Undo/Redo", id: "undoRedo", change: undoRedo })),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Text Edit", id: "textedit", change: textedit })),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Context Menu", id: "contextMenu", change: contextMenu })),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Selectable", id: "selectable", change: selectable })),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Draggable", id: "draggable", change: draggable })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how node constraints are used to restrict end-users from performing certain operations on nodes and connector constraints are used to restrict end-users from performing certain operation on connectors.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample illustrates how node constraints are used to restrict end-users from performing certain operations on nodes and connector constraints are used to restrict end-users from performing certain operation on connectors."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "NodeConstraints"),
                    " property allows you to enable or disable node behaviors like select, drag, resize, rotate, and delete."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "ConnectorConstraints"),
                    " property allows you to enable or disable connector behaviors like select, drag, delete, drag source end, and drag target end."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "AnnotationConstraints"),
                    " property allows you to enable or disable the annotation behavior, text editing."),
                React.createElement("p", null,
                    "Using the ",
                    React.createElement("code", null, "DiagramConstraints"),
                    " property, enable or disable certain features of the diagram like zoom, undo/redo, context menu, drag, and select."),
                React.createElement("br", null))));
    };
    return ConstraintsSample;
}(sample_base_1.SampleBase));
exports.ConstraintsSample = ConstraintsSample;
function getNodeDefaults(nodes) {
    if (nodes.id !== "textNode1" && nodes.id !== "textNode2") {
        nodes.width = 80;
        nodes.style.fill = '#C7E6FF';
        nodes.style.strokeColor = '#1587FF';
    }
}
//Setting default connector values
function getConnectorDefaults(connectors) {
    connectors.style.strokeColor = '#6BA5D7';
    connectors.style.fill = '#6BA5D7';
    connectors.style.strokeWidth = 2;
    connectors.targetDecorator.style.strokeColor = '#6BA5D7';
    connectors.targetDecorator.style.fill = '#6BA5D7';
    return connectors;
}
// Retrieves a tool based on the specified action and performs an operation if action is 'delete'  
function getTool(action) {
    var tool;
    if (action === 'delete') {
        diagramInstance.remove();
    }
    return tool;
}
// Adjusts diagramInstance constraints to toggle Zoom capability based on args
function Zoomchanged(args) {
    diagramInstance.constraints =
        diagramInstance.constraints ^ ej2_react_diagrams_1.DiagramConstraints.Zoom;
}
// Adjusts diagramInstance constraints to toggle UndoRedo capability based on args
function undoRedo(args) {
    diagramInstance.constraints =
        diagramInstance.constraints ^ ej2_react_diagrams_1.DiagramConstraints.UndoRedo;
}
// Toggles read-only mode for annotations on nodes and connectors based on args.checked
function textedit(args) {
    for (var i = 0; i < diagramInstance.nodes.length; i++) {
        var node = diagramInstance.nodes[i];
        if (node.annotations.length > 0 && node.annotations[0].content) {
            if (args.checked) {
                if (node.id !== 'Plus') {
                    node.annotations[0].constraints =
                        node.annotations[0].constraints ^
                            ej2_react_diagrams_1.AnnotationConstraints.ReadOnly;
                }
            }
            else {
                node.annotations[0].constraints =
                    node.annotations[0].constraints | ej2_react_diagrams_1.AnnotationConstraints.ReadOnly;
            }
        }
    }
    for (var x = 0; x < diagramInstance.connectors.length; x++) {
        var connector = diagramInstance.connectors[x];
        if (connector.annotations.length > 0 && connector.annotations[0].content) {
            if (args.checked) {
                if (connector.id === 'select') {
                    connector.constraints =
                        connector.constraints & ~ej2_react_diagrams_1.ConnectorConstraints.Select;
                }
                else {
                    connector.annotations[0].constraints =
                        connector.annotations[0].constraints ^
                            ej2_react_diagrams_1.AnnotationConstraints.ReadOnly;
                }
            }
            else {
                connector.annotations[0].constraints =
                    connector.annotations[0].constraints ^
                        ej2_react_diagrams_1.AnnotationConstraints.ReadOnly;
            }
        }
    }
    diagramInstance.dataBind();
}
// Controls the visibility of the context menu in diagramInstance based on args.checked
function contextMenu(args) {
    if (args.checked) {
        diagramInstance.contextMenuSettings.show = true;
        diagramInstance.refresh();
    }
    else {
        diagramInstance.contextMenuSettings.show = false;
    }
    diagramInstance.dataBind();
}
// Enables or disables node and connector selection based on args.checked, excluding the id 'rectangle' and 'select'
function selectable(args) {
    for (var i = 0; i < diagramInstance.nodes.length; i++) {
        var node = diagramInstance.nodes[i];
        if (node.id != 'rectangle') {
            if (args.checked) {
                node.constraints = node.constraints | ej2_react_diagrams_1.NodeConstraints.Select;
            }
            else {
                node.constraints = node.constraints & ~ej2_react_diagrams_1.NodeConstraints.Select;
            }
        }
        diagramInstance.dataBind();
    }
    for (var j = 0; j < diagramInstance.connectors.length; j++) {
        var connector = diagramInstance.connectors[j];
        if (connector.id != 'select') {
            if (args.checked) {
                connector.constraints =
                    connector.constraints | ej2_react_diagrams_1.ConnectorConstraints.Select;
            }
            else {
                connector.constraints =
                    connector.constraints & ~ej2_react_diagrams_1.ConnectorConstraints.Select;
            }
        }
        diagramInstance.dataBind();
    }
}
// Controls draggable behavior for nodes and connectors based on args.checked
function draggable(args) {
    for (var i = 0; i < diagramInstance.nodes.length; i++) {
        var nodes_1 = diagramInstance.nodes[i];
        if (args.checked) {
            if (nodes_1.id === 'ellipse') {
                nodes_1.constraints = ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Drag;
            }
            else {
                nodes_1.constraints = nodes_1.constraints | ej2_react_diagrams_1.NodeConstraints.Drag;
            }
        }
        else {
            nodes_1.constraints = nodes_1.constraints & ~ej2_react_diagrams_1.NodeConstraints.Drag;
        }
        diagramInstance.dataBind();
    }
    for (var j = 0; j < diagramInstance.connectors.length; j++) {
        var connectors_1 = diagramInstance.connectors[j];
        if (args.checked) {
            connectors_1.constraints =
                connectors_1.constraints | ej2_react_diagrams_1.ConnectorConstraints.Drag;
        }
        else {
            connectors_1.constraints =
                connectors_1.constraints & ~ej2_react_diagrams_1.ConnectorConstraints.Drag;
        }
        diagramInstance.dataBind();
    }
}
