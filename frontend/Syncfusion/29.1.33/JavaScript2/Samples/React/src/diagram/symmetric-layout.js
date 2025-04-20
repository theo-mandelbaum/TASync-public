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
exports.SymmetricLayout = void 0;
// Import React and necessary components from Syncfusion's EJ2 React Diagrams library to build Symmetric Layout diagrams.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var diagram_data_1 = require("./diagram-data");
// Holds instances of DiagramComponent and NumericTextBoxComponent.
var diagramInstance;
var springLength;
var springFactor;
var maxIteration;
var SymmetricLayout = /** @class */ (function (_super) {
    __extends(SymmetricLayout, _super);
    function SymmetricLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SymmetricLayout.prototype.renderComplete = function () {
        // Applies layout changes based on user input.
        document.getElementById("refresh").onclick = function () {
            diagramInstance.layout.springLength = springLength.value;
            diagramInstance.layout.springFactor = springFactor.value;
            diagramInstance.layout.maxIteration = maxIteration.value;
            diagramInstance.doLayout();
        };
    };
    // Renders the diagram and property panel UI components.
    SymmetricLayout.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "550px", layout: {
                            type: "SymmetricalLayout",
                            springLength: 80,
                            springFactor: 0.8,
                            maxIteration: 500,
                            margin: { left: 20, top: 20 }
                        }, 
                        // Setting up the data source for the diagram
                        dataSourceSettings: {
                            id: "Id",
                            parentId: "Source",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.data)
                        }, 
                        // Configuring snap settings for the diagram
                        snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                        // Setting up the default values for the Node
                        getNodeDefaults: function (node) {
                            node.height = 20;
                            node.width = 20;
                            node.style = { fill: "transparent", strokeWidth: 2 };
                            return node;
                        }, 
                        // Setting up the default values for the connector
                        getConnectorDefaults: function (connector) {
                            connector.targetDecorator.shape = "None";
                            connector.type = "Straight";
                            return connector;
                        }, setNodeTemplate: function (node) { setNodeTemplate(node); }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.SymmetricLayout] })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("table", { id: "property" },
                    [
                        { label: 'Spring Length', id: 'springLength', format: '###.##', min: 1, value: 90, step: 1 },
                        { label: 'Spring Factor', id: 'springFactor', format: '###.##', min: 0, max: 3.5, value: 0.8, step: 0.1 },
                        { label: 'Maximum Iteration', id: 'maxIteration', format: '###.##', min: 0, value: 500, step: 1 },
                    ].map(function (property) { return (React.createElement("tr", { style: { height: '40px' } },
                        React.createElement("td", { style: { width: '30%' } }, property.label),
                        React.createElement("td", { style: { width: '60%' } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: property.id, ref: function (refObject) {
                                    if (property.id === 'springLength')
                                        springLength = refObject;
                                    else if (property.id === 'springFactor')
                                        springFactor = refObject;
                                    else if (property.id === 'maxIteration')
                                        maxIteration = refObject;
                                }, format: property.format, value: property.value, step: property.step, max: property.max, min: property.min })))); }),
                    React.createElement("tr", { style: { height: '40px' } },
                        React.createElement("td", { style: { width: "50%" } }),
                        React.createElement("td", { style: { width: "50%" } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "refresh" }, "Refresh"))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes a simple network template using symmetrical layout algorithm.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This view is well suited for large networks and is commonly used in network component diagrams. It is typically used with simple straight line links. This example shows how to arrange nodes in a symmetrical structure. The",
                    React.createElement("code", null, "layout"),
                    " property of the diagram can be used to enable it."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a symmetrical structure, inject ",
                    React.createElement("code", null, "SymmetricalLayout"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return SymmetricLayout;
}(sample_base_1.SampleBase));
exports.SymmetricLayout = SymmetricLayout;
// Sets the template for nodes based on their type.
function setNodeTemplate(node) {
    var basicShape = { type: "Basic", shape: "Ellipse" };
    if (!node.data.Type || node.data.Type === "Server") {
        node.width = 30;
        node.height = 30;
        node.shape = {
            type: "Native",
            content: '<svg width="50" height="65"><g id="Server2_shape" fill="transparent" stroke="transparent" strokeWidth="1"' +
                ' opacity="1" stroke-dasharray="" transform="translate(-15.517241379310343,-2.6329421835819375),' +
                'scale(1.7241379310344827,1.3774530437803194)" width="50" height="65"><g><g xmlns="http://www.w3.org/2000/svg">' +
                '<polygon fill="#DBD5DA" points="37.3,7.3 19.4,17.8 9.8,12.1 9.2,12.9 19,18.7 19,49 20,49 20,18.5 37.8,8.1  ">' +
                '</polygon>    <polygon fill="#E5DCE1" points="36.3,7.8 28.2,2.6 10.5,12.5 19.5,17.8  "></polygon> <polygon' +
                ' fill="#BBB5B9" points="20,18.5 37,8.6 36.9,38.4 20,47.9  "></polygon> <polygon fill="#DBD2D7" ' +
                'points="10,13.4 19,18.7 19,48.2 10,42.7  "></polygon>    <path fill="#656666" d="M19.2,49.1c-0.5,' +
                "0-0.9-0.1-1.3-0.4L10.2,44C9.4,43.5,9,42.7,9,41.8V13.6c0-0.9,0.5-1.7,1.3-2.2l16.7-9.2   c0.8-0.4,1.8-0.4," +
                "2.5,0.1L36.8,7C37.6,7.5,38,8.2,38,9.1l-0.1,28.4c0,0.9-0.5,1.7-1.3,2.2l-16.2,9.1C20.1,49,19.6,49.1,19.2,49.1z " +
                "M28.1,2.9c-0.3,0-0.5,0.1-0.7,0.2l-16.6,9.2c-0.5,0.3-0.8,0.8-0.8,1.3v28.2c0,0.5,0.3,1,0.7,1.3l7.7,4.8c0.5,0.3," +
                '1.1,0.3,1.5,0  l16.2-9.1c0.5-0.3,0.8-0.8,0.8-1.3L37,9.1c0-0.5-0.3-1-0.7-1.3L29,3.2C28.7,3,28.4,2.9,28.1,2.9z">' +
                '</path><ellipse fill="#656666"  cx="14.3" cy="40.2" rx="0.6" ry="1.1"></ellipse> <polygon fill="#656666" ' +
                'points="10.9,22.6 10.9,22.6 10.9,22.6  "></polygon> <polygon fill="#656666" class="st4ed" points="11.9,' +
                '22 11.9,23.2 16.7,26 16.7,24.9 "></polygon><polygon fill="#656666" points="10.9,18.9 10.9,18.9 10.9,18.9"></polygon>' +
                '<polygon fill="#656666" points="11.9,18.4 11.9,19.5 16.7,22.4 16.7,21.2  "></polygon></g></g></g></svg>'
        };
    }
    else {
        node.shape = basicShape;
        node.style = { fill: "orange" };
    }
}
