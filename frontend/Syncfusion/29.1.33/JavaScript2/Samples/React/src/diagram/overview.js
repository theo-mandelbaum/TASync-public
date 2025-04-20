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
exports.Overview = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var overview_data_1 = require("./overview-data");
var diagramInstance;
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Overview.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "590px", tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, scrollSettings: { scrollLimit: "Infinity" }, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                        //Configrues organizational chart layout
                        layout: {
                            type: "OrganizationalChart",
                            margin: { top: 20 },
                            getLayoutInfo: getLayoutInfo
                        }, 
                        //Sets the parent and child relationship of DataSource.
                        dataSourceSettings: {
                            id: "Id",
                            parentId: "ReportingPerson",
                            dataSource: new ej2_data_1.DataManager(overview_data_1.data)
                        }, getNodeDefaults: getNodeDefaults, getConnectorDefaults: getConnectorDefaults, setNodeTemplate: setNodeTemplate },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] })))),
            React.createElement("div", { className: "col-lg-4", style: {
                    width: "50%",
                    padding: "0px",
                    right: "30px",
                    bottom: "20px",
                    border: "#eeeeee",
                    borderStyle: "solid",
                    boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
                    background: "#f7f7f7",
                    position: "absolute"
                } },
                React.createElement(ej2_react_diagrams_1.OverviewComponent, { id: "overview", style: { top: "30px" }, sourceID: "diagram", width: "100%", height: "150px" })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes an organizational structure along with an overview for easily navigating the large organizational structure using Overview control.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to render the overview control and how to display a preview (overall view) of the entire content of a diagram. This helps you look at the overall picture of a large diagram and also to navigate (pan or zoom) to a particular position of the page. The ",
                    React.createElement("code", null, "sourceID"),
                    " property can be used to map the diagram control with overview."),
                React.createElement("br", null))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
// Function to determine layout info
function getLayoutInfo(node, tree) {
    if (!tree.hasSubTree) {
        tree.orientation = "Vertical";
        tree.type = "Right";
    }
}
// Function to set default values for nodes
function getNodeDefaults(obj, diagram) {
    obj.height = 50;
    obj.style = { fill: "transparent", strokeWidth: 2 };
    return obj;
}
// Function to set default values for connectors
function getConnectorDefaults(connector, diagram) {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    return connector;
}
// Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
    // Create the outer container for the node content.
    var content = new ej2_react_diagrams_1.StackPanel();
    content.id = obj.id + "_outerstack";
    content.orientation = "Horizontal";
    content.style.strokeColor = "gray";
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
    // Create an image element for the employee picture.
    var image = new ej2_react_diagrams_1.ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = "none";
    image.source = obj.data.ImageUrl;
    image.id = obj.id + "_pic";
    // Create an inner stack panel for text elements (name and designation).
    var innerStack = new ej2_react_diagrams_1.StackPanel();
    innerStack.style.strokeColor = "none";
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + "_innerstack";
    // Create a text element for the employee name
    var text = new ej2_react_diagrams_1.TextElement();
    text.content = obj.data.Name;
    text.style.color = "black";
    text.style.bold = true;
    text.style.strokeColor = "none";
    text.style.fill = "none";
    text.id = obj.id + "_text1";
    // Create a text element for the employee designation.
    var desigText = new ej2_react_diagrams_1.TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = obj.data.Designation;
    desigText.style.color = "black";
    desigText.style.strokeColor = "none";
    desigText.style.fill = "none";
    desigText.style.textWrapping = "Wrap";
    desigText.id = obj.id + "_desig";
    innerStack.children = [text, desigText];
    content.children = [image, innerStack];
    return content;
}
