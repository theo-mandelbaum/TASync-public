"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_diagrams_2 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_diagrams_3 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
ej2_react_diagrams_3.Diagram.Inject(ej2_react_diagrams_1.ConnectorEditing);
var diagramInstance;
var sourceDecoratorDropDown;
var targetDecoratorDropDown;
var appearanceElement;
var segmentDecoratorSizeNumericTextBox;
//Initialize shape
var shape = {
    type: "Basic",
    shape: "Rectangle",
    cornerRadius: 10
};
//Initialize Diagram Nodes
var nodes = [
    { id: "node1", annotations: [{ content: "Promotion" }] },
    { id: "node2", annotations: [{ content: "Lead" }] },
    { id: "node3", annotations: [{ content: "Account" }] },
    { id: "node4", annotations: [{ content: "Information" }] },
    { id: "node5", annotations: [{ content: "Opportunity" }] },
    { id: "node6", offsetX: 540, offsetY: 290, excludeFromLayout: true }
];
//Initialize Diagram connectors
var connectors = [
    { id: "connector", sourceID: "node1", targetID: "node2" },
    {
        id: "connector1",
        sourceID: "node2",
        sourcePortID: "port1",
        targetID: "node3",
        targetPortID: "portIn"
    },
    {
        id: "connector2",
        sourceID: "node2",
        sourcePortID: "port2",
        targetID: "node4",
        targetPortID: "portIn"
    },
    {
        id: "connector3",
        sourceID: "node2",
        sourcePortID: "port3",
        targetID: "node5",
        targetPortID: "portIn"
    },
    {
        id: "connector4",
        sourceID: "node6",
        sourcePortID: "port4",
        targetID: "node3",
        targetPortID: "portOut"
    },
    {
        id: "connector5",
        sourceID: "node6",
        sourcePortID: "port5",
        targetID: "node4",
        targetPortID: "portOut"
    },
    {
        id: "connector7",
        sourceID: "node6",
        sourcePortID: "port6",
        targetID: "node5",
        targetPortID: "portOut"
    }
];
// Shape collection of the decorators.
var decoratorShape = [
    { shape: 'None', text: 'None' },
    { shape: 'Square', text: 'Square' },
    { shape: 'Circle', text: 'Circle' },
    { shape: 'Diamond', text: 'Diamond' },
    { shape: 'Arrow', text: 'Arrow' },
    { shape: 'OpenArrow', text: 'Open Arrow' },
    { shape: 'Fletch', text: 'Fletch' },
    { shape: 'OpenFetch', text: 'Open Fetch' },
    { shape: 'IndentedArrow', text: 'Indented Arrow' },
    { shape: 'OutdentedArrow', text: 'Outdented Arrow' },
    { shape: 'DoubleArrow', text: 'Double Arrow' }
];
var SAMPLE_CSS = "\n/* For connector type and style change in property panel*/\n.diagram-connector .image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 45px;\n        width: calc((100% - 13px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .diagram-connector .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .diagram-connector .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .diagram-connector .row-header {\n        font-size: 13px;\n        font-weight: 500;\n    }\n\n    .diagram-connector .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .diagram-connector label{\n      display: inline-block;\n      font-size: 13px;\n      font-weight: 400;\n      width: 100%;\n      margin-top: auto;\n    }";
function Connectors() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var node;
    var connector;
    function rendereComplete() {
        diagramInstance.fitToPage();
        //Click Event for Appearance of the layout.
        appearanceElement.onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "straightConnector":
                        defaultConnectorStyle("Straight", target);
                        break;
                    case "orthogonalConnector":
                        defaultConnectorStyle("Orthogonal", target);
                        break;
                    case "bezierConnector":
                        defaultConnectorStyle("Bezier", target);
                        break;
                    case "straightConnectorWithStroke":
                        applyConnectorStyle(false, false, false, "Straight", target);
                        break;
                    case "orthogonalConnectorWithStroke":
                        applyConnectorStyle(false, false, false, "Orthogonal", target);
                        break;
                    case "bezierConnectorWithStroke":
                        applyConnectorStyle(false, false, false, "Bezier", target);
                        break;
                    case "straightConnectorWithDasharray":
                        applyConnectorStyle(true, false, false, "Straight", target);
                        break;
                    case "orthogonalConnectorWithDasharray":
                        applyConnectorStyle(true, false, false, "Orthogonal", target);
                        break;
                    case "bezierConnectorWithDasharray":
                        applyConnectorStyle(true, false, false, "Bezier", target);
                        break;
                    case "cornerRadius":
                        applyConnectorStyle(false, false, true, "Orthogonal", target);
                        break;
                    case "sourceDecorators":
                        applyConnectorStyle(false, true, false, "Straight", target);
                        break;
                    case "sourceDecoratorWithDasharray":
                        applyConnectorStyle(true, true, false, "Straight", target);
                        break;
                }
            }
        };
    }
    //Customize the content of the node
    function setNodeTemplate() {
        var canvas = new ej2_react_diagrams_2.StackPanel();
        canvas.children = [];
        canvas.id = (0, ej2_react_diagrams_1.randomId)();
        canvas.style.strokeWidth = 0;
        canvas.style.fill = "#e6e0eb";
        canvas.children.push(getTextElement("Events", "#a6a1e0"));
        canvas.children.push(getTextElement("Emails", "#db8ec9"));
        canvas.children.push(getTextElement("Calls", "#db8ec9"));
        canvas.children.push(getTextElement("Smart Contents", "#db8ec9"));
        return canvas;
    }
    //Creation of TextElement for node
    function getTextElement(text, color) {
        var textElement = new ej2_react_diagrams_1.TextElement();
        textElement.id = (0, ej2_react_diagrams_1.randomId)();
        textElement.width = 80;
        textElement.height = 35;
        textElement.content = text;
        textElement.style.fill = "#6f409f";
        textElement.style.color = "white";
        textElement.style.strokeColor = "#6f409f";
        textElement.cornerRadius = 5;
        textElement.margin = { top: 10, bottom: 10, left: 10, right: 10 };
        textElement.relativeMode = "Object";
        return textElement;
    }
    //creation of Port for Node.
    function getPorts(obj) {
        if (obj.id === "node2") {
            var node2Ports = [
                {
                    id: "port1",
                    offset: { x: 1, y: 0.25 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                },
                {
                    id: "port2",
                    offset: { x: 1, y: 0.5 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                },
                {
                    id: "port3",
                    offset: { x: 1, y: 0.75 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                }
            ];
            return node2Ports;
        }
        else if (obj.id === "node6") {
            var node6Ports = [
                {
                    id: "port4",
                    offset: { x: 0, y: 0.46 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                },
                {
                    id: "port5",
                    offset: { x: 0, y: 0.5 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                },
                {
                    id: "port6",
                    offset: { x: 0, y: 0.54 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                }
            ];
            return node6Ports;
        }
        else {
            var ports = [
                {
                    id: "portIn",
                    offset: { x: 0, y: 0.5 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                },
                {
                    id: "portOut",
                    offset: { x: 1, y: 0.5 },
                    visibility: ej2_react_diagrams_3.PortVisibility.Hidden
                }
            ];
            return ports;
        }
    }
    //ConnectorStyle customization
    function applyConnectorStyle(dashedLine, sourceDecorator, isRounded, type, target) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.connectors[i].style.strokeWidth = 2;
            diagramInstance.connectors[i].type = type;
            if (isRounded) {
                diagramInstance.connectors[i].cornerRadius = 5;
            }
            if (sourceDecorator) {
                diagramInstance.connectors[i].sourceDecorator = {
                    style: {
                        strokeColor: diagramInstance.connectors[i].style.strokeColor,
                        fill: diagramInstance.connectors[i].style.strokeColor,
                        strokeWidth: 2
                    },
                    shape: "Circle"
                };
                sourceDecoratorDropDown.value = 'Circle';
            }
            else {
                diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
                sourceDecoratorDropDown.value = 'None';
            }
            if (dashedLine) {
                diagramInstance.connectors[i].style.strokeDashArray = "5,5";
            }
            else {
                diagramInstance.connectors[i].style.strokeDashArray = "";
            }
            diagramInstance.connectors[i].targetDecorator = {
                style: {
                    strokeColor: diagramInstance.connectors[i].style.strokeColor,
                    fill: diagramInstance.connectors[i].style.strokeColor,
                    strokeWidth: 2
                },
                shape: "Arrow"
            };
            diagramInstance.dataBind();
            diagramInstance.updateSelector();
            targetDecoratorDropDown.value = 'Arrow';
        }
        target.classList.add("e-selected-style");
    }
    //ConnectorStyle customization
    function defaultConnectorStyle(type, target) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.connectors[i].style.strokeWidth = 1;
            diagramInstance.connectors[i].type = type;
            diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
            diagramInstance.connectors[i].style.strokeDashArray = "";
            diagramInstance.connectors[i].targetDecorator = {
                style: {
                    strokeColor: diagramInstance.connectors[i].style.strokeColor,
                    fill: diagramInstance.connectors[i].style.strokeColor,
                    strokeWidth: 1
                },
                shape: "Arrow"
            };
            diagramInstance.dataBind();
            targetDecoratorDropDown.value = 'Arrow';
        }
        target.classList.add("e-selected-style");
    }
    //Change Source decorator shape
    function sourceDecoratorShapeChange(args) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.connectors[i].sourceDecorator = {
                shape: args.itemData.shape,
                style: {
                    strokeColor: diagramInstance.connectors[i].style.strokeColor,
                    fill: diagramInstance.connectors[i].style.strokeColor,
                }
            };
        }
        diagramInstance.dataBind();
    }
    //Change target decorator shape
    function targetDecoratorShapeChange(args) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.connectors[i].targetDecorator = {
                shape: args.itemData.shape,
                style: {
                    strokeColor: diagramInstance.connectors[i].style.strokeColor,
                    fill: diagramInstance.connectors[i].style.strokeColor,
                }
            };
            diagramInstance.dataBind();
        }
    }
    //Change segment decorator shape
    function segmentDecoratorShapeChange(args) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.segmentThumbShape = args.itemData.shape;
        }
        diagramInstance.dataBind();
    }
    //Change Source decorator size
    function sourceDecoratorSizeChange(args) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.connectors[i].sourceDecorator.width = args.value;
            diagramInstance.connectors[i].sourceDecorator.height = args.value;
        }
        diagramInstance.dataBind();
    }
    //Change target decorator size
    function targetDecoratorSizeChange(args) {
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            diagramInstance.connectors[i].targetDecorator.width = args.value;
            diagramInstance.connectors[i].targetDecorator.height = args.value;
        }
        diagramInstance.dataBind();
    }
    //Change segment decorator size
    function segmentDecoratorSizeChange(args) {
        var connector = diagramInstance.selectedItems.connectors[0];
        diagramInstance.segmentThumbSize = args.value;
        diagramInstance.clearSelection();
        diagramInstance.select([diagramInstance.nameTable[connector.id]]);
        diagramInstance.dataBind();
    }
    return (React.createElement("div", { className: "control-pane diagram-connector" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%", background: "white" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: 580, nodes: nodes, connectors: connectors, segmentThumbSize: 10, selectionChange: function () {
                        if (diagramInstance.selectedItems.connectors.length > 0) {
                            segmentDecoratorSizeNumericTextBox.enabled = true;
                        }
                        else {
                            segmentDecoratorSizeNumericTextBox.enabled = false;
                        }
                    }, 
                    //Configrues hierarchical tree layout
                    layout: {
                        type: "HierarchicalTree",
                        orientation: "LeftToRight",
                        verticalSpacing: 75,
                        margin: { left: 30, right: 0, top: 0, bottom: 0 }
                    }, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                    //Sets the default values of nodes
                    getNodeDefaults: function (obj) {
                        if (obj.id !== "node1") {
                            //Set ports
                            obj.ports = getPorts(obj);
                        }
                        if (obj.id !== "node6") {
                            obj.shape = shape;
                            obj.width = 80;
                            obj.style.strokeWidth = 2;
                            obj.style.strokeColor = "#6F409F";
                            obj.height = 35;
                        }
                    }, 
                    //Sets the default values of connector
                    getConnectorDefaults: function (obj) {
                        obj.type = "Bezier";
                        obj.style.strokeColor = "#6f409f";
                        obj.style.strokeWidth = 2;
                        obj.targetDecorator = {
                            style: {
                                strokeColor: "#6f409f",
                                fill: "#6f409f"
                            }
                        };
                        obj.segments = [
                            {
                                type: 'Bezier',
                            }
                        ],
                            obj.constraints = ej2_react_diagrams_1.ConnectorConstraints.Default | ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb;
                    }, 
                    //Customize the content of the node
                    setNodeTemplate: function (obj) {
                        if (obj.id === "node6") {
                            return setNodeTemplate();
                        }
                        return null;
                    } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.HierarchicalTree] })))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("div", { className: "row property-panel-content", id: "appearance", ref: function (appearance) { return (appearanceElement = appearance); } },
                React.createElement("div", { className: "row row-header" },
                    React.createElement("b", null, "Connector types")),
                React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                    React.createElement("div", { className: "image-pattern-style", id: "straightConnector", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_1.png')",
                            marginRight: "3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "orthogonalConnector", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_2.png')",
                            margin: "0px 3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "bezierConnector", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_3.png')",
                            marginLeft: "3px"
                        } })),
                React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                    React.createElement("div", { className: "image-pattern-style", id: "straightConnectorWithStroke", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_4.png')",
                            marginRight: "3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "orthogonalConnectorWithStroke", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_5.png')",
                            margin: "0px 3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "bezierConnectorWithStroke", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_6.png')",
                            marginLeft: "3px"
                        } })),
                React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                    React.createElement("div", { className: "image-pattern-style", id: "straightConnectorWithDasharray", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_7.png')",
                            marginRight: "3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "orthogonalConnectorWithDasharray", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_8.png')",
                            margin: "0px 3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "bezierConnectorWithDasharray", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_9.png')",
                            marginLeft: "3px"
                        } })),
                React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                    React.createElement("div", { className: "image-pattern-style", id: "cornerRadius", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_10.png')",
                            marginRight: "3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "sourceDecorators", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_11.png')",
                            margin: "0px 3px"
                        } }),
                    React.createElement("div", { className: "image-pattern-style", id: "sourceDecoratorWithDasharray", style: {
                            backgroundImage: "url('src/diagram/Images/connector/Connectors_12.png')",
                            marginLeft: "3px"
                        } }))),
            React.createElement("div", { className: "row property-panel-content", id: "decorators", style: { paddingTop: "10px" } },
                React.createElement("div", { className: "row row-header", style: { paddingTop: "8px" } },
                    React.createElement("b", null, "Decorators")),
                React.createElement("div", { className: "row", style: { paddingTop: "8px", display: 'flex' } },
                    React.createElement("label", null, "Source Decorators"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "sourceDecorator", ref: function (sourceDecorator) { return (sourceDecoratorDropDown = sourceDecorator); }, value: "None", dataSource: decoratorShape, change: sourceDecoratorShapeChange }))),
                React.createElement("div", { className: "row", style: { paddingTop: "8px", display: 'flex' } },
                    React.createElement("label", null, "Target Decorators"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "targetDecorator", ref: function (targetDecorator) { return (targetDecoratorDropDown = targetDecorator); }, value: "Arrow", dataSource: decoratorShape, change: targetDecoratorShapeChange }))),
                React.createElement("div", { className: "row", style: { paddingTop: "8px", display: 'flex' } },
                    React.createElement("label", null, "Segment Decorators"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "segmentDecorator", value: "Circle", dataSource: decoratorShape, change: segmentDecoratorShapeChange })))),
            React.createElement("div", { className: "row property-panel-content", id: "decorators", style: { paddingTop: "10px" } },
                React.createElement("div", { className: "row row-header", style: { paddingTop: "8px" } },
                    React.createElement("b", null, "Decorators Size")),
                React.createElement("div", { className: "row", style: { paddingTop: "8px", display: 'flex' } },
                    React.createElement("label", null, "Source Decorators Size"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "sourceDecoratorSize", enabled: true, format: "###.##", value: 12, step: 1, max: 20, min: 10, change: sourceDecoratorSizeChange }))),
                React.createElement("div", { className: "row", style: { paddingTop: "8px", display: 'flex' } },
                    React.createElement("label", null, "Target Decorators Size"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "targetDecoratorSize", enabled: true, format: "###.##", value: 12, step: 1, max: 20, min: 10, change: targetDecoratorSizeChange }))),
                React.createElement("div", { className: "row", style: { paddingTop: "8px", display: 'flex' } },
                    React.createElement("label", null, "Segment Decorators Size"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "segmentDecoratorSize", ref: function (segmentDecoratorSize) { return (segmentDecoratorSizeNumericTextBox = segmentDecoratorSize); }, enabled: false, format: "###.##", value: 12, step: 1, max: 20, min: 10, change: segmentDecoratorSizeChange })))),
            React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "8px" } },
                React.createElement("div", { className: "row row-header" },
                    React.createElement("b", null, "Appearance")),
                React.createElement("div", { className: "row", style: { paddingTop: "10px", display: 'flex' } },
                    React.createElement("label", null, "Line Color"),
                    React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "color", mode: "Palette", showButtons: false, modeSwitcher: true, value: "#6F409F", change: function (args) {
                            for (var i = 0; i < diagramInstance.connectors.length; i++) {
                                diagramInstance.connectors[i].style.strokeColor = args.currentValue.hex;
                                diagramInstance.connectors[i].targetDecorator.style.strokeColor = args.currentValue.hex;
                                diagramInstance.connectors[i].targetDecorator.style.fill = args.currentValue.hex;
                                diagramInstance.connectors[i].sourceDecorator.style.strokeColor = args.currentValue.hex;
                                diagramInstance.connectors[i].sourceDecorator.style.fill = args.currentValue.hex;
                            }
                            diagramInstance.dataBind();
                        } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the data flow in a marketing process using predefined shapes and connectors. Different types of connectors and decorators are used to customize the appearance, path, and direction of the data flow.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to add connectors to connect the shapes and how to customize the appearance of the connectors. You can use the ",
                React.createElement("code", null, "style"),
                " property of the connector to customize its stroke style. You can use the",
                React.createElement("code", null, "cornerRadius"),
                " property to add connectors with rounded corners."),
            React.createElement("p", null,
                "To change the appearance, click on different styles in the property panel to modify the connector type, decorator shapes, and decorator sizes. The ",
                React.createElement("code", null, "type"),
                " property of the connector defines its segment type. The ",
                React.createElement("code", null, "shape"),
                " property specifies the shapes for the source, target, and segment decorators. You can adjust the size of the source and target decorators by setting their",
                React.createElement("code", null, "width"),
                "and ",
                React.createElement("code", null, "height"),
                ". Additionally, the",
                React.createElement("code", null, "segmentThumbSize"),
                "property allows you to modify the size of the segment decorator when the connector is selected."),
            React.createElement("p", null, "In this example, the shapes are automatically arranged using hierarchical tree layout."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Diagram component's features are segregated into individual feature-wise modules. To automatically arrange the shapes, we need to Inject ",
                React.createElement("code", null, "HierarchicalTree"),
                " module into",
                " ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("br", null))));
}
exports.default = Connectors;
