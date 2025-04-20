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
exports.PrintExport = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
require("./font-icons.css");
// Helper function to create a node with common properties
function createNode(id, width, height, offsetX, offsetY, strokeColor, fillColor, content, shape) {
    if (shape === void 0) { shape = 'Rectangle'; }
    return {
        id: id,
        width: width,
        height: height,
        offsetX: offsetX,
        offsetY: offsetY,
        shape: { type: 'Basic', shape: shape },
        style: { strokeColor: strokeColor, fill: fillColor },
        annotations: [{ content: content }]
    };
}
// Initialize Diagram Nodes with helper function
var nodes = [
    createNode('sourceNode1', 100, 50, 120, 100, '#868686', '#d5f5d5', 'Source Document'),
    createNode('censusNode2', 100, 75, 120, 200, '#8f908f', '#e2f3fa', 'Census Record', 'Diamond'),
    createNode('booksNode3', 100, 75, 120, 325, '#8f908f', '#e2f3fa', 'Books and Magazine', 'Diamond'),
    createNode('recordNode4', 125, 50, 320, 200, '#868686', '#d5f5d5', 'Record Template'),
    createNode('traditionalNode5', 125, 50, 320, 325, '#868686', '#d5f5d5', 'Traditional Template'),
    createNode('nontraditionalNode6', 135, 50, 120, 425, '#a8a8a8', '#faebee', 'Nontraditional'),
    createNode('Radial1', 125, 50, 850, 225, '#a8a8a8', '#fef0db', 'Health Fitness', 'Ellipse'),
    createNode('Radial2', 125, 75, 850, 100, '#a8a8a8', '#faebee', 'Diet', 'Ellipse'),
    createNode('Radial3', 125, 75, 1025, 175, '#a8a8a8', '#faebee', 'Flexibility', 'Ellipse'),
    createNode('Radial4', 125, 75, 1000, 350, '#a8a8a8', '#faebee', 'Muscular Endurance', 'Ellipse'),
    createNode('Radial5', 125, 75, 675, 175, '#a8a8a8', '#faebee', 'Cardiovascular Strength', 'Ellipse'),
    createNode('Radial6', 125, 75, 770, 350, '#a8a8a8', '#faebee', 'Muscular Strength', 'Ellipse')
];
// Helper function to create a connector with common properties
function createConnector(id, sourceID, targetID, content) {
    if (content === void 0) { content = 'Yes'; }
    return {
        id: id,
        sourceID: sourceID,
        targetID: targetID,
        annotations: content ? [{ content: content, style: { fill: 'White' } }] : []
    };
}
// Initialize Diagram Connectors with helper function
var connectors = [
    createConnector('flowChartConnector1', 'sourceNode1', 'censusNode2', ''),
    createConnector('flowChartConnector2', 'censusNode2', 'booksNode3', 'No'),
    createConnector('flowChartConnector3', 'booksNode3', 'nontraditionalNode6', 'No'),
    createConnector('flowChartConnector4', 'censusNode2', 'recordNode4'),
    createConnector('flowChartConnector5', 'booksNode3', 'traditionalNode5'),
    createConnector('RadialConnector1', 'Radial1', 'Radial2'),
    createConnector('RadialConnector2', 'Radial1', 'Radial3'),
    createConnector('RadialConnector3', 'Radial1', 'Radial4'),
    createConnector('RadialConnector4', 'Radial1', 'Radial5'),
    createConnector('RadialConnector5', 'Radial1', 'Radial6')
];
// Global variables to hold instances of Diagram and CheckBox components.
var diagramInstance;
var checkBoxObj;
var exportItems = [
    { text: "JPG" },
    { text: "PNG" },
    { text: "SVG" }
];
// CSS styles specific to this sample.
var SAMPLE_CSS = "   .e-bigger #toolbar_diagram .e-icons.e-caret,\n#toolbar_diagram .e-icons.e-caret {\n    font-size: 12px;\n    margin-right: 0px;\n}";
var PrintExport = /** @class */ (function (_super) {
    __extends(PrintExport, _super);
    function PrintExport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrintExport.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    PrintExport.prototype.render = function () {
        function contentTemplate() {
            return (React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { items: exportItems, iconCss: "e-diagram-icons e-diagram-export", content: "Export", select: onSelectExportFormat }));
        }
        function checkboxTemplate() {
            return (React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "checkBox", checked: false, ref: function (checkBox) { return (checkBoxObj = checkBox); }, label: "Multiple Page" }));
        }
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { style: { width: "100%", height: "10%", marginTop: "10px" }, id: "toolbar_diagram", clicked: onItemClick },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Input", text: "Export", template: contentTemplate }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Button", text: "Print", prefixIcon: "e-diagram-icons e-diagram-print" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Input", template: checkboxTemplate }))),
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "580px", nodes: nodes, connectors: connectors, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, pageSettings: { width: 550, height: 500, multiplePage: true }, getConnectorDefaults: function (connector, diagram) {
                            connector.style.strokeColor = "#6d6d6d";
                            return connector;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.PrintAndExport] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates printing and exporting the diagram as images.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to print the diagram and how to export the diagram as image (*.jpg, *.png, and *bmp) and in SVG format. The",
                    " ",
                    React.createElement("code", null, "exportDiagram"),
                    " method can be used to export the diagram. The ",
                    React.createElement("code", null, "exportDiagram"),
                    " method takes the exporting options (file formats, mode of export, and the region to export) as input. The ",
                    React.createElement("code", null, "print"),
                    " method can be used to print the diagrams."),
                React.createElement("br", null))));
    };
    return PrintExport;
}(sample_base_1.SampleBase));
exports.PrintExport = PrintExport;
// Click event to perform printing the diagram objects.
function onItemClick(args) {
    if (args.item.text === "Print") {
        var printOptions = {
            mode: "Data",
            region: "PageSettings",
            multiplePage: checkBoxObj.checked,
            margin: { left: 0, top: 0, bottom: 0, right: 0 }
        };
        diagramInstance.print(printOptions);
    }
}
// Export the diagram object based on the format.
function onSelectExportFormat(args) {
    var exportOptions = {
        format: args.item.text,
        mode: "Download",
        region: "PageSettings",
        multiplePage: checkBoxObj.checked,
        fileName: "Export",
        margin: { left: 0, top: 0, bottom: 0, right: 0 }
    };
    diagramInstance.exportDiagram(exportOptions);
}
