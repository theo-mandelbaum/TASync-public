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
exports.VennDiagram = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
// Basic shape configuration for nodes
var basicShape = { type: "Basic", shape: "Ellipse" };
// Creates a node with specified properties.
function createNode(id, offsetX, offsetY, width, height, annotations, style) {
    return {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        width: width,
        height: height,
        shape: basicShape,
        annotations: annotations,
        style: style
    };
}
// Styles for different node categories
var styles = {
    dataScience: { fill: "#f2f2f2", strokeColor: "#acacac", strokeWidth: 1 },
    trignometry: { fill: "#feb42f", opacity: 0.2, strokeColor: "#feb42f" },
    expertise: { fill: "#6acbd4", opacity: 0.2, strokeColor: "#6acbd4" },
    programming: { fill: "#ed1d79", opacity: 0.2, strokeColor: "#ed1d79" }
};
// Nodes initialization with specific properties
var nodes = [
    createNode("datascience", 450, 232, 400, 400, [{ content: "Data Science", offset: { x: 0.5, y: 0.1 } }], styles.dataScience),
    createNode("trignometry", 515, 205, 200, 200, [
        { content: "Trignometry", offset: { x: 0.5, y: 0.4 }, horizontalAlignment: "Left" },
        { content: "Thesis", offset: { x: 0.45, y: 0.8 } }
    ], styles.trignometry),
    createNode("expertise", 445, 290, 200, 200, [{ content: "Expertise", offset: { x: 0.5, y: 0.7 }, verticalAlignment: "Top" }], styles.expertise),
    createNode("programming", 388, 205, 200, 200, [
        { content: "Programming", offset: { x: 0.5, y: 0.4 }, horizontalAlignment: "Right" },
        { content: "Assembly", offset: { x: 0.7, y: 0.35 }, horizontalAlignment: "Left" },
        { content: "Horizon", offset: { x: 0.7, y: 0.6 }, horizontalAlignment: "Left" },
        { content: "Middleware", offset: { x: 0.5, y: 0.8 } }
    ], styles.programming)
];
var diagramInstance;
var VennDiagram = /** @class */ (function (_super) {
    __extends(VennDiagram, _super);
    function VennDiagram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Adjusts the diagram view to fit the page on render completion.
     */
    VennDiagram.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    VennDiagram.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "580", nodes: nodes, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes classifications of data science using Venn diagrams. Diagram nodes and annotations are used to define Venn diagrams. Read only mode is enabled in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to create a Venn diagram using diagram control. In this example, zoom and pan options are enabled. The",
                    " ",
                    React.createElement("code", null, "tool"),
                    " property of the diagram control allows you to enable/disable zoom and pan options."),
                React.createElement("br", null))));
    };
    return VennDiagram;
}(sample_base_1.SampleBase));
exports.VennDiagram = VennDiagram;
