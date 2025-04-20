"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_data_1 = require("@syncfusion/ej2-data");
ej2_react_diagrams_1.Diagram.Inject(ej2_react_diagrams_1.ConnectorEditing);
var diagramInstance;
var SAMPLE_CSS = "\n  /* Container for diagram and property panel */\n    .control-section {\n        width: 75%;\n        float: left; /* Keep the diagram section on the left */\n         border-right: 1px solid #D5D5D5;\n    }\n    .property-panel-header {\n        font-size: larger;\n        margin-left: 10px;\n    }\n    /* Diagram content style */\n    .content-wrapper {\n        width: 100%;\n        background: white;\n        border: 1px solid #D5D5D5;\n    }\n    .input-element {\n        margin-left: 10px;\n        width: 50%;\n    }\n\n    /* Property panel style */\n    .flow-property-section {\n        width: 24%; /* Adjusted to fill the remaining space */\n        float: right; /* Ensure the property panel is on the right */\n        padding: 10px;\n    }\n\n    /* Align labels and inputs within the property panel */\n    .row {\n        margin-left: 0;\n        margin-right: 0;\n        padding-top: 8px;\n    }\n\n    .property-panel-content .row {\n        display: flex;\n        align-items: center;\n        margin-bottom: 8px;\n    }\n\n    .property-panel-content label {\n        flex: 1;\n        font-weight: normal;\n        margin-left: 10px;\n    }\n\n    .property-panel-content input {\n        flex: 2;\n        padding: 5px;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n    }  \n";
//Initializes the data source for the layout
var flowchartData = [
    { id: "A", name: "Start", shape: "Terminator", color: "#90EE90", parentId: null, stroke: "#333", strokeWidth: 1 },
    { id: "B", name: "Open the browser and go to Amazon site", shape: "Rectangle", color: "#1759B7", parentId: ["A"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "C", name: "Already a customer?", shape: "Decision", color: "#2F95D8", parentId: ["B"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "D", name: "Create an account", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "E", name: "Enter login information", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "F", name: "Search for the book in the search bar", shape: "Predefined Process", color: "#1759B7", parentId: ["E", "D"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "G", name: "Select the preferred book", shape: "Rectangle", color: "#1759B7", parentId: ["F"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "H", name: "Is the book new or used?", shape: "Rectangle", color: "#2F95D8", parentId: ["G"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "I", name: "Select the new book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "J", name: "Select the used book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "K", name: "Add to Cart & Proceed to Checkout", shape: "Rectangle", color: "#1759B7", parentId: ["I", "J"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "L", name: "Enter shipping and payment details", shape: "Rectangle", color: "#1759B7", parentId: ["K", "M"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "M", name: "Is the information correct?", shape: "Decision", color: "#2F95D8", parentId: ["L"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "N", name: "Review and place the order", shape: "Rectangle", color: "#1759B7", parentId: ["M"], label: ["True"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "O", name: "End", shape: "Terminator", color: "#8E44CC", parentId: ["N"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 }
];
function FlowchartLayoutDiagram() {
    // React useEffect hook to run once on component mount
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", null,
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement("div", { className: "content-wrapper", style: { width: '100%', background: 'white' } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '1500px', rulerSettings: { showRulers: true }, getNodeDefaults: getNodeDefaults, getConnectorDefaults: getConnectorDefaults, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, layout: {
                            type: 'Flowchart',
                            orientation: 'TopToBottom',
                            flowchartLayoutSettings: {
                                yesBranchDirection: 'LeftInFlow',
                                noBranchDirection: 'RightInFlow',
                                yesBranchValues: ['Yes', 'True'],
                                noBranchValues: ['No', 'False']
                            },
                            verticalSpacing: 50,
                            horizontalSpacing: 50
                        }, dataSourceSettings: {
                            id: 'id',
                            parentId: 'parentId',
                            dataSource: new ej2_data_1.DataManager(flowchartData)
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.FlowchartLayout, ej2_react_diagrams_1.DataBinding] }))))),
        React.createElement("div", { className: "flow-property-section" },
            React.createElement("div", { className: "property-panel-header", style: { marginLeft: '10px' } }, "Properties"),
            React.createElement("div", { className: "row property-panel-content", style: { paddingTop: '10px' } },
                React.createElement("div", { className: "row" },
                    React.createElement("label", null, "Orientation"),
                    React.createElement("div", { className: "input-element" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "orientation", index: 0, change: orientationChange, dataSource: [{ text: 'Top to bottom', value: 'TopToBottom' }, { text: 'Left to right', value: 'LeftToRight' }] }))),
                React.createElement("div", { className: "row" },
                    React.createElement("label", null, "Yes branch direction"),
                    React.createElement("div", { className: "input-element" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "yesBranchDirection", index: 0, change: yesBranchDirectionChange, dataSource: [{ text: 'Left in flow', value: 'LeftInFlow' }, { text: 'Right in flow', value: 'RightInFlow' }, { text: 'Same as flow', value: 'SameAsFlow' }] }))),
                React.createElement("div", { className: "row" },
                    React.createElement("label", null, "No branch direction"),
                    React.createElement("div", { className: "input-element" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "noBranchDirection", index: 1, change: noBranchDirectionChange, dataSource: [{ text: 'Left in flow', value: 'LeftInFlow' }, { text: 'Right in flow', value: 'RightInFlow' }, { text: 'Same as flow', value: 'SameAsFlow' }] }))),
                React.createElement("div", { className: "row" },
                    React.createElement("label", null, "Horizontal spacing"),
                    React.createElement("div", { className: "input-element" },
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "horizontalSpacing", change: horizontalSpacingChange, min: 20, max: 120, value: 50, format: '###.##' }))),
                React.createElement("div", { className: "row" },
                    React.createElement("label", null, "Vertical spacing"),
                    React.createElement("div", { className: "input-element" },
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "verticalSpacing", change: verticalSpacingChange, min: 30, max: 120, value: 50, format: '###.##' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates the flow chart layout algorithm that is used to automatically arrange the flow chart shapes.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample illustrates the flowchart layout algorithm that is used to automatically arrange the flow shapes."),
            React.createElement("p", null,
                "This example shows how to generate a flowchart layout from an external data source. The spacing between the objects can also be customized in the chart. The",
                React.createElement("code", null, "horizontalSpacing"),
                " and",
                React.createElement("code", null, "verticalSpacing"),
                " properties of",
                React.createElement("code", null, "layout"),
                " can be used to customize the space between objects in a tree. The",
                React.createElement("code", null, "orientation"),
                " property of",
                React.createElement("code", null, "layout"),
                " can be used to change the orientation of the chart. The",
                React.createElement("code", null, "flowchartLayoutSettings"),
                " property of",
                React.createElement("code", null, "layout"),
                " can be used to configure the flow chart layout settings. The",
                React.createElement("code", null, "yesBranchDirection"),
                " and ",
                React.createElement("code", null, "noBranchDirection"),
                " properties of the flowchartLayoutSettings is used to define the flow direction of the yes and no branch connectors."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject",
                React.createElement("code", null, "DataBinding"),
                " module using",
                React.createElement("code", null, "Diagram.Inject(DataBinding)"),
                " method. To automatically arrange the objects in a flowchart layout format, inject",
                React.createElement("code", null, "FlowchartLayout"),
                " module using",
                React.createElement("code", null, "Diagram.Inject(FlowchartLayout)"),
                " method."))));
}
exports.default = FlowchartLayoutDiagram;
function getNodeDefaults(node) {
    node.width = 150;
    node.height = 50;
    if (node.shape.shape === 'Decision') {
        node.width = 120;
        node.height = 100;
    }
    return node;
}
//Setting default connector values
function getConnectorDefaults(connector) {
    connector.type = 'Orthogonal';
    if (connector.annotations && connector.annotations.length > 0) {
        connector.annotations[0].style.fill = 'white';
        connector.annotations[0].style.color = 'black';
    }
    return connector;
}
function orientationChange(args) {
    var value = args.value;
    diagramInstance.layout.orientation = value === 'Top to bottom' ? 'TopToBottom' : 'LeftToRight';
    diagramInstance.dataBind();
}
function yesBranchDirectionChange(args) {
    var value = args.value;
    diagramInstance.layout.flowchartLayoutSettings.yesBranchDirection = value === 'Same as flow' ? 'SameAsFlow' : value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
    diagramInstance.doLayout();
}
function noBranchDirectionChange(args) {
    var value = args.value;
    diagramInstance.layout.flowchartLayoutSettings.noBranchDirection = value === 'Same as flow' ? 'SameAsFlow' : value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
    diagramInstance.doLayout();
}
function horizontalSpacingChange(args) {
    var value = args.value;
    diagramInstance.layout.horizontalSpacing = value;
    diagramInstance.dataBind();
}
function verticalSpacingChange(args) {
    var value = args.value;
    diagramInstance.layout.verticalSpacing = value;
    diagramInstance.dataBind();
}
