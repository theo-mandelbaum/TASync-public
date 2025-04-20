"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import React and necessary components from Syncfusion's EJ2 React Diagrams library to build diagrams.
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ej2_data_1 = require("@syncfusion/ej2-data");
var overview_data_1 = require("./overview-data");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
// Holds instances of DiagramComponent and ToolbarComponent.
var diagramInstance;
var toolbarEditor;
// Main function component for Zoom and Pan functionality.
function ZoomAndPan() {
    React.useEffect(function () {
        // Call functions to update sample section 
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Funtion to add the Template of the Node.
    function setNodeTemplate(obj) {
        var content = new ej2_react_diagrams_1.StackPanel();
        // Create an outer content to contain image and text elements
        content.id = obj.id + "_outerstack";
        content.orientation = "Horizontal";
        content.style.strokeColor = "gray";
        content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
        // Create an image element to display employee image
        var image = new ej2_react_diagrams_1.ImageElement();
        image.width = 50;
        image.height = 50;
        image.style.strokeColor = "none";
        image.source = obj.data.ImageUrl;
        image.id = obj.id + "_pic";
        // Create an inner stack panel to organize text elements
        var innerStack = new ej2_react_diagrams_1.StackPanel();
        innerStack.style.strokeColor = "none";
        innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
        innerStack.id = obj.id + "_innerstack";
        // Create a text element for displaying employee name
        var text = new ej2_react_diagrams_1.TextElement();
        text.content = obj.data.Name;
        text.style.color = "black";
        text.style.bold = true;
        text.style.strokeColor = "none";
        text.style.fill = "none";
        text.id = obj.id + "_text1";
        // Create a TextElement for the node's designation
        var desigText = new ej2_react_diagrams_1.TextElement();
        desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
        desigText.content = obj.data.Designation;
        desigText.style.color = "black";
        desigText.style.strokeColor = "none";
        desigText.style.fill = "none";
        desigText.style.textWrapping = "Wrap";
        desigText.id = obj.id + "_desig";
        // Add text elements to the inner StackPanel
        innerStack.children = [text, desigText];
        // Add image element and inner StackPanel to the outer content
        content.children = [image, innerStack];
        return content;
    }
    // Handles toolbar item clicks to perform zoom, pan, and other actions.
    function handleToolbarClick(args) {
        var zoomFactor = 0.2;
        switch (args.item.tooltipText) {
            // Zoom in action
            case 'Zoom In':
                diagramInstance.zoomTo({ type: 'ZoomIn', zoomFactor: zoomFactor });
                break;
            // Zoom Out action
            case 'Zoom Out':
                diagramInstance.zoomTo({ type: 'ZoomOut', zoomFactor: zoomFactor });
                break;
            // Selection action
            case 'Select':
                diagramInstance.clearSelection();
                diagramInstance.drawingObject = {};
                diagramInstance.tool = ej2_react_diagrams_1.DiagramTools.SingleSelect | ej2_react_diagrams_1.DiagramTools.MultipleSelect;
                break;
            // Pan tool action
            case 'Pan Tool':
                diagramInstance.tool = ej2_react_diagrams_1.DiagramTools.ZoomPan;
                break;
            // Reset action
            case 'Reset':
                diagramInstance.reset();
                break;
            // Fit to page action
            case 'Fit To Page':
                diagramInstance.fitToPage();
                break;
            // Bring selected node into view action
            case 'Bring Into View':
                if (diagramInstance.selectedItems.nodes.length > 0) {
                    var bounds = diagramInstance.selectedItems.nodes[0].wrapper.bounds;
                    diagramInstance.bringIntoView(bounds);
                }
                break;
            // Bring selected node into center action
            case 'Bring Into Center':
                if (diagramInstance.selectedItems.nodes.length > 0) {
                    var bounds = diagramInstance.selectedItems.nodes[0].wrapper.bounds;
                    diagramInstance.bringToCenter(bounds);
                }
                break;
        }
    }
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                React.createElement("div", null,
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (toolbar) { return (toolbarEditor = toolbar); }, id: "toolbar_diagram", clicked: handleToolbarClick },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'ZoomIn', prefixIcon: "e-icons e-zoom-in", tooltipText: "Zoom In" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'ZoomOut', prefixIcon: "e-icons e-zoom-out", tooltipText: "Zoom Out" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'Separator1', type: "Separator" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'Select', prefixIcon: "e-icons e-mouse-pointer", tooltipText: "Select" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'PanTool', prefixIcon: "e-icons e-pan", tooltipText: "Pan Tool" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'Separator2', type: "Separator" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'Reset', prefixIcon: "e-icons e-reset", tooltipText: "Reset" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'FitToPage', prefixIcon: "e-icons e-zoom-to-fit", tooltipText: "Fit To Page" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'Separator3', type: "Separator" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'BringIntoView', prefixIcon: "e-icons e-bring-to-view", tooltipText: "Bring Into View", disabled: true }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'BringIntoCenter', prefixIcon: "e-icons e-bring-to-center", tooltipText: "Bring Into Center", disabled: true })))),
                React.createElement("div", null,
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "590px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, 
                        //Configrues hierarchical tree layout
                        layout: {
                            type: "OrganizationalChart",
                            margin: { top: 20 },
                            getLayoutInfo: function (node, tree) {
                                if (!tree.hasSubTree) {
                                    tree.orientation = "Vertical";
                                    tree.type = "Right";
                                }
                            }
                        }, 
                        //selectionChange method to disable toolbar items 
                        selectionChange: function (args) {
                            if (args.state === 'Changed') {
                                var selectedItems = diagramInstance.selectedItems.nodes;
                                // Disables toolbar items if no nodes are selected
                                if (selectedItems.length === 0) {
                                    toolbarEditor.items.find(function (item) { return item.id === 'BringIntoView'; }).disabled = true;
                                    toolbarEditor.items.find(function (item) { return item.id === 'BringIntoCenter'; }).disabled = true;
                                }
                                // Enables toolbar items if node is selected
                                if (selectedItems.length > 0) {
                                    toolbarEditor.items.find(function (item) { return item.id === 'BringIntoView'; }).disabled = false;
                                    toolbarEditor.items.find(function (item) { return item.id === 'BringIntoCenter'; }).disabled = false;
                                }
                            }
                        }, 
                        //Sets the parent and child relationship of DataSource.
                        dataSourceSettings: {
                            id: "Id",
                            parentId: "ReportingPerson",
                            dataSource: new ej2_data_1.DataManager(overview_data_1.data)
                        }, 
                        //Sets the default values of Node
                        getNodeDefaults: function (node) {
                            node.height = 50;
                            node.style = { fill: "transparent", strokeWidth: 2 };
                            return node;
                        }, 
                        //Sets the default values of connector
                        getConnectorDefaults: function (connector) {
                            connector.targetDecorator.shape = "None";
                            connector.type = "Orthogonal";
                            return connector;
                        }, 
                        //customization of the node.
                        setNodeTemplate: function (node) {
                            return setNodeTemplate(node);
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree, ej2_react_diagrams_1.UndoRedo] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates how to zoom and pan in the diagram.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This example explains zooming, panning, reset, fit to page, bring into view, and bring to center."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "fitToPage"),
                " method adjusts the zoom level of a diagram so that all its content is visible within the viewport."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "bringIntoView"),
                " method brings the specified rectangular or bounds region into the diagram viewport."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "bringToCenter"),
                " method brings the specified rectangular region of the diagram content to the center of the viewport. You can zoom in and out using the zoom method, and reset the zoom and scroller offsets to default values using the reset zoom method."),
            React.createElement("p", null,
                "In this sample,  use ",
                React.createElement("code", null, "pan"),
                ", ",
                React.createElement("code", null, "reset"),
                ", ",
                React.createElement("code", null, "zoomIn"),
                ", and ",
                React.createElement("code", null, "ZoomOut"),
                " options to pan, reset the zoom and zoomin/out the diagram."),
            React.createElement("br", null))));
}
exports.default = ZoomAndPan;
