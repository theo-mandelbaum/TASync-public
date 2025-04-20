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
exports.Serialization = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./font-icons.css");
// Global variables to hold instances of Diagram and Palette components.
var diagramInstance;
var paletteSpaceInstance;
// Predefined styles for different types of nodes in the diagram.
var nodeStyles = {
    terminator: { fill: "#d0f0f1", strokeColor: "#797979", height: 50, width: 100 },
    process: { fill: "#fbfdc5", strokeColor: "#797979", height: 50, width: 120 },
    decision: { fill: "#c5efaf", strokeColor: "#797979", height: 90, width: 120 },
    delay: { fill: "#f8eee5", strokeColor: "#797979", height: 50, width: 100 }
};
// Function to create a node with given parameters.
function createNode(id, offsetX, offsetY, shapeType, content, style) {
    return {
        id: id,
        height: style.height,
        width: style.width,
        offsetX: offsetX,
        offsetY: offsetY,
        shape: { type: "Flow", shape: shapeType },
        annotations: [{ content: content }],
        style: { fill: style.fill, strokeColor: style.strokeColor }
    };
}
;
// Initializing nodes for the diagram.
var nodes = [
    createNode("Start", 250, 60, "Terminator", "Start", nodeStyles.terminator),
    createNode("Alarm", 250, 160, "Process", "Alarm Rings", nodeStyles.process),
    createNode("Ready", 250, 260, "Decision", "Ready to Get Up?", nodeStyles.decision),
    createNode("Climb", 250, 370, "Process", "Climb Out of Bed", nodeStyles.process),
    createNode("End", 250, 460, "Terminator", "End", nodeStyles.terminator),
    createNode("Relay", 450, 160, "Delay", "Relay", nodeStyles.delay),
    createNode("Hit", 450, 260, "Process", "Hit Snooze Button", nodeStyles.process)
];
// Function to create a connector with given parameters.
function createConnector(id, sourceID, targetID, annotations) {
    return {
        id: id,
        sourceID: sourceID,
        targetID: targetID,
        annotations: annotations
    };
}
;
// Initializing connectors for the diagram.
var connectors = [
    createConnector("connector1", "Start", "Alarm"),
    createConnector("connector2", "Alarm", "Ready"),
    createConnector("connector3", "Ready", "Climb", [{ content: "Yes", style: { fill: "white" } }]),
    createConnector("connector4", "Climb", "End"),
    createConnector("connector5", "Ready", "Hit", [{ content: "No", style: { fill: "white" } }]),
    createConnector("connector6", "Hit", "Relay"),
    createConnector("connector7", "Relay", "Alarm")
];
// Gridline configuration for the diagram.
var interval = [
    1,
    9,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75
];
var gridlines = {
    lineColor: "#e0e0e0",
    lineIntervals: interval
};
// Preparing flow shapes for the symbol palette.
var flowShapeTypes = [
    "Terminator", "Process", "Decision", "Document",
    "PreDefinedProcess", "PaperTap", "DirectData",
    "SequentialData", "Sort", "MultiDocument",
    "Collate", "SummingJunction", "Or", "InternalStorage",
    "Extract", "ManualOperation", "Merge", "OffPageReference",
    "SequentialAccessStorage", "Annotation", "Annotation2",
    "Data", "Card", "Delay"
];
var flowshapes = flowShapeTypes.map(function (type) { return ({ id: type, shape: { type: "Flow", shape: type } }); });
// Function to create a connector symbol for the symbol palette.
function createConnectorSymbol(id, type, targetDecoratorShape) {
    if (targetDecoratorShape === void 0) { targetDecoratorShape = "None"; }
    var connector = {
        id: id,
        type: type,
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    };
    if (targetDecoratorShape !== "None") {
        connector.targetDecorator = { shape: targetDecoratorShape, style: { strokeColor: '#757575', fill: '#757575' } };
    }
    else {
        connector.targetDecorator = { shape: "None" };
    }
    return connector;
}
// Initializing connector symbols for the symbol palette.
var connectorSymbols = [
    createConnectorSymbol("Link1", "Orthogonal", "Arrow"),
    createConnectorSymbol("link2", "Orthogonal"),
    createConnectorSymbol("Link3", "Straight", "Arrow"),
    createConnectorSymbol("link4", "Straight"),
    createConnectorSymbol("link5", "Bezier")
];
// CSS styles specific to this sample.
var SAMPLE_CSS = "\n  .e-upload {\n    display: none;\n  }\n\n  #palette-icon {\n    display: none;\n  }\n\n  @media (max-width: 550px) {\n      #palette-icon {\n          display: inline-flex;\n      }\n  }\n";
var Serialization = /** @class */ (function (_super) {
    __extends(Serialization, _super);
    function Serialization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Serialization.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar_diagram", style: { width: "100%", height: "10%", marginTop: "10px" }, clicked: function (args) {
                        switch (args.item.text) {
                            case "New":
                                diagramInstance.clear();
                                break;
                            case "Load":
                                document.getElementsByClassName("e-file-select-wrap")[0].querySelector("button").click();
                                break;
                            case null:
                                if (args.item.id === 'palette-icon')
                                    openPalette();
                                break;
                            default:
                                download(diagramInstance.saveDiagram());
                        }
                    }, items: [
                        {
                            id: 'palette-icon',
                            prefixIcon: 'e-ddb-icons2 e-toggle-palette',
                            align: 'Right',
                        },
                        {
                            text: "New",
                            tooltipText: "New",
                            prefixIcon: "e-diagram-icons e-diagram-new"
                        },
                        { type: "Separator" },
                        {
                            text: "Save",
                            tooltipText: "Save",
                            prefixIcon: "e-diagram-icons e-diagram-save"
                        },
                        { type: "Separator" },
                        {
                            text: "Load",
                            tooltipText: "Load",
                            prefixIcon: "e-diagram-icons e-diagram-open"
                        }
                    ] }),
                React.createElement("div", { style: { width: "100%", height: "80%" } },
                    React.createElement("div", { id: "palettespace", ref: function (palettespace) { return (paletteSpaceInstance = palettespace); }, className: "sb-mobile-palette" },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", palettes: [
                                {
                                    id: "flow",
                                    expanded: true,
                                    symbols: flowshapes,
                                    iconCss: "e-diagram-icons1 e-diagram-flow",
                                    title: "Flow Shapes"
                                },
                                {
                                    id: "connectors",
                                    expanded: true,
                                    symbols: connectorSymbols,
                                    iconCss: "e-diagram-icons1 e-diagram-connector",
                                    title: "Connectors"
                                }
                            ], getNodeDefaults: function (symbol) {
                                var strokeColor = '#757575';
                                var dimensions = {
                                    'Terminator': { width: 80, height: 40 },
                                    'Process': { width: 80, height: 40 },
                                    'Delay': { width: 80, height: 40 },
                                    'Decision': { width: 50, height: 40 },
                                    'Document': { width: 50, height: 40 },
                                    'PreDefinedProcess': { width: 50, height: 40 },
                                    'PaperTap': { width: 50, height: 40 },
                                    'DirectData': { width: 50, height: 40 },
                                    'MultiDocument': { width: 50, height: 40 },
                                    'Data': { width: 50, height: 40 },
                                };
                                symbol.style.strokeColor = strokeColor;
                                symbol.width = dimensions[symbol.id] ? dimensions[symbol.id].width : 50;
                                symbol.height = dimensions[symbol.id] ? dimensions[symbol.id].height : 50;
                            }, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, getSymbolInfo: function (symbol) {
                                return { fit: true };
                            }, width: "100%", height: "700px", symbolHeight: 60, symbolWidth: 60 })),
                    React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "645px", nodes: nodes, snapSettings: {
                                horizontalGridlines: gridlines,
                                verticalGridlines: gridlines
                            }, connectors: connectors, getConnectorDefaults: function (args, diagram) {
                                args.targetDecorator.height = 5;
                                args.targetDecorator.width = 5;
                                args.style.strokeColor = "#797979";
                                args.targetDecorator.style = {
                                    fill: "#797979",
                                    strokeColor: "#797979"
                                };
                                return args;
                            }, 
                            //Sets the Node style for DragEnter element.
                            dragEnter: function (args) {
                                var obj = args.element;
                                if (obj instanceof ej2_react_diagrams_1.Node) {
                                    var ratio = 100 / obj.width;
                                    obj.width = 100;
                                    obj.height *= ratio;
                                }
                            }, 
                            // event triggers after the diagram elements finished loading using loadDiagram method
                            loaded: function () {
                                diagramInstance.select([diagramInstance.nodes[0]]);
                            } })),
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { type: "file", id: "fileupload", asyncSettings: {
                            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
                            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
                        }, success: onUploadSuccess }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes building diagrams interactively and editing the saved diagrams. Symbol Palette is used to easily build diagrams.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to drag-and-drop shapes and connectors from symbol palette to build diagrams. You can save the diagram as text files and edit the pre-saved diagrams. The ",
                    React.createElement("code", null, "saveDiagram"),
                    " method can be used to save the diagram as string. The",
                    React.createElement("code", null, "loadDiagram"),
                    " method can be used to load the diagram from a string.The ",
                    React.createElement("code", null, "loaded"),
                    " event is triggered once the diagram has completely loaded, and the first node in the diagram has been selected during the event call. In this example, context menu and undo/redo features are enabled."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To enable undo/redo support, inject",
                    " ",
                    React.createElement("code", null, "UndoRedo"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    ". To enable context menu, inject ",
                    React.createElement("code", null, "DiagramContextMenu"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "The uploader API control is used to load the JSON data into a diagram asynchronously. Define the properties",
                    React.createElement("code", null, "saveUrl"),
                    ", which will receive the uploaded files and save them on the server, and ",
                    React.createElement("code", null, "removeUrl"),
                    ", which will receive the file information and handle the removal of files from the server."),
                React.createElement("br", null))));
    };
    return Serialization;
}(sample_base_1.SampleBase));
exports.Serialization = Serialization;
function onUploadSuccess(args) {
    // Extracts the file from the upload success event arguments.
    var file = args.file.rawFile;
    // Creates a FileReader to read the content of the file.
    var reader = new FileReader();
    // Reads the content of the file as a text string.
    reader.readAsText(file);
    // Assigns the loadDiagram function to execute when the file read operation completes.
    reader.onloadend = loadDiagram;
}
// Load the diagram object from a JSON string.
function loadDiagram(event) {
    // Extracts the text content from the FileReader event.
    var result = event.target.result;
    // Loads the diagram from the JSON string.
    diagramInstance.loadDiagram(result);
}
// Save the diagram object as a JSON file.
function download(data) {
    // MIME type for JSON data.
    var mimeType = "data:text/json;charset=utf-8,";
    // Checks for MS browser to use the msSaveBlob method.
    if (window.navigator.msSaveBlob) {
        // Creates a new Blob object containing the JSON data.
        var blob = new Blob([data], { type: mimeType });
        // Saves or opens the blob depending on the browser capability.
        window.navigator.msSaveOrOpenBlob(blob, "Diagram.json");
    }
    else {
        // Encodes the JSON data as a data URL.
        var dataStr = mimeType + encodeURIComponent(data);
        // Creates an anchor element to facilitate downloading.
        var downloadAnchor = document.createElement("a");
        downloadAnchor.href = dataStr;
        downloadAnchor.download = "Diagram.json";
        document.body.appendChild(downloadAnchor);
        // Triggers the download process.
        downloadAnchor.click();
        // Removes the anchor element from the document.
        downloadAnchor.remove();
    }
}
// Toggle the visibility of the palette on mobile devices.
function openPalette() {
    // Checks if the current viewport width is less than or equal to 550 pixels.
    var isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        // Toggles the class to show or hide the palette.
        paletteSpaceInstance.classList.toggle('sb-mobile-palette-open');
    }
}
