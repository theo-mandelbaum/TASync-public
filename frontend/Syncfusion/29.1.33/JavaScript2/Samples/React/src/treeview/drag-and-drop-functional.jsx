import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { closest } from '@syncfusion/ej2-base';
import './drag-and-drop.css';
import * as dataSource from './dataSource/drag-data.json';
const Dragdrop = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [display, setDisplay] = useState('');
    const data = dataSource;
    let listObj = useRef(null);
    let id = 1;
    // Render the first TreeView by mapping its fields property with data source properties
    const field = { dataSource: data.dragData1, id: 'id', text: 'name', child: 'child' };
    const allowDragAndDrop = true;
    // Render the second TreeView by mapping its fields property with data source properties     
    const fields = { dataSource: data.dragData2, id: 'id', text: 'name', child: 'child', selected: 'isSelected' };
    const allowDragAndDrops = true;
    const onDragStop = (args) => {
        let targetEle = closest(args.target, '.e-droppable');
        targetEle = targetEle ? targetEle : args.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            args.cancel = true;
            let newData = [];
            if (args.draggedNode.classList.contains('e-active')) {
                let dragNode = closest(args.draggedNode, '.e-treeview');
                let selNodes = dragNode.ej2_instances[0].selectedNodes;
                for (let i = 0, len = selNodes.length; i < len; i++) {
                    let nodeEle = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    let nodeText = nodeEle.textContent;
                    let newNode = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                    id++;
                    newData.push(newNode);
                }
            }
            else {
                let text = 'text';
                let nodeText = args.draggedNodeData[text];
                let newNode = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                id++;
                newData.push(newNode);
            }
            // Add collection of node to ListView
            listObj.current.addItem(newData, undefined);
        }
    };
    const removeElement = () => {
        setDisplay("none");
    };
    const removeNode = (event) => {
        if (event.target.classList.contains("custom-delete")) {
            let node = closest(event.target, "li");
            listObj.current.removeItem(node);
        }
    };
    return (<div className="control-pane">
            <div className="col-lg-12 control-section custom-tree">
                <div className="control-wrapper">
                    <div className="col-lg-4 tree1-data">
                        <p className="displayText">TreeView-1</p>
                        <div className="content">
                            <TreeViewComponent id='tree1' fields={field} nodeDragStop={onDragStop.bind(this)} allowDragAndDrop={allowDragAndDrop}/>
                        </div>
                    </div>
                    <div className="col-lg-4 tree2-data">
                        <p className="displayText">TreeView-2</p>
                        <div className="content">
                            <TreeViewComponent id='tree2' fields={fields} nodeDragStop={onDragStop.bind(this)} allowDragAndDrop={allowDragAndDrops}/>
                        </div>
                    </div>
                    <div className="col-lg-4 tree3-data">
                        <p className="displayText">ListView</p>
                        <div className="content">
                            <div onMouseDown={removeNode}>
                                <ListViewComponent id="list" className="e-droppable" dataSource={[]} ref={listObj} cssClass={'custom-list'} template="<div class='dropped-list-view-item'><span>${text}</span><span id=${iconId} class=${class}></span></div>"/>
                            </div>
                        </div>
                    </div>
                    <div id="overlay" style={{ display: display }} onMouseDown={removeElement}></div>
                </div>
            </div>
            <div id="action-description">
                <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the drag and drop functionality of TreeView. A drag and drop image is present at the top of the sample which hides on clicking the sample. To drag and drop node, select and drag the desired node and drop it on the target node or external container.</p>
            </div>
            <div id="description">
                <p>The <code>TreeView</code> component allows users to drag any node and drop it on any other node in the same or different tree using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview#allowdraganddrop">allowDragAndDrop</a> property. Additionally, it supports dropping a tree node to an external container using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview#nodedragstop">nodeDragStop</a> event of the TreeView</p>
                <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/drag-and-drop/" target="_blank">Drag and Drop</a> section from the documentation.</p>
            </div>
        </div>);
};
export default Dragdrop;
