import * as React from "react";
import { 
// Syncfusion Diagram components and utilities
MindMap as MindMapModule, HierarchicalTree, ConnectorConstraints, DiagramConstraints, ToolBase, randomId, PointPort, SelectorConstraints, SnapConstraints, PortVisibility, DiagramComponent, NodeConstraints, Node, DiagramTools, Inject, DataBinding } from "@syncfusion/ej2-react-diagrams";
// Importing base components and data management utilities
import { updateSampleSection } from "../common/sample-base";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { mindMap } from './diagram-data';
// Initialize data manager with mindMap data and query
let items = new DataManager(mindMap, new Query().take(7));
let diagramInstance;
// React component for MindMap
function MindMap() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    function rendereComplete() {
        diagramInstance.fitToPage();
    }
    //creation of the Ports
    function getPort() {
        let port = [
            {
                id: "port1",
                offset: { x: 0, y: 0.5 },
                visibility: PortVisibility.Hidden,
                style: { fill: "black" }
            },
            {
                id: "port2",
                offset: { x: 1, y: 0.5 },
                visibility: PortVisibility.Hidden,
                style: { fill: "black" }
            }
        ];
        return port;
    }
    // Function to add a new node
    function addNode() {
        let obj = {};
        obj.id = randomId();
        obj.data = {};
        obj.data.Label = "Node";
        return obj;
    }
    // Function to add a connector
    function addConnector(source, target) {
        let connector = {};
        connector.id = randomId();
        connector.sourceID = source.id;
        connector.targetID = target.id;
        return connector;
    }
    // Function to get custom tool based on action (leftHandle, rightHandle, delete)
    function getTool(action) {
        let tool;
        if (action === "leftHandle") {
            tool = new LeftExtendTool(diagramInstance.commandHandler);
        }
        else if (action === "rightHandle") {
            tool = new RightExtendTool(diagramInstance.commandHandler);
        }
        else if (action === "delete") {
            tool = new DeleteClick(diagramInstance.commandHandler);
        }
        return tool;
    }
    // Custom tool class for left extension tool
    class LeftExtendTool extends ToolBase {
        mouseDown(args) {
            super.mouseDown(args);
            this.inAction = true;
        }
        mouseUp(args) {
            if (this.inAction) {
                let selectedObject = this.commandHandler.getSelectedObject();
                if (selectedObject[0]) {
                    if (selectedObject[0] instanceof Node) {
                        let node = addNode();
                        if (selectedObject[0].data.branch === "Root") {
                            node.data.branch = "Right";
                        }
                        else if (selectedObject[0].data.branch === "Right" ||
                            selectedObject[0].data.branch === "subRight") {
                            node.data.branch = "subRight";
                        }
                        getTextEditValue(selectedObject[0], node);
                    }
                }
            }
        }
    }
    // Custom tool class for right extension tool
    class RightExtendTool extends ToolBase {
        //mouseDown event
        mouseDown(args) {
            super.mouseDown(args);
            this.inAction = true;
        }
        //mouseDown event
        mouseUp(args) {
            if (this.inAction) {
                let selectedObject = this.commandHandler.getSelectedObject();
                if (selectedObject[0]) {
                    if (selectedObject[0] instanceof Node) {
                        let node = addNode();
                        if (selectedObject[0].data.branch === "Root") {
                            node.data.branch = "Left";
                        }
                        else if (selectedObject[0].data.branch === "Left" ||
                            selectedObject[0].data.branch === "subLeft") {
                            node.data.branch = "subLeft";
                        }
                        getTextEditValue(selectedObject[0], node);
                    }
                }
            }
        }
    }
    // Custom tool class for delete tool
    class DeleteClick extends ToolBase {
        //mouseDown event
        mouseDown(args) {
            super.mouseDown(args);
            this.inAction = true;
        }
        //mouseup event
        mouseUp(args) {
            if (this.inAction) {
                let selectedObject = this.commandHandler.getSelectedObject();
                if (selectedObject[0]) {
                    if (selectedObject[0] instanceof Node) {
                        let node = selectedObject[0];
                        this.removeSubChild(node);
                    }
                    diagramInstance.doLayout();
                }
            }
        }
        //Function to Remove the subchild Elements
        removeSubChild(node) {
            for (let i = node.outEdges.length - 1; i >= 0; i--) {
                let connector = diagramInstance.getObject(node.outEdges[i]);
                let childNode = diagramInstance.getObject(connector.targetID);
                if (childNode.outEdges.length > 0) {
                    this.removeSubChild(childNode);
                }
                else {
                    diagramInstance.remove(childNode);
                }
            }
            diagramInstance.remove(node);
        }
    }
    //Function to hide the require userhandle.
    function hideUserHandle(name) {
        for (let handle of diagramInstance.selectedItems.userHandles) {
            if (handle.name === name) {
                handle.visible = false;
            }
        }
    }
    // Definition of left arrow path,right arrow path,delete icon path for user handle
    let leftarrow = "M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z";
    let rightarrow = "M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z";
    let deleteicon = "M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76" +
        "96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04" +
        "91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z";
    // Definition of user handles with their respective properties
    let leftuserhandle = setUserHandle(
    //it is in dedicated line here.
    "leftHandle", leftarrow, "Left", 1, { top: 0, bottom: 0, left: 0, right: 10 }, "Left", "Top");
    let rightuserhandle = setUserHandle(
    //it is in dedicated line here.
    "rightHandle", rightarrow, "Right", 1, { top: 0, bottom: 0, left: 10, right: 0 }, "Right", "Top");
    let deleteuserhandle = setUserHandle(
    //it is in dedicated line here.
    "delete", deleteicon, "Top", 0.5, { top: 0, bottom: 10, left: 0, right: 0 }, "Center", "Center");
    let handle = [
        leftuserhandle,
        rightuserhandle,
        deleteuserhandle
    ];
    //set and creation of the Userhandle.
    function setUserHandle(//it is in dedicated line here.
    name, pathData, side, offset, margin, HorizontalAlignment, verticalAlignment) {
        let userhandle = {
            name: name,
            pathData: pathData,
            backgroundColor: "black",
            pathColor: "white",
            side: side,
            offset: offset,
            margin: margin,
            horizontalAlignment: HorizontalAlignment,
            verticalAlignment: verticalAlignment
        };
        return userhandle;
    }
    // Function to handle text edit value and add a new node and connector
    function getTextEditValue(selectObject, node) {
        let connector = addConnector(selectObject, node);
        diagramInstance.clearSelection();
        var newNode = diagramInstance.add(node);
        diagramInstance.add(connector);
        diagramInstance.doLayout();
        diagramInstance.bringIntoView(newNode.wrapper.bounds);
        diagramInstance.select([diagramInstance.nameTable[newNode.id]]);
        diagramInstance.startTextEdit(diagramInstance.selectedItems.nodes[0]);
    }
    //Change the Position of the UserHandle.
    function changeUserHandlePosition(change) {
        for (let handle of diagramInstance.selectedItems.userHandles) {
            if (handle.name === "delete" && change === "leftHandle") {
                applyHandle(handle, "Left", 1, { top: 0, bottom: 0, left: 0, right: 10 }, "Left", "Top");
            }
            else if (handle.name === "delete" && change === "rightHandle") {
                applyHandle(handle, "Right", 1, { top: 0, bottom: 0, left: 10, right: 0 }, "Right", "Top");
            }
        }
    }
    //function to set the value for UserHandle element.
    function applyHandle(//it is in dedicated line here.
    handle, side, offset, margin, HorizontalAlignment, verticalAlignment) {
        handle.side = side;
        handle.offset = offset;
        handle.margin = margin;
        handle.horizontalAlignment = HorizontalAlignment;
        handle.verticalAlignment = verticalAlignment;
    }
    return (<div className="control-pane">
      <div className="control-section">
        <div className="content-wrapper" style={{ width: "100%" }}>
          <DiagramComponent ref={diagram => (diagramInstance = diagram)} id="diagram" style={{ width: "74%", height: "550px", float: "left" }} width={"100%"} height={"550px"} constraints={DiagramConstraints.Default & ~DiagramConstraints.UndoRedo} snapSettings={{ constraints: SnapConstraints.None }} tool={DiagramTools.SingleSelect} layout={{
            type: "MindMap",
            orientation: 'Horizontal',
            getBranch: (node, nodes) => {
                return node.data.branch;
            },
            horizontalSpacing: 50
        }} 
    //Selectionchange event for Node and connector
    selectionChange={(arg) => {
            if (arg.state === "Changing") {
                if (arg.newValue[0] instanceof Node) {
                    for (let handle of diagramInstance.selectedItems
                        .userHandles) {
                        handle.visible = true;
                    }
                    if (arg.newValue[0].data
                        .branch === "Left" ||
                        arg.newValue[0].data
                            .branch === "subLeft") {
                        hideUserHandle("leftHandle");
                        changeUserHandlePosition("leftHandle");
                    }
                    else if (arg.newValue[0].data
                        .branch === "Right" ||
                        arg.newValue[0].data
                            .branch === "subRight") {
                        hideUserHandle("rightHandle");
                        changeUserHandlePosition("rightHandle");
                    }
                    else if (arg.newValue[0].data
                        .branch === "Root") {
                        hideUserHandle("delete");
                    }
                }
                else {
                    hideUserHandle("leftHandle");
                    hideUserHandle("rightHandle");
                    hideUserHandle("delete");
                }
            }
        }} selectedItems={{
            constraints: SelectorConstraints.UserHandle,
            userHandles: handle
        }} dataSourceSettings={{
            id: "id",
            parentId: "parentId",
            dataSource: items,
            root: String(1)
        }} 
    //sets node default value
    getNodeDefaults={(obj) => {
            obj.constraints =
                NodeConstraints.Default & ~NodeConstraints.Drag;
            if (obj.data.branch === "Left" ||
                obj.data.branch === "Right" ||
                obj.data.branch === "Root") {
                obj.shape = { type: "Basic", shape: "Ellipse" };
                obj.borderColor =
                    "black"; /* tslint:disable:no-string-literal */
                obj.style = {
                    fill: obj.data.branch === "Root"
                        ? "#E74C3C"
                        : "#F39C12",
                    strokeColor: "none",
                    strokeWidth: 2
                };
                obj.annotations = [
                    {
                        content: obj.data.Label,
                        margin: { left: 10, right: 10, top: 10, bottom: 10 },
                        style: { color: "white" }
                    }
                ];
                let port = getPort();
                for (let i = 0; i < port.length; i++) {
                    obj.ports.push(new PointPort(obj, "ports", port[i], true));
                }
            }
            else {
                let color; /* tslint:disable:no-string-literal */
                if (obj.data.branch === "Right" ||
                    obj.data.branch === "subRight") {
                    color = "#8E44AD";
                }
                else {
                    color = "#3498DB";
                }
                obj.shape = { type: "Basic", shape: "Rectangle" };
                obj.style = { fill: color, strokeWidth: 0 };
                obj.minWidth = 100;
                obj.height = 4;
                let port = getPort();
                for (let i = 0; i < port.length; i++) {
                    obj.ports.push(new PointPort(obj, "ports", port[i], true));
                }
                obj.annotations = [
                    {
                        content: obj.data.Label,
                        offset: { x: 0.5, y: 0 },
                        verticalAlignment: "Bottom"
                    }
                ];
                obj.shape.margin = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                };
            }
            return obj;
        }} 
    //sets connector default value
    getConnectorDefaults={(connector, diagram) => {
            connector.type = "Bezier";
            connector.targetDecorator = { shape: "None" };
            let sourceNode = diagram.getObject(connector.sourceID);
            let targetNode = diagram.getObject(connector.targetID);
            if (targetNode.data.branch === "Right" ||
                targetNode.data.branch === "subRight") {
                connector.sourcePortID = sourceNode.ports[0].id;
                connector.targetPortID = targetNode.ports[1].id;
                connector.style = { strokeWidth: 5, strokeColor: "#8E44AD" };
            }
            else if (targetNode.data.branch === "Left" ||
                targetNode.data.branch === "subLeft") {
                connector.sourcePortID = sourceNode.ports[1].id;
                connector.targetPortID = targetNode.ports[0].id;
                connector.style = { strokeWidth: 5, strokeColor: "#3498DB" };
            }
            connector.constraints &= ~ConnectorConstraints.Select;
            return connector;
        }} getCustomTool={getTool} scrollSettings={{
            //Sets the scroll padding
            padding: { left: 50, right: 50 }
        }}>
            <Inject services={[DataBinding, MindMapModule, HierarchicalTree]}/>
          </DiagramComponent>
          <input id="palette" style={{ visibility: "hidden", position: "absolute" }} type="color" name="favcolor" value="#000000"/>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the concept of creativity using mind map
          layout algorithm. User handles are used to extend the mind map
          interactively.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to generate a mind map from an external data
          source. The <code>type</code> property of the <code>layout</code>{" "}
          can be used to enable the mind map layout algorithm. The
          <code>getBranch</code> property can also be used to define the
          branches at both left and right sides.
        </p>

        <p style={{ fontWeight: 500 }}>Injecting Module</p>
        <p>
          The diagram component’s features are segregated into individual
          feature-wise modules. To generate diagrams from an external data
          source, inject <code>DataBinding</code> module into{" "}
          <code>services</code>. To automatically generate a mind map, inject
          <code>Mindmap</code> module into <code>services</code>.
        </p>
        <br />
      </div>
    </div>);
}
export default MindMap;
