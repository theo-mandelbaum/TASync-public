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
exports.GettingStartedAnnotation = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./font-icons.css");
//Initializes the nodes for the diagram
var nodes = [
    {
        id: "industry",
        offsetX: 280,
        offsetY: 250,
        annotations: [{ content: "Industry Competitors" }]
    },
    {
        id: "potential",
        offsetX: 280,
        offsetY: 110,
        annotations: [{ content: "Potential Entrants" }]
    },
    {
        id: "suplier",
        offsetX: 90,
        offsetY: 250,
        annotations: [{ content: "Suppliers" }]
    },
    {
        id: "substitutes",
        offsetX: 280,
        offsetY: 390,
        annotations: [{ content: "Substitutes" }]
    },
    {
        id: "buyers",
        offsetX: 470,
        offsetY: 250,
        annotations: [{ content: "Buyers" }]
    }
];
//Initializes the connector for the diagram
var connectors = [
    {
        id: "connector1",
        sourceID: "potential",
        targetID: "industry"
    },
    {
        id: "connector2",
        sourceID: "suplier",
        targetID: "industry"
    },
    {
        id: "connector3",
        sourceID: "substitutes",
        targetID: "industry"
    },
    {
        id: "connector4",
        sourceID: "buyers",
        targetID: "industry"
    },
    {
        id: "connector5",
        sourceID: "potential",
        targetID: "buyers",
        segments: [{ direction: "Right", type: 'Orthogonal', length: 60 }],
        targetDecorator: { shape: "None" }
    },
    {
        id: "connector6",
        sourceID: "buyers",
        targetID: "substitutes",
        segments: [{ direction: "Bottom", type: 'Orthogonal', length: 120 }],
        targetDecorator: { shape: "None" }
    },
    {
        id: "connector7",
        targetID: "suplier",
        sourceID: "substitutes",
        segments: [{ direction: "Left", type: 'Orthogonal', length: 60 }],
        targetDecorator: { shape: "None" }
    },
    {
        id: "connector9",
        sourceID: "suplier",
        targetID: "potential",
        segments: [{ direction: "Top", type: 'Orthogonal', length: 120 }],
        targetDecorator: { shape: "None" }
    }
];
//Font dropdown option
var fontType = [
    { type: "Arial", text: "Arial" },
    { type: "Aharoni", text: "Aharoni" },
    { type: "Bell MT", text: "Bell MT" },
    { type: "Fantasy", text: "Fantasy" },
    { type: "Times New Roman", text: "Times New Roman" },
    { type: "Segoe UI", text: "Segoe UI" },
    { type: "Verdana", text: "Verdana" }
];
//Template dropdown option
var templateList = [
    { value: "none", text: "None" },
    { value: "industry", text: "Industry Competitors" },
    { value: "suppliers", text: "Suppliers" },
    { value: "potential", text: "Potential Entrants" },
    { value: "buyers", text: "Buyers" },
    { value: "substitutes", text: "Substitutes" }
];
var diagramInstance;
var node;
var fontFamily;
var fontSize;
var fontColor;
var bold;
var italic;
var underLine;
var templateData;
var propertyPanelInstance;
var appearanceInstance;
var sample_css = ".diagram-property-tab .image-pattern-style {\n  background-color: white;\n  background-size: contain;\n  background-repeat: no-repeat;\n  height: 50px;\n  width: calc((100% - 18px) / 3);\n  cursor: pointer;\n  border: 1px solid #D5D5D5;\n  background-position: center;\n  float: left;\n}\n\n.diagram-property-tab .image-pattern-style:hover {\n  border-color: gray;\n  border-width: 2px;\n}\n\n.e-remove-selection .property-section-content {\n  pointer-events: none;\n}\n\n.diagram-property-tab .column-style {\n  display: table;\n  height: 35px;\n  padding-right: 4px;\n  padding-left: 0px;\n  width: calc((100% - 12px) / 3);\n}\n\n.diagram-property-tab .row {\n  margin-left: 0px;\n  margin-right: 0px;\n  cursor: pointer;\n}\n\n.diagram-property-tab .row-header {\n  font-size: 15px;\n  font-weight: 500;\n}\n.property-section .e-remove-selection {\n  cursor: not-allowed;\n}\n.diagram-property-tab .property-panel-header {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\n.diagram-property-tab .e-checkbox-wrapper .e-label {\n  font-size: 12px;\n}\n\n.diagram-property-tab .e-selected-style {\n  border-color: #006CE6;\n  border-width: 2px;\n}\n\n.diagram-control-pane .col-xs-6 {\n  padding-left: 0px;\n  padding-right: 0px;\n  padding-top: 5px;\n}";
var GettingStartedAnnotation = /** @class */ (function (_super) {
    __extends(GettingStartedAnnotation, _super);
    function GettingStartedAnnotation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Sample initialize
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    // Function to complete rendering actions
    GettingStartedAnnotation.prototype.rendereComplete = function () {
        // Fit the diagram instance to the page
        diagramInstance.fitToPage();
        // Select the first node in the diagramInstance
        diagramInstance.select([diagramInstance.nodes[0]]);
        // Set onclick event handler for bold.element
        bold.element.onclick = function () {
            changed("bold");
        };
        // Set onclick event handler for italic.element
        italic.element.onclick = function () {
            changed("italic");
        };
        // Set onclick event handler for underLine.element
        underLine.element.onclick = function () {
            changed("underline");
        };
        //Click event for Appearance of the Property Panel
        appearanceInstance.onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            // Remove 'e-selected-style' class from any element that has it
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            // Handle click action based on target's className
            if (target.className === "image-pattern-style") {
                updateAnnotationPosition(target.id);
            }
        };
    };
    GettingStartedAnnotation.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-control-pane" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "565px", nodes: nodes, connectors: connectors, selectionChange: function (arg) {
                            if (arg.state === "Changed") {
                                var selectedElement = document.getElementsByClassName("e-selected-style");
                                if (selectedElement.length) {
                                    selectedElement[0].classList.remove("e-selected-style");
                                }
                                //Checks for selection of new node
                                if (arg.newValue[0]) {
                                    var node_1 = arg.newValue[0];
                                    var annotations = node_1.annotations;
                                    if (node_1.annotations[0].offset.x === 0 &&
                                        node_1.annotations[0].offset.y === 0) {
                                        updateAnnotationPosition("left");
                                    }
                                    else if (node_1.annotations[0].offset.x === 1 &&
                                        node_1.annotations[0].offset.y === 0) {
                                        updateAnnotationPosition("right");
                                    }
                                    else if (node_1.annotations[0].offset.x === 1 &&
                                        node_1.annotations[0].offset.y === 0) {
                                        updateAnnotationPosition("right");
                                    }
                                    else if (node_1.annotations[0].offset.x === 0 &&
                                        node_1.annotations[0].offset.y === 1) {
                                        updateAnnotationPosition("bottomLeft");
                                    }
                                    else if (node_1.annotations[0].offset.x === 1 &&
                                        node_1.annotations[0].offset.y === 1) {
                                        updateAnnotationPosition("bottomRight");
                                    }
                                    else if (node_1.annotations[0].offset.x === 0.5 &&
                                        node_1.annotations[0].offset.y === 0.5) {
                                        updateAnnotationPosition("center");
                                    }
                                    else if (node_1.annotations[0].offset.x === 0.5 &&
                                        node_1.annotations[0].offset.y === 1) {
                                        updateAnnotationPosition("bottomCenter");
                                    }
                                }
                                enablePropertyPanel(arg);
                            }
                        }, 
                        //Sets the default values of a node
                        getNodeDefaults: function (node) {
                            var obj = {
                                width: 130,
                                height: 50,
                                style: {
                                    fill: "#D5EDED",
                                    strokeColor: "#7DCFC9",
                                    strokeWidth: 1
                                },
                                shape: { cornerRadius: 5 }
                            };
                            return obj;
                        }, 
                        //Sets the default values of a connector
                        getConnectorDefaults: function (obj) {
                            obj.type = "Orthogonal";
                            obj.constraints = ej2_react_diagrams_1.ConnectorConstraints.None;
                        }, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None } }))),
            React.createElement("div", { className: "col-lg-4 property-section diagram-property-tab " },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { style: { cursor: 'not-allowed' } },
                    React.createElement("div", { id: "propertypanel", className: "e-remove-selection", ref: function (propertyPanelRef) { return (propertyPanelInstance = propertyPanelRef); } },
                        React.createElement("div", { className: "property-section-content" },
                            React.createElement("div", { className: "row property-panel-content", id: "appearance", ref: function (appearance) { return (appearanceInstance = appearance); } },
                                React.createElement("div", { className: "row row-header" }, "Alignment"),
                                React.createElement("div", { className: "row" },
                                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                        React.createElement("div", { className: "image-pattern-style", id: "left", style: {
                                                backgroundImage: "url('src/diagram/Images/annotation/Annotation_1.png')",
                                                marginRight: "4px"
                                            } }),
                                        React.createElement("div", { className: "image-pattern-style", id: "right", style: {
                                                backgroundImage: "url('src/diagram/Images/annotation/Annotation_2.png')",
                                                margin: "0px 4px"
                                            } }),
                                        React.createElement("div", { className: "image-pattern-style", id: "bottomLeft", style: {
                                                backgroundImage: "url('src/diagram/Images/annotation/Annotation_3.png')"
                                            } })),
                                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                        React.createElement("div", { className: "image-pattern-style", id: "bottomRight", style: {
                                                backgroundImage: "url('src/diagram/Images/annotation/Annotation_4.png')",
                                                margin: "0px 4px"
                                            } }),
                                        React.createElement("div", { className: "image-pattern-style", id: "center", style: {
                                                backgroundImage: "url('src/diagram/Images/annotation/Annotation_5.png')",
                                                marginRight: "4px"
                                            } }),
                                        React.createElement("div", { className: "image-pattern-style", id: "bottomCenter", style: {
                                                backgroundImage: "url('src/diagram/Images/annotation/Annotation_6.png')"
                                            } }))),
                                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px", overflow: "hidden" } },
                                    React.createElement("div", { className: "row row-header" }, "Appearance"),
                                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                        React.createElement("div", { className: "col-xs-4 column-style" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { width: "100%" }, id: "bold", iconCss: "e-diagram-icons e-diagram-bold", ref: function (boldref) { return (bold = boldref); }, "aria-label": "bold" }, " ")),
                                        React.createElement("div", { className: "col-xs-4 column-style" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { width: "100%" }, id: "italic", iconCss: "e-diagram-icons e-diagram-italic", ref: function (italicref) { return (italic = italicref); }, "aria-label": "italic" }, " ")),
                                        React.createElement("div", { className: "col-xs-4 column-style" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { width: "100%" }, id: "underline", iconCss: "e-diagram-icons e-diagram-underline", ref: function (underLineref) { return (underLine = underLineref); }, "aria-label": "underline" }, " "))),
                                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                        React.createElement("div", { className: "col-xs-4 column-style" },
                                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "fontcolor", value: "#000", change: function (arg) {
                                                    for (var i = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
                                                        node = diagramInstance.selectedItems.nodes[i];
                                                        node.annotations[0]
                                                            .style.color =
                                                            arg.currentValue.rgba;
                                                    }
                                                }, ref: function (fontcolor) { return (fontColor = fontcolor); } })),
                                        React.createElement("div", { className: "col-xs-4 column-style" },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "fontSize", value: 12, min: 0, max: 50, step: 1, format: "##.##", change: function () {
                                                    changed("fontsize");
                                                }, ref: function (fontsize) { return (fontSize = fontsize); }, "aria-label": "font-size-textBox" })),
                                        React.createElement("div", { className: "col-xs-4 column-style" },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "fontfamily", popupWidth: 150, width: "100%", placeholder: "Select a font type", index: 0, dataSource: fontType, change: function () {
                                                    changed("fontfamily");
                                                }, ref: function (fontfamily) { return (fontFamily = fontfamily); } }))),
                                    React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                                        React.createElement("div", { className: "row row-header" }, "Templates"),
                                        React.createElement("div", { className: "row col-xs-8", style: { paddingLeft: "0px", paddingTop: "8px" } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "template", fields: this.fields, popupWidth: 200, width: "100%", placeholder: "Select a template", dataSource: templateList, change: function () {
                                                    changed("template");
                                                }, ref: function (template) { return (templateData = template); } }))),
                                    React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                                        React.createElement("div", { className: "row row-header" }, "Behaviour"),
                                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "labelConstraints", label: "Label constraints", checked: false, change: function () {
                                                    changed("interaction");
                                                } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the competitive environment of a business through five forces chart. The elements of the five force chart is described using nodes and annotations. Customizing the position and appearance of the annotation is illustrated in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to add textual descriptions to shapes and how to position them over the shapes. The",
                    React.createElement("code", null, "annotations"),
                    " property of the node can be used to add descriptions."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "offset"),
                    ", ",
                    React.createElement("code", null, "horizontalAlignment"),
                    ", and",
                    React.createElement("code", null, "verticalAlignment"),
                    " ",
                    "properties of the annotation can be used to customize the position of the descriptions. The ",
                    React.createElement("code", null, "bold"),
                    ",",
                    React.createElement("code", null, "italic"),
                    ",",
                    " ",
                    React.createElement("code", null, "fontSize"),
                    ", and ",
                    React.createElement("code", null, "fontFamily"),
                    " properties can be used to customize the appearance of the descriptions."),
                React.createElement("p", null, "To change the position of the descriptions, select a node and choose the template in the property panel."),
                React.createElement("br", null))));
    };
    return GettingStartedAnnotation;
}(sample_base_1.SampleBase));
exports.GettingStartedAnnotation = GettingStartedAnnotation;
//Apply the appearence of the Annotation
function changed(value) {
    for (var i = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
        var node = diagramInstance.selectedItems.nodes[i];
        var annotationStyle = node.annotations[0].style;
        if (value === "fontsize") {
            annotationStyle.fontSize = fontSize.value;
        }
        else if (value === "underline") {
            annotationStyle.textDecoration = annotationStyle.textDecoration === 'Underline' ? 'None' : 'Underline';
        }
        else if (value === "fontfamily") {
            annotationStyle.fontFamily = fontFamily.value.toString();
        }
        else if (value === "bold") {
            annotationStyle.bold = !annotationStyle.bold;
        }
        else if (value === "italic") {
            annotationStyle.italic = !annotationStyle.italic;
        }
        else if (value === 'template') {
            if (templateData.value.toString() === 'none') {
                node.annotations[0].template = '';
                node.annotations[0].width = undefined;
                node.annotations[0].height = undefined;
            }
            else {
                node.annotations[0].width = 25;
                node.annotations[0].height = 25;
                node.annotations[0].template =
                    '<img src="src/diagram/Images/annotation/' + templateData.value.toString() + '.svg" style="width:100%;height:100%" />';
            }
        }
        else if (value === 'interaction') {
            var annotation = node.annotations[0];
            if (annotation && annotation.constraints) {
                annotation.constraints = annotation.constraints ^ ej2_react_diagrams_1.AnnotationConstraints.Interaction;
            }
        }
        diagramInstance.dataBind();
    }
}
//Update the Annotation Position based on the selection
function updateAnnotationPosition(id) {
    var target = document.getElementById(id);
    for (var i = 0; i < diagramInstance.selectedItems.nodes.length; i++) {
        node = diagramInstance.selectedItems.nodes[i];
        //we can refactor this code using a method
        var annotation = node.annotations[0];
        switch (target.id) {
            case "left":
                setAnnotationPosition(annotation, 0, 0, "Top", "Left", target);
                break;
            case "right":
                setAnnotationPosition(annotation, 1, 0, "Top", "Right", target);
                break;
            case "bottomLeft":
                setAnnotationPosition(annotation, 0, 1, "Bottom", "Left", target);
                break;
            case "bottomRight":
                setAnnotationPosition(annotation, 1, 1, "Bottom", "Right", target);
                break;
            case "center":
                setAnnotationPosition(annotation, 0.5, 0.5, "Center", "Center", target);
                break;
            case "bottomCenter":
                setAnnotationPosition(annotation, 0.5, 1, "Top", "Center", target);
                break;
        }
    }
}
//set the Annotation Position
function setAnnotationPosition(//it is in dedicated line here.
annotation, offsetX, offsetY, verticalAlignment, horizontalAlignment, target) {
    annotation.offset.x = offsetX;
    annotation.offset.y = offsetY;
    annotation.verticalAlignment = verticalAlignment;
    annotation.horizontalAlignment = horizontalAlignment;
    if (verticalAlignment === "Top" && horizontalAlignment === "Left") {
        annotation.margin = { left: 3, top: 3 };
    }
    else if (verticalAlignment === "Top" && horizontalAlignment === "Right") {
        annotation.margin = { right: 3, top: 3 };
    }
    else if (verticalAlignment === "Bottom" && horizontalAlignment === "Left") {
        annotation.margin = { left: 3, bottom: 3 };
    }
    else if (verticalAlignment === "Bottom" && horizontalAlignment === "Right") {
        annotation.margin = { right: 3, bottom: 3 };
    }
    target.classList.add("e-selected-style");
}
//Enable or disable the property panel
function enablePropertyPanel(arg) {
    var appearance = propertyPanelInstance;
    var selectedElement = document.getElementsByClassName("e-remove-selection");
    //Checks for selection of new node
    if (arg.newValue) {
        if (arg.newValue[0] instanceof ej2_react_diagrams_1.Node) {
            if (selectedElement.length > 0) {
                selectedElement[0].classList.remove("e-remove-selection");
            }
        }
        else {
            if (!appearance.classList.contains("e-remove-selection")) {
                appearance.classList.add("e-remove-selection");
            }
        }
    }
}
