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
exports.Tooltip = exports.EffectValue = exports.PositionValue = exports.modeValue = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
/**
 * Tooltip sample
 */
var SAMPLE_CSS = ".diagram-tooltip table{\n    border-collapse: separate;\n}\n\n.diagram-tooltip .content-wrapper {\n    border: 1px solid #D7D7D7;\n}\n#tooltipPropertySection .property-panel-header {\n    margin-left: 10px;\n}";
// Collection of relative modes for tooltip
exports.modeValue = [
    { type: 'Object', text: 'Object' },
    { type: 'Mouse', text: 'Mouse' },
];
//Collection of positions for tooltip
exports.PositionValue = [
    { type: 'TopLeft', text: 'Top Left' },
    { type: 'TopCenter', text: 'Top Center' },
    { type: 'TopRight', text: 'Top Right' },
    { type: 'BottomLeft', text: 'Bottom Left' },
    { type: 'BottomCenter', text: 'Bottom Center' },
    { type: 'BottomRight', text: 'Bottom Right' },
    { type: 'LeftTop', text: 'Left Top' },
    { type: 'LeftCenter', text: 'Left Center' },
    { type: 'LeftBottom', text: 'Left Bottom' },
    { type: 'RightTop', text: 'Right Top' },
    { type: 'RightCenter', text: 'Right Center' },
    { type: 'RightBottom', text: 'Right Bottom' },
];
//Collection of effects for tooltip
exports.EffectValue = [
    { type: 'FadeIn', text: 'Fade In' },
    { type: 'FadeOut', text: 'Fade Out' },
    { type: 'FadeZoomIn', text: 'Fade Zoom In' },
    { type: 'FadeZoomOut', text: 'Fade Zoom Out' },
    { type: 'FlipXDownIn', text: 'FlipX Down In' },
    { type: 'FlipXDownOut', text: 'FlipX Down Out' },
    { type: 'FlipXUpIn', text: 'FlipX Up In' },
    { type: 'FlipXUpOut', text: 'FlipX Up Out' },
    { type: 'FlipYLeftIn', text: 'FlipY Left In' },
    { type: 'FlipYLeftOut', text: 'FlipY Left Out' },
    { type: 'FlipYRightIn', text: 'FlipY Right In' },
    { type: 'FlipYRightOut', text: 'FlipY Right Out' },
    { type: 'ZoomIn', text: 'Zoom In' },
    { type: 'ZoomOut', text: 'Zoom Out' },
    { type: 'None', text: 'None' },
];
var diagramInstance;
var modeDropdown;
var positionDropdown;
var contentDropdown;
var effectDropdown;
//Initialize Diagram Nodes
var nodes = [
    {
        id: 'node1', width: 60, height: 60, offsetX: 35, offsetY: 120,
        annotations: [{ content: 'Customer query', offset: { x: 0.5, y: 1 }, margin: { top: 15 } }],
        tooltip: { content: 'Queries from the customer' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
    },
    {
        id: 'node2', width: 75, height: 70, offsetX: 140, offsetY: 120,
        annotations: [{ content: 'Enough details?', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Whether the provided information is enough?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
    },
    {
        id: 'node3', width: 60, height: 50, offsetX: 270, offsetY: 120,
        annotations: [{ content: 'Analyse', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Analysing the query' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
    },
    {
        id: 'node4', width: 75, height: 70, offsetX: 370, offsetY: 120, shape: {
            type: 'Bpmn', shape: 'Gateway',
            gateway: { type: 'Exclusive' }
        },
        tooltip: { content: 'proceed to validate?' },
    },
    {
        id: 'node5', width: 75, height: 70, offsetX: 570, offsetY: 120,
        annotations: [{ content: 'Validate', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Whether the reported/requested bug/feature is valid?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
    },
    {
        id: 'node6', width: 60, height: 60, offsetX: 720, offsetY: 120,
        tooltip: { content: 'Send the invalid message to customer' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node7', width: 60, height: 50, offsetX: 140, offsetY: 280,
        annotations: [{ content: 'Request', offset: { x: 0.50, y: 0.50 }, margin: { top: 5 } }],
        tooltip: { content: 'Requesting for more information' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Send' } } }
    },
    {
        id: 'node8', width: 60, height: 60, offsetX: 370, offsetY: 280,
        tooltip: { content: 'Share the User Guide/Knowledge Base link' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
    },
    {
        id: 'node9', width: 70, height: 50, offsetX: 570, offsetY: 280,
        annotations: [{ content: 'Log bug/feature', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Log the bug/feature' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }
    },
    {
        id: 'node10', width: 75, height: 55, offsetX: 390, offsetY: 430,
        annotations: [{ content: 'Implement', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Fix the bug/Add the feature' },
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: {
                    collapsed: false,
                    events: [{ event: 'Intermediate', trigger: 'Timer', offset: { x: 0.5, y: 1 }, width: 25, height: 25 }]
                }
            }
        }
    },
    {
        id: 'node12', width: 60, height: 60, offsetX: 265, offsetY: 430, tooltip: { content: 'Provide the solution' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node13', width: 60, height: 60, offsetX: 720, offsetY: 430, tooltip: { content: 'Share the task details' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node14', width: 60, height: 60, offsetX: 570, offsetY: 430, shape: {
            type: 'Bpmn', shape: 'Gateway',
            gateway: { type: 'Parallel' }
        },
        tooltip: { content: 'can log?' },
    },
];
//Initialize Diagram Connectors
var connectors = [
    { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
    { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
    { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
    {
        id: 'connector4', sourceID: 'node4', targetID: 'node5',
        annotations: [{ content: 'Feature/Bug', offset: 0.5, style: { fill: 'white', textWrapping: 'Wrap' } }]
    },
    {
        id: 'connector5', sourceID: 'node5', targetID: 'node6',
        annotations: [{ content: 'Invalid', offset: 0.5, style: { fill: 'white' } }]
    },
    { id: 'connector6', sourceID: 'node2', targetID: 'node7' },
    {
        id: 'connector7', sourceID: 'node4', targetID: 'node8',
        annotations: [{ content: 'How to?', offset: 0.5, style: { fill: 'white' } }]
    },
    { id: 'connector8', sourceID: 'node5', targetID: 'node9' },
    { id: 'connector9', sourceID: 'node14', targetID: 'node13' },
    {
        id: 'connector10', sourceID: 'node7', targetID: 'node3', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 100, direction: 'Right' }, { type: 'Orthogonal', length: 100, direction: 'Top' }]
    },
    { id: 'connector11', sourceID: 'node14', targetID: 'node10' },
    { id: 'connector12', sourceID: 'node10', targetID: 'node12' },
    { id: 'connector13', sourceID: 'node9', targetID: 'node14' },
];
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'type' };
        return _this;
    }
    Tooltip.prototype.rendereComplete = function () {
        diagramInstance.fitToPage({ mode: 'Width' });
    };
    Tooltip.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane diagram-tooltip' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { id: "tooltipDiagramSection", className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: 'diagram', ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '550px', nodes: nodes, connectors: connectors, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, getConnectorDefaults: getConnectorDefaults, getNodeDefaults: getNodeDefaults, tooltip: { content: getContent(), position: 'TopLeft', relativeMode: 'Object', animation: { open: { effect: 'FadeZoomIn', delay: 0 }, close: { effect: 'FadeZoomOut', delay: 0 } } } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.BpmnDiagrams] })))),
            React.createElement("div", { id: 'tooltipPropertySection', className: 'col-lg-4 property-section' },
                React.createElement("div", { className: 'property-panel-header', style: { marginLeft: '0px' } }, "Properties"),
                React.createElement("table", { id: 'diagramTooltipPropertyPanel', title: 'Properties' },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { paddingTop: "10px" } },
                            React.createElement("td", null,
                                React.createElement("div", null, "Relative Mode")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: "15px", width: '70%' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'mode', ref: function (dropdown) { return (modeDropdown = dropdown); }, dataSource: exports.modeValue, fields: this.fields, placeholder: 'select a mode value', popupWidth: '150', width: '85%', index: 0, change: function (args) {
                                            if (args.value === 'Mouse') {
                                                diagramInstance.tooltip.relativeMode = 'Mouse';
                                            }
                                            else {
                                                diagramInstance.tooltip.relativeMode = 'Object';
                                            }
                                            diagramInstance.dataBind();
                                        } })))),
                        React.createElement("tr", { style: { paddingTop: "10px" } },
                            React.createElement("td", null,
                                React.createElement("div", null, "Position")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: "15px", width: '70%' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'position', ref: function (dropdown) { return (positionDropdown = dropdown); }, dataSource: exports.PositionValue, fields: this.fields, index: 0, placeholder: 'select a position', popupWidth: '150', width: '85%', change: function (args) {
                                            var nodes = diagramInstance.nodes;
                                            for (var i = 0; i < nodes.length; i++) {
                                                if (nodes[i].tooltip) {
                                                    nodes[i].tooltip.position = args.value;
                                                    diagramInstance.dataBind();
                                                }
                                            }
                                        } })))),
                        React.createElement("tr", { style: { paddingTop: "10px" } },
                            React.createElement("td", null,
                                React.createElement("div", null, "Animation")),
                            React.createElement("td", { style: { paddingLeft: "15px" } },
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'duration', value: 100, min: 100, max: 2000, step: 100, width: '85%', change: function (args) {
                                        diagramInstance.tooltip.animation.close.duration = args.value;
                                        diagramInstance.tooltip.animation.open.duration = args.value;
                                        diagramInstance.dataBind();
                                    } }))),
                        React.createElement("tr", { style: { paddingTop: "10px" } },
                            React.createElement("td", null,
                                React.createElement("div", null, "Effect")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: "15px" } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'effect', ref: function (dropdown) { return (effectDropdown = dropdown); }, dataSource: exports.EffectValue, fields: this.fields, placeholder: 'select a effect', popupWidth: '150', width: '85%', index: 0, change: function (args) {
                                            diagramInstance.tooltip.animation.open.effect = args.value;
                                            diagramInstance.tooltip.animation.close.effect = args.value;
                                            diagramInstance.dataBind();
                                        } })))),
                        React.createElement("tr", { style: { paddingTop: "20px" } },
                            React.createElement("td", null, "Sticky Mode"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: function (args) {
                                        for (var j = 0; j < diagramInstance.nodes.length; j++) {
                                            if (args.checked) {
                                                diagramInstance.tooltipObject.isSticky = true;
                                                diagramInstance.nodes[j].tooltip.isSticky = true;
                                            }
                                            else {
                                                diagramInstance.tooltipObject.isSticky = false;
                                                diagramInstance.nodes[j].tooltip.isSticky = false;
                                            }
                                            diagramInstance.dataBind();
                                        }
                                    } })))))),
            React.createElement("div", null),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates how to add the extra information to the nodes and connectors and how to show the information through the common graphical user interface element.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Using diagram\u2019s ",
                    React.createElement("code", null, "tooltip"),
                    " we can define the tooltip for the diagram nodes as well as connector. We can control the ",
                    React.createElement("code", null, "animation"),
                    ",",
                    React.createElement("code", null, "position"),
                    ", ",
                    React.createElement("code", null, "effects"),
                    " of the tooltip using ",
                    React.createElement("code", null, "tooltip"),
                    " property of the diagram. Also, we can define the custom tooltip as either text or HTML element using ",
                    React.createElement("code", null, "content"),
                    " property of the tooltip. We can control the different tooltip settings to each connector and node."),
                React.createElement("br", null))));
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
//set default value for connectors.
function getConnectorDefaults(connector, diagram) {
    connector.type = 'Orthogonal';
    connector.style = { strokeWidth: 2 };
    return connector;
}
//set default value for nodes.
function getNodeDefaults(obj) {
    obj.offsetX += 0.5;
    obj.offsetY += 0.5;
    obj.constraints = ej2_react_diagrams_1.NodeConstraints.Default | ej2_react_diagrams_1.NodeConstraints.Tooltip;
    obj.style = { strokeWidth: 2 };
    return obj;
}
//set content for diagram tooltip
function getContent() {
    var tooltipContent = document.createElement('div');
    tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;"> Tooltip !!! </span> </div>';
    return tooltipContent;
}
