// Import React and necessary components from Syncfusion's EJ2 React Diagrams library to build diagrams.
import * as React from "react";
import { HierarchicalTree, StackPanel, ImageElement, TextElement, SnapConstraints, DiagramComponent, Inject, DataBinding, DiagramTools, UndoRedo } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { data } from './overview-data';
import { ItemDirective, ItemsDirective, ToolbarComponent, } from '@syncfusion/ej2-react-navigations';
// Holds instances of DiagramComponent and ToolbarComponent.
let diagramInstance;
let toolbarEditor;
export class ZoomAndPan extends SampleBase {
    render() {
        return (<div className="control-pane">
                <div className="col-lg-12 control-section">
                    <div className="content-wrapper" style={{ width: "100%" }}>
                        <div>

                            {/* Toolbar items */}
                            <ToolbarComponent ref={(toolbar) => (toolbarEditor = toolbar)} id="toolbar_diagram" clicked={handleToolbarClick}>
                                <ItemsDirective>

                                    {/* Zoom In icon */}
                                    <ItemDirective id='ZoomIn' prefixIcon="e-icons e-zoom-in" tooltipText="Zoom In"/>
                                    {/* Zoom Out icon */}
                                    <ItemDirective id='ZoomOut' prefixIcon="e-icons e-zoom-out" tooltipText="Zoom Out"/>
                                    <ItemDirective id='Separator1' type="Separator"/>

                                    {/* Select icon */}
                                    <ItemDirective id='Select' prefixIcon="e-icons e-mouse-pointer" tooltipText="Select"/>
                                    {/* Pan Tool icon */}
                                    <ItemDirective id='PanTool' prefixIcon="e-icons e-pan" tooltipText="Pan Tool"/>
                                    <ItemDirective id='Separator2' type="Separator"/>

                                    {/* reset icon */}
                                    <ItemDirective id='Reset' prefixIcon="e-icons e-reset" tooltipText="Reset"/>

                                    {/* Fit To Page icon */}
                                    <ItemDirective id='FitToPage' prefixIcon="e-icons e-zoom-to-fit" tooltipText="Fit To Page"/>
                                    <ItemDirective id='Separator3' type="Separator"/>

                                    {/* Bring Into View icon */}
                                    <ItemDirective id='BringIntoView' prefixIcon="e-icons e-bring-to-view" tooltipText="Bring Into View" disabled={true}/>
                                    {/* Bring Into Center icon */}
                                    <ItemDirective id='BringIntoCenter' prefixIcon="e-icons e-bring-to-center" tooltipText="Bring Into Center" disabled={true}/>
                                </ItemsDirective>
                            </ToolbarComponent>
                        </div>
                        <div>

                            {/* Initialize a Diagram component */}
                            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"590px"} scrollSettings={{ scrollLimit: "Infinity" }} //Sets the constraints of the SnapSettings
         snapSettings={{ constraints: SnapConstraints.None }} //Configrues organizational chart layout
         
        //Configrues hierarchical tree layout
        layout={{
                type: "OrganizationalChart",
                margin: { top: 20 },
                getLayoutInfo: (node, tree) => {
                    if (!tree.hasSubTree) {
                        tree.orientation = "Vertical";
                        tree.type = "Right";
                    }
                }
            }} 
        //selectionChange method to disable toolbar items 
        selectionChange={(args) => {
                if (args.state === 'Changed') {
                    let selectedItems = diagramInstance.selectedItems.nodes;
                    // Disables toolbar items if no nodes are selected
                    if (selectedItems.length === 0) {
                        toolbarEditor.items.find(item => item.id === 'BringIntoView').disabled = true;
                        toolbarEditor.items.find(item => item.id === 'BringIntoCenter').disabled = true;
                    }
                    // Enables toolbar items if node is selected
                    if (selectedItems.length > 0) {
                        toolbarEditor.items.find(item => item.id === 'BringIntoView').disabled = false;
                        toolbarEditor.items.find(item => item.id === 'BringIntoCenter').disabled = false;
                    }
                }
            }} 
        //Sets the parent and child relationship of DataSource.
        dataSourceSettings={{
                id: "Id",
                parentId: "ReportingPerson",
                dataSource: new DataManager(data)
            }} 
        //Sets the default values of Node
        getNodeDefaults={(node) => {
                node.height = 50;
                node.style = { fill: "transparent", strokeWidth: 2 };
                return node;
            }} 
        //Sets the default values of connector
        getConnectorDefaults={(connector) => {
                connector.targetDecorator.shape = "None";
                connector.type = "Orthogonal";
                return connector;
            }} 
        //customization of the node.
        setNodeTemplate={(node) => {
                return setNodeTemplate(node);
            }}>
                                <Inject services={[DataBinding, HierarchicalTree, UndoRedo]}/>
                            </DiagramComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates how to zoom and pan in the diagram.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This example explains zooming, panning, reset, fit to page, bring into view, and bring to center.
                    </p>
                    <p>
                        The <code>fitToPage</code> method adjusts the zoom level of a diagram so that all its content is visible within the viewport.
                    </p>
                    <p>
                        The <code>bringIntoView</code> method brings the specified rectangular or bounds region into the diagram viewport.
                    </p>
                    <p>
                        The <code>bringToCenter</code> method brings the specified rectangular region of the diagram content to the center of the viewport. You can zoom in and out using the zoom method, and reset the zoom and scroller offsets to default values using the reset zoom method.
                    </p>
                    <p>
                        In this sample,  use <code>pan</code>, <code>reset</code>, <code>zoomIn</code>, and <code>ZoomOut</code> options to pan, reset the zoom and zoomin/out the diagram.
                    </p>
                    <br />
                </div>
            </div>);
    }
}
//Funtion to add the Template of the Node.
function setNodeTemplate(node) {
    // Create an outer content to contain image and text elements
    let content = new StackPanel();
    content.id = node.id + "_outerstack";
    content.orientation = "Horizontal";
    content.style.strokeColor = "gray";
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
    // Create an image element to display employee image
    let image = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = "none";
    image.source = node.data.ImageUrl;
    image.id = node.id + "_pic";
    // Create an inner stack panel to organize text elements
    let innerStack = new StackPanel();
    innerStack.style.strokeColor = "none";
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = node.id + "_innerstack";
    // Create a text element for displaying employee name
    let text = new TextElement();
    text.content = node.data.Name;
    text.style.color = "black";
    text.style.bold = true;
    text.style.strokeColor = "none";
    text.style.fill = "none";
    text.id = node.id + "_text1";
    // Create a TextElement for the node's designation
    let desigText = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = node.data.Designation;
    desigText.style.color = "black";
    desigText.style.strokeColor = "none";
    desigText.style.fill = "none";
    desigText.style.textWrapping = "Wrap";
    desigText.id = node.id + "_desig";
    // Add text elements to the inner StackPanel
    innerStack.children = [text, desigText];
    // Add image element and inner StackPanel to the outer content
    content.children = [image, innerStack];
    return content;
}
// Handles toolbar item clicks to perform zoom, pan, and other actions.
function handleToolbarClick(args) {
    const zoomFactor = 0.2;
    switch (args.item.tooltipText) {
        // Zoom in action
        case 'Zoom In':
            diagramInstance.zoomTo({ type: 'ZoomIn', zoomFactor });
            break;
        // Zoom Out action
        case 'Zoom Out':
            diagramInstance.zoomTo({ type: 'ZoomOut', zoomFactor });
            break;
        // Selection action
        case 'Select':
            diagramInstance.clearSelection();
            diagramInstance.drawingObject = {};
            diagramInstance.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
            break;
        // Pan tool action
        case 'Pan Tool':
            diagramInstance.tool = DiagramTools.ZoomPan;
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
                let bounds = diagramInstance.selectedItems.nodes[0].wrapper.bounds;
                diagramInstance.bringIntoView(bounds);
            }
            break;
        // Bring selected node into center action
        case 'Bring Into Center':
            if (diagramInstance.selectedItems.nodes.length > 0) {
                let bounds = diagramInstance.selectedItems.nodes[0].wrapper.bounds;
                diagramInstance.bringToCenter(bounds);
            }
            break;
    }
}
