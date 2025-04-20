"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./font-icons.css");
var diagramInstance;
//Collection of working data
var workingData = [
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
var items = new ej2_data_1.DataManager(workingData, new ej2_data_1.Query().take(7));
function TreeViewSample() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var index = 1;
    var deleteButton;
    var addButton;
    var treeObj;
    var targetNodeId;
    var elementNodeId;
    var fields = {
        dataSource: workingData,
        id: 'Id',
        text: 'Name',
        parentID: 'ParentId',
        hasChildren: 'hasChild',
    };
    //add function
    function add() {
        var nodeId;
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
        var nodeId;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            nodeId = diagramInstance.selectedItems.nodes[0].id;
            removeSubChild(diagramInstance.selectedItems.nodes[0], true);
            diagramInstance.doLayout();
        }
        else if (treeObj.selectedNodes.length > 0) {
            nodeId = treeObj.selectedNodes[0];
            treeObj.removeNodes([nodeId]);
            var node = diagramInstance.getObject(nodeId);
            removeSubChild(node, false);
        }
        for (var i = workingData.length - 1; i >= 0; i--) {
            if (workingData[i].id === nodeId) {
                workingData.splice(i, 1);
            }
        }
        diagramInstance.doLayout();
    }
    //remove sub child function
    function removeSubChild(node, canDelete) {
        var childNode;
        var connector;
        for (var i = node.outEdges.length - 1; i >= 0; i--) {
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
                for (var j = workingData.length - 1; j >= 0; j--) {
                    if (workingData[j].id === childNode.id) {
                        workingData.splice(j, 1);
                    }
                }
            }
        }
        for (var k = node.inEdges.length - 1; k >= 0; k--) {
            var connector_1 = diagramInstance.getObject(node.inEdges[k]);
            var childNode_1 = diagramInstance.getObject(connector_1.sourceID);
            var index_1 = childNode_1.outEdges.indexOf(connector_1.id);
            if (childNode_1.outEdges.length > 1 && index_1 === 0) {
                index_1 = childNode_1.outEdges.length;
            }
            if (index_1 > 0) {
                var node1 = childNode_1.outEdges[index_1 - 1];
                var connector1 = diagramInstance.getObject(node1);
                var node2 = diagramInstance.getObject(connector1.targetID);
                diagramInstance.select([node2]);
            }
            else {
                diagramInstance.select([childNode_1]);
            }
        }
        diagramInstance.remove(node);
        if (canDelete) {
            treeObj.removeNodes([node.id]);
        }
        for (var t = workingData.length - 1; t >= 0; t--) {
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
        var tempData = workingData.filter(checkData);
        tempData[0].hasChild = true;
        tempData[0].expanded = true;
        var id = 'tree_' + index;
        var item = {
            Name: 'Node',
            Id: id,
            ParentId: targetNodeId,
            hasChild: false,
            expanded: false,
        };
        treeObj.addNodes([item], targetNodeId, null);
        treeObj.beginEdit(id);
        var node = { id: id, data: item };
        var targetId;
        if (diagramInstance.selectedItems.nodes.length > 0) {
            targetId = diagramInstance.selectedItems.nodes[0].id;
        }
        else {
            var temp = diagramInstance.nodes.filter(filterNodeData);
            targetId = temp[0].id;
        }
        var connector = { sourceID: targetId, targetID: id };
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
        var node = diagramInstance.getObject(treeObj.selectedNodes[0]);
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
        var node = diagramInstance.getObject(args.nodeData.id);
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
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section row uploadpreview" },
            React.createElement("div", { style: { width: '100%', height: '50px', marginBottom: '5px' } },
                React.createElement("div", { className: "group-button", style: { width: '70%', float: 'left' } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) {
                            addButton = scope;
                        }, isPrimary: true, created: initialAddButton, onClick: add }, "Add Node"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) {
                            deleteButton = scope;
                        }, created: initialDeleteButton, isPrimary: true, onClick: remove }, "Delete Node")),
                React.createElement("div", { style: { width: '30%', float: 'right', fontSize: '16px' } },
                    React.createElement("div", { className: "col-xs-9 db-col-right db-prop-text-style", style: { paddingTop: '10px' } },
                        React.createElement("span", { style: { marginLeft: '10px' } }, "Diagram Binding with Treeview")),
                    React.createElement("div", { className: "col-xs-3 db-col-left" },
                        React.createElement("svg", { height: "45", width: "47" },
                            React.createElement("path", { d: "M27.573,21.885726 C26.039659,21.885726 24.796639,23.128786 24.796639,24.662178 L24.796639,37.3311 C24.796639,38.864491 26.039659,40.107552 27.573,40.107552 L40.064701,40.107552 C41.598042,40.107552 42.841061,38.864491 42.841061,37.3311 L42.841061,24.662178 C42.841061,23.128786 41.598042,21.885726 40.064701,21.885726 z M3.9060001,2.3436508 C2.9710598,2.3436508 2.2131386,3.1015863 2.2131386,4.0365477 L2.2131386,11.76122 C2.2131386,12.69618 2.9710598,13.454117 3.9060001,13.454117 L11.522699,13.454117 C12.457641,13.454117 13.21556,12.69618 13.21556,11.76122 L13.21556,4.0365477 C13.21556,3.1015863 12.457641,2.3436508 11.522699,2.3436508 z M2.7341995,0 L12.8898,0 C14.399857,0 15.624,1.2241688 15.624,2.7342587 L15.624,12.737741 C15.624,14.247831 14.399857,15.472 12.8898,15.472 L8.75,15.472 8.75,29.653 21.167,29.653 21.167,22.526347 C21.167,20.049711 23.174645,18.042 25.6512,18.042 L42.306801,18.042 C44.783356,18.042 46.791,20.049711 46.791,22.526347 L46.791,38.932653 C46.791,41.40929 44.783356,43.417 42.306801,43.417 L25.6512,43.417 C23.174645,43.417 21.167,41.40929 21.167,38.932653 L21.167,32.403 7.3190002,32.403 C6.5596085,32.403 5.9440002,31.787392 5.9440002,31.028 5.9440002,30.933076 5.953619,30.840399 5.9719353,30.75089 L6,30.641743 6,15.472 2.7341995,15.472 C1.2241421,15.472 0,14.247831 0,12.737741 L0,2.7342587 C0,1.2241688 1.2241421,0 2.7341995,0 z", fill: "#FF8FABCA" }))))),
            React.createElement("div", { className: "content-wrapper", style: { width: '100%' } },
                React.createElement("div", { id: "palette-space", style: {
                        width: '27%',
                        float: 'left',
                        height: '700px',
                        overflow: 'hidden',
                    } },
                    React.createElement("div", { id: "tree", style: { width: '90%' } },
                        React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, ref: function (treeview) {
                                treeObj = treeview;
                            }, allowEditing: true, keyPress: keyPress, nodeEdited: nodeEdited, nodeSelected: nodeSelected, allowDragAndDrop: true, nodeClicked: nodeClicked }))),
                React.createElement("div", { id: "diagram-space", style: { width: '72%', float: 'right' } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '700px', snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, dataSourceSettings: {
                            id: 'Id',
                            parentId: 'ParentId',
                            dataSource: items,
                            doBinding: function (nodeModel, data, diagram) {
                                nodeModel.id = data.Id;
                            },
                        }, layout: {
                            type: 'HierarchicalTree',
                            verticalSpacing: 50,
                            horizontalSpacing: 40,
                        }, getNodeDefaults: function (node) {
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
                                ej2_react_diagrams_1.NodeConstraints.Default | ej2_react_diagrams_1.NodeConstraints.AllowDrop;
                            return node;
                        }, getConnectorDefaults: function (obj) {
                            obj.type = 'Orthogonal';
                            obj.style = { strokeColor: 'CornflowerBlue' };
                            obj.targetDecorator = {
                                shape: 'Arrow',
                                height: 10,
                                width: 10,
                                style: { fill: 'CornflowerBlue', strokeColor: 'white' },
                            };
                        }, selectionChange: function (args) {
                            if (args.state === 'Changed') {
                                if (args.type === 'Addition') {
                                    deleteButton.disabled = false;
                                    addButton.disabled = false;
                                }
                                else {
                                    deleteButton.disabled = true;
                                    addButton.disabled = true;
                                }
                                var selectedItems = diagramInstance.selectedItems.nodes.concat(diagramInstance.selectedItems.connectors);
                                if (selectedItems.length == 0) {
                                    treeObj.selectedNodes = [];
                                }
                            }
                        }, click: function (args) {
                            if (args.element instanceof ej2_react_diagrams_1.Node) {
                                treeObj.selectedNodes = [args.element.data.Id];
                            }
                        }, textEdit: function (args) {
                            setTimeout(function () {
                                if (args.annotation) {
                                    elementNodeId = args.element.id;
                                    var tempData = workingData.filter(checkElementData);
                                    var node = treeObj.getNode(tempData[0].Id);
                                    treeObj.updateNode(tempData[0].Id, args.annotation.content);
                                }
                            }, 0);
                        }, drop: function (args) {
                            var connector;
                            var tempData;
                            setTimeout(function () {
                                targetNodeId = args.target.id;
                                tempData = workingData.filter(checkData);
                                if (tempData.length > 0) {
                                    tempData[0].hasChild = true;
                                    tempData[0].expanded = true;
                                }
                                if (args.element.inEdges.length === 0) {
                                    var id = args.element.id;
                                    var item = {
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
                        }, dragEnter: function (args) {
                            var label = '';
                            if (args.dragData) {
                                label = args.dragData.text;
                            }
                            var node = {
                                id: 'node' + index,
                                data: { Name: label, Id: 'node' + index },
                                annotations: [{ content: label }],
                            };
                            args.dragItem = node;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates how to create a tree view and a diagram with a datasource. It provides support for selecting, adding, deleting, dragging and dropping, and editing annotations of the nodes during runtime. These actions will be reflected in the corresponding nodes of the tree view component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "When a node is added or removed in a Diagram during runtime, the added or removed node is reflected in the tree view component. When an annotation in the diagram is changed it should also be updated in the treeView by using treeview updateNode method. When editing a text in a treeview, use selectedItems to update it in the diagram. You can drag text from the treeview and drop it onto the node in the diagram. Also, you can perform drag and drop operations in the diagram."),
            React.createElement("br", null))));
}
exports.default = TreeViewSample;
