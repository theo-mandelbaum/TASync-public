"use strict";
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
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
// Function to create a text node
var createTextNode = function (content) { return ({
    shape: { type: "Text", content: content },
    constraints: ej2_react_diagrams_1.NodeConstraints.PointerEvents,
    style: {
        fontSize: 16,
        fill: "None",
        fontFamily: "sans-serif",
        bold: true,
        strokeWidth: 0
    }
}); };
// Function to create a shape node
var createShapeNode = function (type, shape, content, additionalProps) { return ({
    shape: __assign({ type: type, shape: shape }, additionalProps),
    annotations: [{ content: content }]
}); };
// Basic shape models
var basicShapes = [
    "Rectangle", "Ellipse", "Triangle", "Plus", "Star", "Pentagon",
    "Heptagon", "Octagon", "Trapezoid", "Decagon", "RightTriangle", "Parallelogram"
];
var basicShapeModels = __spreadArray([
    createTextNode("Basic Shapes")
], basicShapes.map(function (shape) { return createShapeNode("Basic", shape, shape); }), true);
// Flow shape models
var flowShapes = [
    { shape: "Terminator", content: "Terminator" },
    { shape: "Process", content: "Process" },
    { shape: "Decision", content: "Decision" },
    { shape: "Document", content: "Document" },
    { shape: "PreDefinedProcess", content: "Predefined Process" },
    { shape: "PaperTap", content: "Paper Tape" },
    { shape: "DirectData", content: "Direct Data" },
    { shape: "SequentialData", content: "Sequential Data" },
    { shape: "Sort", content: "Sort" },
    { shape: "MultiDocument", content: "Multi-Document" },
    { shape: "Collate", content: "Collate" },
    { shape: "SummingJunction", content: "Summing Junction" },
    { shape: "Or", content: "Or" },
    { shape: "InternalStorage", content: "Internal Storage" },
    { shape: "Extract", content: "Extract" },
    { shape: "ManualOperation", content: "Manual Operation" },
    { shape: "Merge", content: "Merge" },
    { shape: "OffPageReference", content: "Off-Page Reference" },
    { shape: "SequentialAccessStorage", content: "Sequential Access Storage" },
    { shape: "Data", content: "Data" },
    { shape: "Card", content: "Card" }
];
var flowShapeModels = __spreadArray([
    createTextNode("Flow Shapes")
], flowShapes.map(function (_a) {
    var shape = _a.shape, content = _a.content;
    return createShapeNode("Flow", shape, content);
}), true);
// BPMN shape models
var bpmnShapes = [
    { shape: "Event", content: "Start Event", event: { event: "Start", trigger: "None" } },
    { shape: "Event", content: "Intermediate Event", event: { event: "Intermediate", trigger: "None" } },
    { shape: "Event", content: "End Event", event: { event: "End", trigger: "None" } },
    { shape: "Gateway", content: "Gateway" },
    { shape: "Activity", content: "Task", activity: { activity: "Task" } },
    { shape: "Activity", content: "Transaction", activity: { activity: "SubProcess", subProcess: { type: "Transaction", transaction: { success: { visible: false }, failure: { visible: false }, cancel: { visible: false } } } } },
    { shape: "Message", content: "Message" },
    { shape: "DataObject", content: "Data Object" },
    { shape: "DataSource", content: "Data Source" },
    { shape: "Group", content: "Group" },
    { shape: "TextAnnotation", content: "Text Annotation" }
];
var bpmnShapeModels = __spreadArray([
    createTextNode("BPMN Shapes")
], bpmnShapes.map(function (_a) {
    var shape = _a.shape, content = _a.content, event = _a.event, activity = _a.activity, subProcess = _a.subProcess;
    return createShapeNode("Bpmn", shape, content, { event: event, activity: activity, subProcess: subProcess });
}), true);
var allShapeModels = __spreadArray(__spreadArray(__spreadArray([], basicShapeModels, true), flowShapeModels, true), bpmnShapeModels, true);
var diagramInstance;
function ShapeGallery() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    function rendereComplete() {
        diagramInstance.fitToPage({ mode: "Height" });
    }
    // To set default values for different types of nodes.
    function getNodes() {
        var nodes = allShapeModels;
        var offsetx = 60;
        var offsety = 50;
        var count = 1;
        var updateFlowShapeHeight = function (shapeType) {
            switch (shapeType) {
                case 'Process':
                case 'Terminator':
                case 'Document':
                case 'DirectData':
                case 'MultiDocument':
                case 'PreDefinedProcess':
                    return 30;
                case 'Decision':
                    return 35;
                default:
                    return 40;
            }
        };
        nodes.forEach(function (node) {
            node.width = 40;
            node.height = 40;
            if (node.shape.type === 'Flow') {
                node.height = updateFlowShapeHeight(node.shape.shape);
            }
            node.offsetX = offsetx;
            node.offsetY = offsety;
            if (node.shape.type !== 'Text') {
                node.annotations[0].verticalAlignment = 'Top';
                node.annotations[0].offset = { y: 1 };
                node.annotations[0].margin = { top: 8 };
                offsetx += 90;
                if (count % 10 === 0) {
                    offsety += 100;
                    offsetx = 60;
                }
                count++;
            }
            else {
                offsetx = 60;
                offsety += 50;
                count = 1;
                node.width = 150;
                node.height = 50;
                node.offsetX = 90;
                if (node.shape.content !== 'Basic Shapes') {
                    node.offsetY = offsety + 50;
                    offsety += 100;
                }
            }
        });
        return nodes;
    }
    return (React.createElement("div", { className: "control-panel" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "800px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, nodes: getNodes(), 
                    //Defines the default node and connector properties.
                    getNodeDefaults: function (obj, diagram) {
                        return obj;
                    } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.BpmnDiagrams] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates basic built-in shapes, such as basic shapes, flow shapes, and BPMN shapes.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This example shows how to define built-in shapes that are used to visualize geometric information, work flow, or a business flow diagrams. The ",
                React.createElement("code", null, "shape"),
                " property can be used to define the category of built-in shapes. Additionally, the",
                React.createElement("code", null, "type"),
                " property of the ",
                React.createElement("code", null, "shape"),
                " allows you to choose the type of the shape."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "The diagram component\u2019s features are segregated into individual feature-wise modules. To use the BPMN shapes, inject",
                React.createElement("code", null, "BpmnDiagrams"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("br", null))));
}
exports.default = ShapeGallery;
