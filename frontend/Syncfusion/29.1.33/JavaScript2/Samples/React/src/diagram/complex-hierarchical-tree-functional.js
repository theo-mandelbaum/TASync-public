"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var diagram_data_1 = require("./diagram-data");
var SAMPLE_CSS = "\n/* For orientation and subtree alignment in property panel*/\n.image-pattern-style {\n    background-color: white;\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 50px;\n    width: calc((100% - 18px) / 3);\n    cursor: pointer;\n    border: 1px solid #D5D5D5;\n    background-position: center;\n    float: left;\n}\n\n.image-pattern-style:hover {\n  border-color: gray;\n  border-width: 2px;\n}\n\n.row {\n    margin-left: 0px;\n    margin-right: 0px;\n}\n\n.row-header {\n    font-size: 15px;\n    font-weight: 500;\n}\n\n.e-selected-style {\n    border-color: #006CE6;\n    border-width: 2px;\n}\n\n.e-checkbox-wrapper .e-label {\n    font-size: 12px;\n}\n\n.diagram-control-pane .col-xs-6 {\n    padding-left: 0px;\n    padding-right: 0px;\n}";
var diagramInstance;
var propertyPanelInstance;
function ComplexHierarchicalModel() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    // Function to lock or unlock connector overlapping
    function lockConnectorOverlapping(args) {
        diagramInstance.layout.connectionPointOrigin = args.checked
            ? ej2_react_diagrams_1.ConnectionPointOrigin.DifferentPoint
            : ej2_react_diagrams_1.ConnectionPointOrigin.SamePoint;
    }
    function rendereComplete() {
        // Fit the diagram to the available space
        diagramInstance.fitToPage();
        // Handle clicks on the property panel layout buttons
        propertyPanelInstance.onclick = function (args) {
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
    }
    function getNodeDefaults(node) {
        node.width = 40;
        node.height = 40;
        node.shape = {
            type: "Basic",
            shape: "Rectangle",
            cornerRadius: 7
        };
    }
    function getConnectorDefaults(connector) {
        connector.type = "Orthogonal";
        connector.cornerRadius = 7;
        connector.targetDecorator.height = 7;
        connector.targetDecorator.width = 7;
        connector.style.strokeColor = "#6d6d6d";
    }
    // Apply the orientation for multiple parent layout.
    function updateLayout(target, orientation) {
        diagramInstance.layout.orientation = orientation;
        diagramInstance.dataBind();
        diagramInstance.doLayout();
        target.classList.add("e-selected-style");
    }
    // Function to update the layout margins and spacing
    function updateLayoutProperty(property, value) {
        switch (property) {
            case "marginLeft":
                diagramInstance.layout.margin.left = value;
                break;
            case "marginTop":
                diagramInstance.layout.verticalAlignment = 'Top';
                diagramInstance.layout.margin.top = value;
                break;
            case "horizontalSpacing":
                diagramInstance.layout.horizontalSpacing = value;
                break;
            case "verticalSpacing":
                diagramInstance.layout.verticalSpacing = value;
                break;
        }
        diagramInstance.dataBind();
    }
    return (React.createElement("div", { className: "control-pane diagram-control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: 580, 
                    //Configrues hierarchical tree layout
                    layout: {
                        type: "ComplexHierarchicalTree",
                        connectionPointOrigin: ej2_react_diagrams_1.ConnectionPointOrigin.DifferentPoint,
                        horizontalSpacing: 40,
                        verticalSpacing: 40,
                        orientation: "TopToBottom",
                        margin: { left: 10, right: 0, top: 50, bottom: 0 }
                    }, getNodeDefaults: getNodeDefaults, getConnectorDefaults: getConnectorDefaults, dataSourceSettings: {
                        id: "Name",
                        parentId: "ReportingPerson",
                        dataSource: new ej2_data_1.DataManager(diagram_data_1.multiParentData),
                        doBinding: function (nodeModel, data, diagram) {
                            //Configures data source
                            //binds the external data with node
                            /* tslint:disable:no-string-literal */
                            nodeModel.style = {
                                fill: data["fillColor"],
                                strokeWidth: 1,
                                strokeColor: data["border"]
                            };
                        }
                    }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan //Disables all interactions except zoom/pan
                    , snapSettings: { constraints: 0 } },
                    React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.ComplexHierarchicalTree, ej2_react_diagrams_1.LineDistribution] })))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement("div", { className: "property-panel-header" }, "Layout Settings"),
            React.createElement("div", { className: "row property-panel-content", id: "appearance", ref: function (appearance) { return (propertyPanelInstance = appearance); }, style: { paddingTop: "10px" } },
                React.createElement("div", { className: "row row-header" }, "Orientation"),
                React.createElement("div", { className: "row", style: { paddingTop: "8px" } }, ["toptobottom", "bottomtotop", "lefttoright"].map(function (id, index) { return (React.createElement("div", { className: "image-pattern-style".concat(index === 0 ? " e-selected-style" : ""), id: id, style: {
                        backgroundImage: "url('src/diagram/Images/common-orientation/".concat(id, ".png')"),
                        marginRight: "3px",
                    } })); })),
                React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                    React.createElement("div", { className: "image-pattern-style", id: "righttoleft", style: {
                            backgroundImage: "url('src/diagram/Images/common-orientation/righttoleft.png')",
                            marginRight: "3px"
                        } }))),
            React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                React.createElement("div", { className: "row row-header" }, "Behaviour"),
                [
                    { id: "marginLeft", label: "Margin X", value: 10, min: 10, max: 120 },
                    { id: "marginTop", label: "Margin Y", value: 50, min: 10, max: 120 },
                    { id: "horizontalSpacing", label: "Horizontal Spacing", value: 40, min: 20, max: 60 },
                    { id: "verticalSpacing", label: "Vertical Spacing", value: 40, min: 20, max: 60 },
                ].map(function (_a) {
                    var id = _a.id, label = _a.label, value = _a.value, min = _a.min, max = _a.max;
                    return (React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-5" },
                            React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, label)),
                        React.createElement("div", { className: "col-xs-7" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: id, value: value, min: min, max: max, step: 1, format: "##.##", change: function (args) {
                                    updateLayoutProperty(id, args.value);
                                } }))));
                }),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: "Prevent Connector Overlapping", id: "lock", change: lockConnectorOverlapping.bind(this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates a complex hierarchical template that is built from an external data source using complex hierarchical tree algorithm.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to generate a complex hierarchical tree from external data sources. You can also customize spacing between the objects in the tree. You can use the",
                React.createElement("code", null, "horizontalSpacing"),
                " and ",
                React.createElement("code", null, "verticalSpacing"),
                " ",
                "properties of ",
                React.createElement("code", null, "layout"),
                " to customize the space between the objects in the tree. You can use the ",
                React.createElement("code", null, "layoutOrientation"),
                " ",
                "property of",
                React.createElement("code", null, "layout"),
                " to change the orientation of the tree."),
            React.createElement("p", null, "To change the orientation of the tree, click the templates in the property panel."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Diagram component's features are segregated into individual feature-wise modules. To generate diagrams from an external data source, we need to Inject ",
                React.createElement("code", null, "DataBinding"),
                " module into",
                " ",
                React.createElement("code", null, "services"),
                ". To automatically arrange the objects in a hierarchical structure, we need to Inject",
                " ",
                React.createElement("code", null, "ComplexHierarchicalTree"),
                " module into",
                " ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("br", null))));
}
exports.default = ComplexHierarchicalModel;
