import * as React from "react";
import { DiagramComponent, Node, NodeConstraints, UndoRedo, Inject, SnapConstraints, DataBinding, HierarchicalTree, } from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import "./font-icons.css";
let diagramInstance;
//Collection of working data
let workingData = [
    { Name: 'Plant Manager', Id: '1', hasChild: true, expanded: true },
    {
        Name: 'Production Manager',
        Id: '2',
        ParentId: '1',
        hasChild: true,
        expanded: true,
    },
    {
        Name: 'Control Room',
        Id: '3',
        ParentId: '2',
        hasChild: true,
        expanded: true,
    },
    { Name: 'Foreman1', Id: '4', ParentId: '3', hasChild: true, expanded: true },
    { Name: 'Craft Personnel5', Id: '5', ParentId: '4' },
    { Name: 'Craft Personnel6', Id: '6', ParentId: '4' },
    {
        Name: 'Plant Operator',
        Id: '7',
        ParentId: '2',
        hasChild: true,
        expanded: true,
    },
    { Name: 'Foreman2', Id: '8', ParentId: '7', hasChild: true, expanded: true },
    { Name: 'Craft Personnel7', Id: '9', ParentId: '8' },
    { Name: 'Administrative Officer', Id: '10', ParentId: '1' },
    {
        Name: 'Maintenance Manager',
        Id: '11',
        ParentId: '1',
        hasChild: true,
        expanded: true,
    },
    {
        Name: 'Electrical Supervisor',
        Id: '12',
        ParentId: '11',
        hasChild: true,
        expanded: true,
    },
    { Name: 'Craft Personnel1', Id: '13', ParentId: '12' },
    { Name: 'Craft Personnel2', Id: '14', ParentId: '12' },
    {
        Name: 'Mechanical Supervisor',
        Id: '15',
        ParentId: '11',
        hasChild: true,
        expanded: true,
    },
    { Name: 'Craft Personnel3', Id: '16', ParentId: '15' },
    { Name: 'Craft Personnel4', Id: '17', ParentId: '15' },
];
let items = new DataManager(workingData, new Query().take(7));
function TreeViewSample() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let index = 1;
    let deleteButton;
    let addButton;
    let treeObj;
    let targetNodeId;
    let elementNodeId;
    let fields = {
        dataSource: workingData,
        id: 'Id',
        text: 'Name',
        parentID: 'ParentId',
        hasChildren: 'hasChild',
    };
    //add function
    function add() {
        let nodeId;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            nodeId = diagramInstance.selectedItems.nodes[0].id;
            addNode(nodeId);
        }
        else if (treeObj.selectedNodes.length > 0) {
            nodeId = treeObj.selectedNodes[0];
            addNode(nodeId);
        }
    }
    //remove function
    function remove() {
        let nodeId;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            nodeId = diagramInstance.selectedItems.nodes[0].id;
            removeSubChild(diagramInstance.selectedItems.nodes[0], true);
            diagramInstance.doLayout();
        }
        else if (treeObj.selectedNodes.length > 0) {
            nodeId = treeObj.selectedNodes[0];
            treeObj.removeNodes([nodeId]);
            let node = diagramInstance.getObject(nodeId);
            removeSubChild(node, false);
        }
        for (let i = workingData.length - 1; i >= 0; i--) {
            if (workingData[i].id === nodeId) {
                workingData.splice(i, 1);
            }
        }
        diagramInstance.doLayout();
    }
    //remove sub child function
    function removeSubChild(node, canDelete) {
        let childNode;
        let connector;
        for (let i = node.outEdges.length - 1; i >= 0; i--) {
            connector = diagramInstance.getObject(node.outEdges[i]);
            childNode = diagramInstance.getObject(connector.targetID);
            if (childNode != null && childNode.outEdges.length > 0) {
                removeSubChild(childNode, canDelete);
            }
            else {
                diagramInstance.remove(childNode);
                if (canDelete) {
                    treeObj.removeNodes([childNode.id]);
                }
                for (let j = workingData.length - 1; j >= 0; j--) {
                    if (workingData[j].id === childNode.id) {
                        workingData.splice(j, 1);
                    }
                }
            }
        }
        for (let k = node.inEdges.length - 1; k >= 0; k--) {
            let connector = diagramInstance.getObject(node.inEdges[k]);
            let childNode = diagramInstance.getObject(connector.sourceID);
            let index = childNode.outEdges.indexOf(connector.id);
            if (childNode.outEdges.length > 1 && index === 0) {
                index = childNode.outEdges.length;
            }
            if (index > 0) {
                let node1 = childNode.outEdges[index - 1];
                let connector1 = diagramInstance.getObject(node1);
                let node2 = diagramInstance.getObject(connector1.targetID);
                diagramInstance.select([node2]);
            }
            else {
                diagramInstance.select([childNode]);
            }
        }
        diagramInstance.remove(node);
        if (canDelete) {
            treeObj.removeNodes([node.id]);
        }
        for (let t = workingData.length - 1; t >= 0; t--) {
            if (workingData[t].id === node.id) {
                workingData.splice(t, 1);
            }
        }
    }
    //filter Node Data Function
    function filterNodeData(a) {
        return a.data.Id === targetNodeId;
    }
    //add Node Function
    function addNode(nodeId) {
        targetNodeId = nodeId ? nodeId : treeObj.selectedNodes[0];
        let tempData = workingData.filter(checkData);
        tempData[0].hasChild = true;
        tempData[0].expanded = true;
        let id = 'tree_' + index;
        let item = {
            Name: 'Node',
            Id: id,
            ParentId: targetNodeId,
            hasChild: false,
            expanded: false,
        };
        treeObj.addNodes([item], targetNodeId, null);
        treeObj.beginEdit(id);
        let node = { id: id, data: item };
        let targetId;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            targetId = diagramInstance.selectedItems.nodes[0].id;
        }
        else {
            let temp = diagramInstance.nodes.filter(filterNodeData);
            targetId = temp[0].id;
        }
        let connector = { sourceID: targetId, targetID: id };
        diagramInstance.add(node);
        diagramInstance.add(connector);
        diagramInstance.doLayout();
        index++;
        workingData.push(item);
    }
    //node selected event
    function nodeSelected(args) {
        deleteButton.disabled = false;
        addButton.disabled = false;
    }
    //node click event
    function nodeClicked(args) {
        let node = diagramInstance.getObject(treeObj.selectedNodes[0]);
        diagramInstance.select([node]);
    }
    // Key Press Event
    function keyPress(args) {
        if (args.event.key === 'Enter') {
            add();
        }
    }
    //node edited event
    function nodeEdited(args) {
        let node = diagramInstance.getObject(args.nodeData.id);
        node.annotations[0].content = args.newText;
        treeObj.selectedNodes = [args.nodeData.id];
    }
    //check data function
    function checkData(a) {
        return a.Id === targetNodeId;
    }
    //check element data function
    function checkElementData(a) {
        return a.Id === elementNodeId;
    }
    //Initially disable add node button
    function initialAddButton() {
        addButton.disabled = true;
    }
    //Initially disable delete node button
    function initialDeleteButton() {
        deleteButton.disabled = true;
    }
    return (<div className="control-pane">
    <div className="control-section row uploadpreview">
      <div style={{ width: '100%', height: '50px', marginBottom: '5px' }}>
        <div className="group-button" style={{ width: '70%', float: 'left' }}>
          <ButtonComponent ref={(scope) => {
            addButton = scope;
        }} isPrimary={true} created={initialAddButton} onClick={add}>
            Add Node
          </ButtonComponent>
          <ButtonComponent ref={(scope) => {
            deleteButton = scope;
        }} created={initialDeleteButton} isPrimary={true} onClick={remove}>
            Delete Node
          </ButtonComponent>
        </div>
        <div style={{ width: '30%', float: 'right', fontSize: '16px' }}>
          <div className="col-xs-9 db-col-right db-prop-text-style" style={{ paddingTop: '10px' }}>
            <span style={{ marginLeft: '10px' }}>
              Diagram Binding with Treeview
            </span>
          </div>
          <div className="col-xs-3 db-col-left">
            <svg height="45" width="47">
              <path d="M27.573,21.885726 C26.039659,21.885726 24.796639,23.128786 24.796639,24.662178 L24.796639,37.3311 C24.796639,38.864491 26.039659,40.107552 27.573,40.107552 L40.064701,40.107552 C41.598042,40.107552 42.841061,38.864491 42.841061,37.3311 L42.841061,24.662178 C42.841061,23.128786 41.598042,21.885726 40.064701,21.885726 z M3.9060001,2.3436508 C2.9710598,2.3436508 2.2131386,3.1015863 2.2131386,4.0365477 L2.2131386,11.76122 C2.2131386,12.69618 2.9710598,13.454117 3.9060001,13.454117 L11.522699,13.454117 C12.457641,13.454117 13.21556,12.69618 13.21556,11.76122 L13.21556,4.0365477 C13.21556,3.1015863 12.457641,2.3436508 11.522699,2.3436508 z M2.7341995,0 L12.8898,0 C14.399857,0 15.624,1.2241688 15.624,2.7342587 L15.624,12.737741 C15.624,14.247831 14.399857,15.472 12.8898,15.472 L8.75,15.472 8.75,29.653 21.167,29.653 21.167,22.526347 C21.167,20.049711 23.174645,18.042 25.6512,18.042 L42.306801,18.042 C44.783356,18.042 46.791,20.049711 46.791,22.526347 L46.791,38.932653 C46.791,41.40929 44.783356,43.417 42.306801,43.417 L25.6512,43.417 C23.174645,43.417 21.167,41.40929 21.167,38.932653 L21.167,32.403 7.3190002,32.403 C6.5596085,32.403 5.9440002,31.787392 5.9440002,31.028 5.9440002,30.933076 5.953619,30.840399 5.9719353,30.75089 L6,30.641743 6,15.472 2.7341995,15.472 C1.2241421,15.472 0,14.247831 0,12.737741 L0,2.7342587 C0,1.2241688 1.2241421,0 2.7341995,0 z" fill="#FF8FABCA"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="content-wrapper" style={{ width: '100%' }}>
        <div id="palette-space" style={{
            width: '27%',
            float: 'left',
            height: '700px',
            overflow: 'hidden',
        }}>
          <div id="tree" style={{ width: '90%' }}>
            <TreeViewComponent fields={fields} ref={(treeview) => {
            treeObj = treeview;
        }} allowEditing={true} keyPress={keyPress} nodeEdited={nodeEdited} nodeSelected={nodeSelected} allowDragAndDrop={true} nodeClicked={nodeClicked}/>
          </div>
        </div>
        <div id="diagram-space" style={{ width: '72%', float: 'right' }}>
          <DiagramComponent id="diagram" ref={(diagram) => (diagramInstance = diagram)} width={'100%'} height={'700px'} snapSettings={{ constraints: SnapConstraints.None }} dataSourceSettings={{
            id: 'Id',
            parentId: 'ParentId',
            dataSource: items,
            doBinding: (nodeModel, data, diagram) => {
                nodeModel.id = data.Id;
            },
        }} layout={{
            type: 'HierarchicalTree',
            verticalSpacing: 50,
            horizontalSpacing: 40,
        }} //Sets the default values of a node
     getNodeDefaults={(node) => {
            node.width = 100;
            node.height = 40;
            node.style = {
                strokeWidth: 1,
                strokeColor: 'whitesmoke',
                fill: 'CornflowerBlue',
            };
            node.annotations = [
                { content: node.data.Name, style: { color: 'white' } },
            ];
            node.constraints =
                NodeConstraints.Default | NodeConstraints.AllowDrop;
            return node;
        }} //Sets the default values of a connector
     getConnectorDefaults={(obj) => {
            obj.type = 'Orthogonal';
            obj.style = { strokeColor: 'CornflowerBlue' };
            obj.targetDecorator = {
                shape: 'Arrow',
                height: 10,
                width: 10,
                style: { fill: 'CornflowerBlue', strokeColor: 'white' },
            };
        }} //enable or disable the add and delete button
     selectionChange={(args) => {
            if (args.state === 'Changed') {
                if (args.type === 'Addition') {
                    deleteButton.disabled = false;
                    addButton.disabled = false;
                }
                else {
                    deleteButton.disabled = true;
                    addButton.disabled = true;
                }
                let selectedItems = diagramInstance.selectedItems.nodes.concat(diagramInstance.selectedItems.connectors);
                if (selectedItems.length == 0) {
                    treeObj.selectedNodes = [];
                }
            }
        }} //click event handler
     click={(args) => {
            if (args.element instanceof Node) {
                treeObj.selectedNodes = [args.element.data.Id];
            }
        }} //text edit event
     textEdit={(args) => {
            setTimeout(function () {
                if (args.annotation) {
                    elementNodeId = args.element.id;
                    let tempData = workingData.filter(checkElementData);
                    let node = treeObj.getNode(tempData[0].Id);
                    treeObj.updateNode(tempData[0].Id, args.annotation.content);
                }
            }, 0);
        }} //drop event
     drop={(args) => {
            let connector;
            let tempData;
            setTimeout(function () {
                targetNodeId = args.target.id;
                tempData = workingData.filter(checkData);
                if (tempData.length > 0) {
                    tempData[0].hasChild = true;
                    tempData[0].expanded = true;
                }
                if (args.element.inEdges.length === 0) {
                    let id = args.element.id;
                    let item = {
                        Name: args.element.annotations[0].content,
                        Id: args.element.id,
                        ParentId: targetNodeId,
                        hasChild: false,
                        expanded: false,
                    };
                    treeObj.addNodes([item], targetNodeId, null);
                    connector = { sourceID: targetNodeId, targetID: id };
                    diagramInstance.add(connector);
                    diagramInstance.doLayout();
                    index++;
                    workingData.push(item);
                }
                else {
                    connector = diagramInstance.getObject(args.element.inEdges[0]);
                    connector.sourceID = targetNodeId;
                    diagramInstance.dataBind();
                    diagramInstance.doLayout();
                    elementNodeId = args.element.id;
                    tempData = workingData.filter(checkElementData);
                    tempData[0].ParentId = targetNodeId;
                    treeObj.fields = {
                        dataSource: workingData,
                        id: 'Id',
                        text: 'Name',
                        parentID: 'ParentId',
                        hasChildren: 'hasChild',
                    };
                    treeObj.refresh();
                }
            }, 0);
        }} //drag enter event
     dragEnter={(args) => {
            let label = '';
            if (args.dragData) {
                label = args.dragData.text;
            }
            let node = {
                id: 'node' + index,
                data: { Name: label, Id: 'node' + index },
                annotations: [{ content: label }],
            };
            args.dragItem = node;
        }}>
            <Inject services={[UndoRedo, DataBinding, HierarchicalTree]}/>
          </DiagramComponent>
        </div>
      </div>
     </div>
        <div id="action-description">
            <p>
                This example illustrates how to create a tree view and a diagram with a datasource. It provides support for selecting, adding, deleting, dragging and dropping, and editing annotations of the nodes during runtime. These actions will be reflected in the corresponding nodes of the tree view component. 
            </p>
        </div>
        <div id="description">
            <p>
                When a node is added or removed in a Diagram during runtime, the added or removed node is reflected in the tree view component. When an annotation in the diagram is changed it should also be updated in the treeView by using treeview updateNode method. When editing a text in a treeview, use selectedItems to update it in the diagram. You can drag text from the treeview and drop it onto the node in the diagram. Also, you can perform drag and drop operations in the diagram.   
            </p>
            <br />
        </div>
    </div>);
}
export default TreeViewSample;
