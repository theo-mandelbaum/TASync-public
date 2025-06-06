// Import necessary React and Syncfusion components
import * as React from "react";
import { DiagramComponent, Node, Diagram, ConnectorConstraints, SnapConstraints, SelectorConstraints, PortConstraints, PortVisibility, ConnectorEditing, DiagramContextMenu, Inject, Snapping, UndoRedo, } from '@syncfusion/ej2-react-diagrams';
import { updateSampleSection } from "../common/sample-base";
import { RadioButtonComponent, CheckBoxComponent, } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, ColorPickerComponent, } from '@syncfusion/ej2-react-inputs';
// Inject necessary diagram modules for snapping and editing features
Diagram.Inject(Snapping, ConnectorEditing);
Diagram.Inject(UndoRedo);
// Declaration of global variables for diagram instance and UI components
let diagramInstance;
let checkboxObj;
let snapToObj;
let drawingNode;
let fontSize;
let fontColor;
let fontSize1;
// Creates a node with specified parameters and returns the NodeModel
function createNode(id, offsetX, offsetY, content, width = 100, height = 100, ports = []) {
    return {
        id: `node_${id}`,
        width,
        height,
        offsetX,
        offsetY,
        ports: ports.map(port => ({
            ...port,
            visibility: PortVisibility.Visible,
            style: { fill: 'black' },
            constraints: PortConstraints.Default | PortConstraints.Draw,
        })),
        annotations: [{
                content,
                offset: { x: 0.5, y: 1.2 },
                style: { bold: true },
            }],
    };
}
// Initializes the nodes to be used in the diagram
let nodes = [
    createNode('1', 350, 250, 'Shape 1', 100, 100, [
        { id: 'port1', offset: { x: 0.5, y: 0.5 } }
    ]),
    createNode('2', 650, 250, 'Shape 2', 100, 100, [
        { id: 'port11', offset: { x: 0.5, y: 0.5 } },
        { id: 'port2', offset: { x: 0, y: 0.5 }, height: 100, width: 7 }
    ]),
    createNode('3', 500, 400, 'Shape 3'),
];
// Initializes the connectors to be used in the diagram
let connectors = [
    {
        id: 'connector_1',
        sourceID: 'node_1',
        targetID: 'node_3',
        type: 'Orthogonal',
    },
];
// Defines custom user handles for interaction
let handles = [
    {
        name: 'Clone',
        pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        visible: true,
        offset: 1,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Delete',
        pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        visible: true,
        offset: 0,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Draw',
        pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        visible: true,
        offset: 0.5,
        side: 'Right',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];
// CSS styles for the property panel and diagram components
const sample_css = `
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
    .db-prop-text-style {
      font-size: 13px;
      font-weight: normal;
      font-family: 'Calibri';
      margin-top: 25px;
    }
    .radio-text-style {
      font-size: 13px;
      font-weight: normal;
      font-family: 'Calibri';
      margin-top: 10px;
    }
    .text-content {
      margin-left: 10px;
    }
    #properties_Container {
      width: 300px;
      float: left;
      height: 600px;
      margin-top: 30px;
    }
  .row-header {
    font-size: 15px;
    font-weight: 500;
  }
  .property-section .e-remove-selection {
    cursor: not-allowed;
  }
  .property-panel-header {
    padding-top: 15px;
    padding-bottom: 15px;
  }`;
// Function for SnappingSample component
function SnappingSample() {
    React.useEffect(() => {
        updateSampleSection();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render
    // Adjusts the scale of the diagram's gridlines based on the selected snapping interval.
    function adjustGridlineScale() {
        diagramInstance.snapSettings.horizontalGridlines.scaledIntervals[0] =
            fontSize.value;
        diagramInstance.snapSettings.verticalGridlines.scaledIntervals[0] =
            fontSize.value;
        diagramInstance.dataBind();
    }
    // Handle the snap constraints by checking whether the checkbox are checked or not
    function checkbox() {
        diagramInstance.snapSettings.constraints = SnapConstraints.All;
        if (!checkboxObj.checked) {
            diagramInstance.snapSettings.constraints &= ~SnapConstraints.ShowLines;
        }
        if (!snapToObj.checked) {
            diagramInstance.snapSettings.constraints &= ~SnapConstraints.SnapToObject;
        }
    }
    // Handles changes in snapping options based on user input.
    function handleSnapToLinesChange(args) {
        checkbox();
        switch (args.value) {
            case 'Snap To Gridlines':
                // Enable SnapToLines constraint and adjust based on checkbox states
                diagramInstance.snapSettings.constraints |= SnapConstraints.SnapToLines;
                break;
            case 'Snap To Horizontal Gridlines':
                // Toggle SnapToHorizontalLines constraint
                diagramInstance.snapSettings.constraints ^=
                    SnapConstraints.SnapToVerticalLines;
                break;
            case 'Snap To Vertical Gridlines':
                // Toggle SnapToVerticalLines constraint
                diagramInstance.snapSettings.constraints ^=
                    SnapConstraints.SnapToHorizontalLines;
                break;
            case 'None':
                // Disable all snap to line constraints
                diagramInstance.snapSettings.constraints &=
                    ~(SnapConstraints.SnapToHorizontalLines |
                        SnapConstraints.SnapToVerticalLines |
                        SnapConstraints.SnapToLines);
                break;
        }
        diagramInstance.dataBind();
        adjustGridlineScale();
    }
    return (<div className="control-pane diagram-control-pane">
            <style>{sample_css}</style>
            <div className="col-lg-8 control-section">
                <div className="content-wrapper" style={{ width: '100%' }}>
                    {/* Initializes and renders diagram control */}
                    <DiagramComponent id="diagram" ref={(diagram) => (diagramInstance = diagram)} width={'100%'} height={'645px'} nodes={nodes} drawingObject={{ type: 'Orthogonal' }} connectors={connectors} selectedItems={{
            constraints: SelectorConstraints.UserHandle,
            userHandles: handles,
        }} 
    // Enables infinite scrolling for the diagram.
    scrollSettings={{
            scrollLimit: 'Infinity',
        }} contextMenuSettings={{
            show: true,
        }} 
    // Initializes the diagram with specific settings when created.
    created={() => {
            diagramInstance.fitToPage({ mode: 'Width' });
        }} 
    // Sets default styles for nodes.
    getNodeDefaults={(node) => {
            node.style = { fill: 'orange', strokeColor: 'orange' };
            return node;
        }} 
    // Sets default constraints for connectors.
    getConnectorDefaults={(connector) => {
            connector.constraints =
                ConnectorConstraints.Default |
                    ConnectorConstraints.DragSegmentThumb;
            return connector;
        }} 
    // Handles rotation changes for diagram elements.
    rotateChange={(args) => {
            if (args.state === 'Start' || args.state === 'Progress') {
                diagramInstance.selectedItems = {
                    constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
                };
            }
            else if (args.state === 'Completed') {
                diagramInstance.selectedItems = {
                    constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
                    userHandles: handles,
                };
            }
        }} 
    // Defines custom actions for user handles.
    onUserHandleMouseDown={(args) => {
            switch (args.element.name) {
                case 'Delete':
                    diagramInstance.remove();
                    break;
                case 'Clone':
                    diagramInstance.paste(diagramInstance.selectedItems.selectedObjects);
                    break;
                case 'Draw':
                    diagramInstance.drawingObject.shape = {};
                    diagramInstance.drawingObject.type = diagramInstance.drawingObject.type || 'Orthogonal';
                    diagramInstance.drawingObject.sourceID = drawingNode.id;
                    diagramInstance.dataBind();
                    break;
            }
        }} 
    // Manages selection changes within the diagram.
    selectionChange={(args) => {
            if (args.state === 'Changed') {
                let selectedNodes = diagramInstance.selectedItems.nodes;
                let selectedConnectors = diagramInstance.selectedItems.connectors;
                let selectedItems = [...selectedNodes, ...selectedConnectors];
                if (selectedItems.length > 0) {
                    if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
                        diagramInstance.selectedItems = {
                            constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
                            userHandles: handles,
                        };
                        if (selectedNodes.length > 0) {
                            drawingNode = selectedNodes[selectedNodes.length - 1];
                        }
                    }
                    else {
                        diagramInstance.selectedItems = {
                            constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
                        };
                    }
                }
            }
        }} snapSettings={{ snapAngle: 5 }}>
                        <Inject services={[DiagramContextMenu, UndoRedo, Snapping]}/>
                    </DiagramComponent>
                </div>
            </div>

            <div className="col-lg-4 property-section">
                <div id="properties_Container">
                    <div className="property-panel-header"> Properties </div>
                    <div className="db-prop-row">
                        <div className="db-prop-text-style">
                            <span className="db-prop-text-style text-content">
                                Snapping Interval
                            </span>
                            <div className="db-text-input" style={{ float: 'right', marginRight: '10px' }}>
                                <NumericTextBoxComponent id="snappingInterval" width={150} value={20} min={1} step={1} format="n0" 
    // Sets the snapping interval
    change={(args) => {
            diagramInstance.snapSettings.horizontalGridlines.snapIntervals[0] =
                args.value;
            diagramInstance.snapSettings.verticalGridlines.snapIntervals[0] =
                args.value;
            diagramInstance.snapSettings.horizontalGridlines.scaledIntervals[0] =
                args.value;
            diagramInstance.snapSettings.verticalGridlines.scaledIntervals[0] =
                args.value;
            diagramInstance.dataBind();
        }} ref={(fontsize) => (fontSize = fontsize)}/>
                            </div>
                        </div>
                        <div className="db-prop-text-style">
                            <span className="db-prop-text-style text-content">
                                Snapping Angle
                            </span>
                            <div className="db-text-input" style={{ float: 'right', marginRight: '10px' }}>
                                <NumericTextBoxComponent id="snappingAngle" width={150} value={5} min={1} step={1} format="n0" 
    // Sets the snapping angle
    change={(args) => {
            diagramInstance.snapSettings.snapAngle = args.value;
            diagramInstance.dataBind();
        }} ref={(fontsize) => (fontSize1 = fontsize)}/>
                            </div>
                        </div>
                        <div className="db-prop-text-style">
                            <span className="db-prop-text-style text-content">
                                Snapping Line Color
                            </span>
                            <div className="db-text-input" style={{ float: 'right', marginRight: '10px' }}>
                                <ColorPickerComponent id="snappingLineColor" value="#07EDE1" mode="Palette" showButtons={false} 
    // Change the color of the snap lines
    change={(args) => {
            diagramInstance.snapSettings.snapLineColor = args.value;
            diagramInstance.dataBind();
        }} ref={(fontcolor) => (fontColor = fontcolor)}/>
                            </div>
                        </div>
                        <div className="db-prop-text-style">
                            <div className="row" style={{ marginLeft: '10px' }}>
                                <CheckBoxComponent id="showGridlines" label={'Show Gridline'} checked={true} 
    // Toggle the visibility of grid lines
    change={() => {
            diagramInstance.snapSettings.constraints =
                diagramInstance.snapSettings.constraints ^
                    SnapConstraints.ShowLines;
            diagramInstance.dataBind();
            adjustGridlineScale();
        }} ref={(scope) => { checkboxObj = scope; }}/>
                            </div>
                        </div>
                        <div className="db-prop-text-style" style={{ marginTop: '7px' }}>
                            <div className="row" style={{ marginLeft: '10px' }}>
                                <CheckBoxComponent id="snapToObject" label={'Snapping To Objects'} checked={true} 
    // Toggle the snapping to objects
    change={() => {
            diagramInstance.snapSettings.constraints =
                diagramInstance.snapSettings.constraints ^
                    SnapConstraints.SnapToObject;
            diagramInstance.dataBind();
            adjustGridlineScale();
        }} ref={(scope) => { snapToObj = scope; }}/>
                            </div>
                        </div>

                        <div className="db-prop-text-style">
                            <div className="db-prop-text-style text-content" style={{ fontWeight: 'bold' }}>
                                Snapping To Lines
                            </div>
                        </div>

                        <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                            <div>
                                <RadioButtonComponent id="radio1" name="snapToLines" checked={true} value="Snap To Gridlines" label="Snap To Gridlines" change={(args) => {
            handleSnapToLinesChange(args);
        }}/>
                            </div>
                        </div>
                        <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                            <div>
                                <RadioButtonComponent id="radio2" name="snapToLines" value="Snap To Horizontal Gridlines" label="Snap To Horizontal Gridlines" change={(args) => {
            handleSnapToLinesChange(args);
        }}/>
                            </div>
                        </div>
                        <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                            <div>
                                <RadioButtonComponent id="radio3" name="snapToLines" value="Snap To Vertical Gridlines" label="Snap To Vertical Gridlines" change={(args) => {
            handleSnapToLinesChange(args);
        }}/>
                            </div>
                        </div>
                        <div className="row radio-text-style" style={{ marginLeft: '7px' }}>
                            <div>
                                <RadioButtonComponent id="radio4" name="snapToLines" value="None" label="None" change={(args) => {
            handleSnapToLinesChange(args);
        }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample shows how diagram objects snap to the nearest intersection of gridlines or objects while being dragged or resized.
                </p>
            </div>
            <div id="description">
                <p>
                    The <code>SnapInterval</code> property in snapSettings allows you to specify the interval at which objects should snap to a grid or other objects in the control.
                </p>
                <p>
                    The <code>snapAngle</code> property in snapSettings allows you to define the snap angle by which the object needs to be rotated.
                </p>
                <p>
                    The  <code>snapLineColor</code> property is used to set the color of the snap lines that appear when objects snap to a grid or other objects in the control.
                </p>
                <p>
                    The <code>constraints</code> property controls the visibility of gridlines and enables or disables snapping.
                </p>
                <br />
            </div>
        </div>);
}
export default SnappingSample;
