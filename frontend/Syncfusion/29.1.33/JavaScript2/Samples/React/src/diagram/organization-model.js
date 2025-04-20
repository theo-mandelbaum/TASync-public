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
exports.OrganizationModel = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var diagram_data_1 = require("./diagram-data");
var SAMPLE_CSS = "\n/* Property panel orientation and sub tree alignment */\n.diagram-organization .image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 75px;\n        width: calc((100% - 18px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .diagram-organization .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .diagram-organization .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .diagram-organization .row-header {\n        font-size: 13px;\n        font-weight: 500;\n    }\n\n    .diagram-organization .property-panel-header {\n      padding-top: 15px;\n      padding-bottom: 15px;\n    }\n\n    .diagram-organization .e-selected-orientation-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .diagram-organization .e-selected-pattern-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .diagram-organization .diagram-control-pane .col-xs-6 {\n        padding-left: 0px;\n        padding-right: 0px;\n    }";
var diagramInstance;
var horizontalSpacing;
var verticalSpacing;
var orientation;
var type;
var orientationInstance;
var patternInstance;
var OrganizationModel = /** @class */ (function (_super) {
    __extends(OrganizationModel, _super);
    function OrganizationModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrganizationModel.prototype.rendereComplete = function () {
        // Click Event for orientation of the PropertyPanel.
        orientationInstance.onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-orientation-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-orientation-style");
            }
            if (!target.classList.contains("e-selected-orientation-style")) {
                target.classList.add("e-selected-orientation-style");
            }
            if (target.className === "image-pattern-style e-selected-orientation-style") {
                switch (target.id) {
                    case "toptobottom":
                        diagramInstance.layout.orientation = "TopToBottom";
                        break;
                    case "bottomtotop":
                        diagramInstance.layout.orientation = "BottomToTop";
                        break;
                    case "lefttoright":
                        diagramInstance.layout.orientation = "LeftToRight";
                        break;
                    case "righttoleft":
                        diagramInstance.layout.orientation = "RightToLeft";
                        break;
                    default:
                        if (selectedElement.length) {
                            selectedElement[0].classList.remove("e-selected-orientation-style");
                        }
                }
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
        };
        //Click Event for pattern of the PropertyPanel.
        patternInstance.onclick = function (args) {
            var target = args.target;
            var selectedpatternElement = document.getElementsByClassName("e-selected-pattern-style");
            if (selectedpatternElement.length) {
                selectedpatternElement[0].classList.remove("e-selected-pattern-style");
            }
            if (!target.classList.contains("e-selected-pattern-style")) {
                target.classList.add("e-selected-pattern-style");
            }
            if (target.className === "image-pattern-style e-selected-pattern-style") {
                switch (target.id) {
                    case "pattern1":
                        orientation = "Vertical".toString();
                        type = "Alternate";
                        break;
                    case "pattern2":
                        orientation = "Vertical".toString();
                        type = "Left";
                        break;
                    case "pattern3":
                        orientation = "Vertical".toString();
                        type = "Left";
                        break;
                    case "pattern4":
                        orientation = "Vertical".toString();
                        type = "Right";
                        break;
                    case "pattern5":
                        orientation = "Vertical".toString();
                        type = "Right";
                        break;
                    case "pattern6":
                        orientation = "Horizontal".toString();
                        type = "Balanced";
                        break;
                    case "pattern7":
                        orientation = "Horizontal".toString();
                        type = "Center";
                        break;
                    case "pattern8":
                        orientation = "Horizontal".toString();
                        type = "Left";
                        break;
                    case "pattern9":
                        orientation = "Horizontal".toString();
                        type = "Right";
                        break;
                    default:
                        if (selectedpatternElement.length) {
                            selectedpatternElement[0].classList.remove("e-selected-pattern-style");
                        }
                }
                diagramInstance.layout.getLayoutInfo = function (node, options) {
                    if (target.id === "pattern4" || target.id === "pattern3") {
                        options.offset = -50;
                    }
                    if (orientation) {
                        getLayoutInfo(node, options, orientation, type);
                    }
                };
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
        };
    };
    OrganizationModel.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-organization" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "700px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                        //configures data source settings
                        dataSourceSettings: {
                            id: "Id",
                            parentId: "Manager",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.localBindData),
                            doBinding: function (nodeModel, data, diagram) {
                                nodeModel.shape = {
                                    type: "Text",
                                    content: data.Role,
                                    margin: { left: 10, right: 10, top: 10, bottom: 10 }
                                };
                            }
                        }, 
                        //Disables all interactions except zoom/pan
                        tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, 
                        //Configures automatic layout
                        layout: {
                            type: "OrganizationalChart",
                            getLayoutInfo: function (node, options) {
                                /* tslint:disable:no-string-literal */
                                if (node.data["Role"] === "General Manager") {
                                    options.assistants.push(options.children[0]);
                                    options.children.splice(0, 1);
                                }
                                if (!options.hasSubTree) {
                                    options.type = "Right";
                                }
                            }
                        }, 
                        //Defines the default node and connector properties
                        getNodeDefaults: function (obj, diagram) {
                            /* tslint:disable:no-string-literal */
                            return nodeDefaults(obj, diagram);
                        }, getConnectorDefaults: function (connector, diagram) {
                            return connectorDefaults(connector, diagram);
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree, ej2_react_diagrams_1.LayoutAnimation] })))),
            React.createElement("div", { className: "col-lg-4 property-section", style: { height: "80%" } },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                        React.createElement("div", { className: "row row-header" }, "Orientation"),
                        React.createElement("div", { id: "orientation", ref: function (orientation) { return (orientationInstance = orientation); } },
                            React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                React.createElement("div", { className: "image-pattern-style e-selected-orientation-style", id: "toptobottom", style: {
                                        backgroundImage: "url('src/diagram/Images/common-orientation/toptobottom.png')",
                                        marginRight: "3px"
                                    } }),
                                React.createElement("div", { className: "image-pattern-style", id: "bottomtotop", style: {
                                        backgroundImage: "url('src/diagram/Images/common-orientation/bottomtotop.png')",
                                        margin: "0px 3px"
                                    } }),
                                React.createElement("div", { className: "image-pattern-style", id: "lefttoright", style: {
                                        backgroundImage: "url('src/diagram/Images/common-orientation/lefttoright.png')",
                                        marginRight: "0px 3px"
                                    } })),
                            React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                React.createElement("div", { className: "image-pattern-style", id: "righttoleft", style: {
                                        backgroundImage: "url('src/diagram/Images/common-orientation/righttoleft.png')",
                                        margin: "0px 3px"
                                    } }))),
                        React.createElement("div", { className: "row row-header", style: { paddingTop: "10px" } }, "Subtree Alignment"),
                        React.createElement("div", { id: "pattern", ref: function (pattern) { return (patternInstance = pattern); } },
                            React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                React.createElement("div", { className: "image-pattern-style", id: "pattern1", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_1.png')",
                                        marginRight: "3px"
                                    } }),
                                React.createElement("div", { className: "image-pattern-style e-selected-pattern-style", id: "pattern2", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_2.png')",
                                        marginRight: "3px"
                                    } }),
                                React.createElement("div", { className: "image-pattern-style", id: "pattern5", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_5.png')",
                                        margin: "0px 3px"
                                    } })),
                            React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                React.createElement("div", { className: "image-pattern-style", id: "pattern6", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_6.png')",
                                        marginRight: "3px"
                                    } }),
                                React.createElement("div", { className: "image-pattern-style", id: "pattern7", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_7.png')",
                                        marginRight: "3px"
                                    } }),
                                React.createElement("div", { className: "image-pattern-style", id: "pattern8", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_8.png')",
                                        margin: "0px 3px"
                                    } })),
                            React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                                React.createElement("div", { className: "image-pattern-style", id: "pattern9", style: {
                                        backgroundImage: "url('src/diagram/patternimages/Pattern_9.png')",
                                        margin: "0px 3px"
                                    } }))))),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row row-header" }, "Behavior"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px" }, className: "col-xs-6" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Horizontal Spacing")),
                        React.createElement("div", { className: "col-xs-6" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (horizontalSpacingRef) { return (horizontalSpacing = horizontalSpacingRef); }, id: "horizontalSpacing", style: { width: "100%" }, min: 20, max: 60, step: 2, value: 30, change: function () {
                                    diagramInstance.layout.horizontalSpacing = Number(horizontalSpacing.value);
                                    diagramInstance.dataBind();
                                } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px" }, className: "col-xs-6" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Vertical Spacing")),
                        React.createElement("div", { className: "col-xs-6" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (verticalSpacingRef) { return (verticalSpacing = verticalSpacingRef); }, id: "verticalSpacing", style: { width: "100%" }, min: 20, max: 60, step: 2, value: 30, change: function () {
                                    diagramInstance.layout.verticalSpacing = Number(verticalSpacing.value);
                                    diagramInstance.dataBind();
                                } }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a simple business management structure that is built from an external data source. Hierarchical tree layout algorithm is used to build organizational charts. Customizing the orientation and structure of the organizational chart is illustrated in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate an organizational chart from an external data source. The spacing between the objects can also be customized in the chart. The ",
                    React.createElement("code", null, "horizontalSpacing"),
                    " and",
                    " ",
                    React.createElement("code", null, "verticalSpacing"),
                    " properties of",
                    React.createElement("code", null, "layout"),
                    " can be used to customize the space between objects in a tree. The ",
                    React.createElement("code", null, "layoutOrientation"),
                    " property of",
                    React.createElement("code", null, "layout"),
                    " can be used to change the orientation of the chart. The ",
                    React.createElement("code", null, "getLayoutInfo"),
                    " property of",
                    React.createElement("code", null, "layout"),
                    " can be used to customize the tree structure. To change the tree structure, choose any template in the palette."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in an organizational chart, inject",
                    React.createElement("code", null, "HierarchicalTree"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return OrganizationModel;
}(sample_base_1.SampleBase));
exports.OrganizationModel = OrganizationModel;
//set orientation and type of the Layout.
function getLayoutInfo(node, options, orientation, type) {
    /* tslint:disable:no-string-literal */
    if (node.data["Role"] === "General Manager") {
        options.assistants.push(options.children[0]);
        options.children.splice(0, 1);
    }
    if (!options.hasSubTree) {
        options.orientation = orientation;
        options.type = type;
    }
}
//sets default value for Node.
function nodeDefaults(obj, diagram) {
    obj.backgroundColor = obj.data.color;
    obj.style = { fill: "none", strokeColor: "none", color: "white" };
    obj.expandIcon = {
        height: 10,
        width: 10,
        shape: "None",
        fill: "lightgray",
        offset: { x: 0.5, y: 1 }
    };
    obj.expandIcon.verticalAlignment = "Center";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon = { height: 10, width: 10, shape: "None", fill: "lightgray", offset: { x: 0.5, y: 1 } };
    obj.collapseIcon.verticalAlignment = "Center";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.width = 120;
    obj.height = 30;
    return obj;
}
//sets default value for Connector.
function connectorDefaults(connector, diagram) {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    connector.constraints = ej2_react_diagrams_1.ConnectorConstraints.None;
    connector.cornerRadius = 0;
    return connector;
}
