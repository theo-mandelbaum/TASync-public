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
exports.HierarchicalModel = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var diagram_data_1 = require("./diagram-data");
var SAMPLE_CSS = ".image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 75px;\n        width: calc((100% - 12px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .property-panel-header {\n      padding-top: 15px;\n      padding-bottom: 15px;\n    }\n\n    .diagram-property-tab .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .diagram-property-tab .row-header {\n        font-size: 13px;\n        font-weight: 500;\n    }\n\n    .e-checkbox-wrapper .e-label {\n        font-size: 12px;\n    }\n\n    .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .diagram-property-tab .diagram-control-pane .col-xs-6 {\n        padding-left: 0px;\n        padding-right: 0px;\n    }";
var diagramInstance;
var horizontalSpacing;
var verticalSpacing;
var appearanceInstance;
var HierarchicalModel = /** @class */ (function (_super) {
    __extends(HierarchicalModel, _super);
    function HierarchicalModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HierarchicalModel.prototype.rendereComplete = function () {
        //Click event for Appearance of the Property Panel.
        appearanceInstance.onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "toptobottom":
                        updateLayout(target, "TopToBottom");
                        break;
                    case "bottomtotop":
                        updateLayout(target, "BottomToTop");
                        break;
                    case "lefttoright":
                        updateLayout(target, "LeftToRight");
                        break;
                    case "righttoleft":
                        updateLayout(target, "RightToLeft");
                        break;
                }
            }
        };
    };
    HierarchicalModel.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "499px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, dataSourceSettings: {
                            //sets the fields to bind
                            id: "Name",
                            parentId: "Category",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.hierarchicalTree),
                            doBinding: function (nodeModel, data, diagram) {
                                nodeModel.shape = {
                                    type: "Text",
                                    content: data.Name
                                };
                            }
                        }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, layout: {
                            type: "HierarchicalTree",
                            verticalSpacing: 30,
                            horizontalSpacing: 40,
                            enableAnimation: true
                        }, getNodeDefaults: function (obj, diagram) {
                            return nodeDefaults(obj, diagram);
                        }, getConnectorDefaults: function (connector) {
                            return connectorDefaults(connector);
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree, ej2_react_diagrams_1.LayoutAnimation] })))),
            React.createElement("div", { className: "col-lg-4 property-section diagram-property-tab " },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance", ref: function (appearance) { return (appearanceInstance = appearance); } },
                    React.createElement("div", { className: "row row-header" }, "Appearance"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style e-selected-style", id: "toptobottom", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/toptobottom.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "bottomtotop", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/bottomtotop.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "lefttoright", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/lefttoright.png')",
                                margin: "0px 3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "righttoleft", style: {
                                backgroundImage: "url('src/diagram/Images/common-orientation/righttoleft.png')",
                                margin: "0px 3px"
                            } }))),
                React.createElement("div", { className: "row  property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row row-header" }, "Behavior"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px" }, className: "col-xs-6" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Horizontal Spacing")),
                        React.createElement("div", { className: "col-xs-6" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (horizontalSpacingRef) { return (horizontalSpacing = horizontalSpacingRef); }, id: "hSpacing", style: { width: "100%" }, format: "###.##", min: 20, max: 60, step: 2, value: 40, 
                                //sets horizontal spacing between nodes
                                change: function () {
                                    diagramInstance.layout.horizontalSpacing = Number(horizontalSpacing.value);
                                    diagramInstance.doLayout();
                                    diagramInstance.dataBind();
                                } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px" }, className: "col-xs-6" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Vertical Spacing")),
                        React.createElement("div", { className: "col-xs-6" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (verticalSpacingRef) { return (verticalSpacing = verticalSpacingRef); }, id: "vSpacing", style: { width: "100%" }, format: "###.##", min: 20, max: 60, step: 2, value: 30, 
                                //sets vertical spacing between nodes
                                change: function () {
                                    diagramInstance.layout.verticalSpacing = Number(verticalSpacing.value);
                                    diagramInstance.doLayout();
                                    diagramInstance.dataBind();
                                } }))),
                    React.createElement("div", { className: "row", style: { paddingTop: '8px' } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: "Expandable", change: onChange.bind(this) })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a generating hierarchical tree from right to left orientation with external data source.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to generate a hierarchical tree from external data sources. You can also customize the spacing between the objects in the tree. You can use the",
                    React.createElement("code", null, "horizontalSpacing"),
                    " and",
                    React.createElement("code", null, "verticalSpacing"),
                    " properties of",
                    React.createElement("code", null, "layout"),
                    " to customize the space between the objects in the tree. You can use the",
                    React.createElement("code", null, "layoutOrientation"),
                    " property of",
                    React.createElement("code", null, "layout"),
                    " to change the orientation of the tree."),
                React.createElement("p", null, "To change the orientation of the tree, click the templates that are added to the property panel."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Diagram component's features are segregated into individual feature-wise modules. To generate diagrams from external data source, we need to Inject",
                    React.createElement("code", null, "DataBinding"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a hierarchical structure, we need to Inject",
                    React.createElement("code", null, "HierarchicalTree"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return HierarchicalModel;
}(sample_base_1.SampleBase));
exports.HierarchicalModel = HierarchicalModel;
//sets node default value
function nodeDefaults(obj, diagram) {
    obj.style = {
        fill: "#659be5",
        strokeColor: "none",
        color: "white",
        strokeWidth: 2
    };
    obj.borderColor = "#3a6eb5";
    obj.backgroundColor = "#659be5";
    obj.shape.margin = { left: 5, right: 5, bottom: 5, top: 5 };
    obj.expandIcon = {
        height: 10,
        width: 10,
        shape: "None",
        fill: "lightgray",
        offset: { x: 0.5, y: 1 }
    };
    obj.expandIcon.verticalAlignment = "Auto";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.offset = { x: 0.5, y: 1 };
    obj.collapseIcon.verticalAlignment = "Auto";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.height = 10;
    obj.collapseIcon.width = 10;
    obj.collapseIcon.padding.top = 5;
    obj.collapseIcon.shape = "None";
    obj.collapseIcon.fill = "lightgray";
    return obj;
}
//sets connector default value
function connectorDefaults(connector) {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    connector.style.strokeColor = "#6d6d6d";
    connector.constraints = ej2_react_diagrams_1.ConnectorConstraints.None;
    connector.cornerRadius = 5;
    return connector;
}
//update the orientation of the Layout.
function updateLayout(target, orientation) {
    diagramInstance.layout.orientation = orientation;
    diagramInstance.dataBind();
    diagramInstance.doLayout();
    target.classList.add("e-selected-style");
}
// Updates expand and collapse icons of nodes based on args.checked state
function onChange(args) {
    for (var _i = 0, _a = diagramInstance.nodes; _i < _a.length; _i++) {
        var node = _a[_i];
        if (args.checked) {
            node.expandIcon.shape = 'Minus';
            node.collapseIcon.shape = 'Plus';
        }
        else {
            node.expandIcon.shape = 'None';
            node.collapseIcon.shape = 'None';
        }
    }
    diagramInstance.dataBind();
    diagramInstance.doLayout();
}
;
