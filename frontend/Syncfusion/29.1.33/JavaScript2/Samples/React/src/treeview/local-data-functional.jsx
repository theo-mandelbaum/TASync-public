import * as React from 'react';
import { useEffect } from "react";
import { updateSampleSection } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './local-data.css';
import * as dataSource from './dataSource/local-data.json';
const LocalData = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const SAMPLE_CSS = `
    .control-section {
        overflow: auto;
    }`;
    const data = dataSource;
    // Hierarchical data source for TreeView component
    const fields = { dataSource: data.hierarchicalData, id: 'code', text: 'name', child: 'countries' };
    // Self-referential list data source for TreeView component
    const listfields = { dataSource: data.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    return (<div className='control-pane'>
      <style>{SAMPLE_CSS}</style>
      <div className='control-section'>
        <div className='col-lg-6 nested-data'>
          <div className='content'>
            <p className="displayText">Hierarchical Data</p>
            <TreeViewComponent id='tree' fields={fields}/>
          </div>
        </div>
        <div className='col-lg-6 list-data'>
          <div className='content'>
            <p className="displayText">List Data</p>
            <TreeViewComponent id='listtree' fields={listfields}/>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the binding of local data to the TreeView. Click on node to select it, and click on icon or double click on node to expand/collapse it.</p>
      </div>
        <div id="description">
            <p>The TreeView component loads the data through the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#datasource">dataSource</a> property, where the data can be either local data or remote data. In case of local data, the data structure can be hierarchical data or list data (with self-referential format i.e., mapped with the <b>id</b> and <b>parentID</b> fields).</p>
            <p>In this demo, the first TreeView is bound with the hierarchical data that contains array of nested objects. And the second TreeView is bound with the list type data where the parent-child relation is referred by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#id">id</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#parentid">parentID</a> mapping fields.</p>
            <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/data-binding/#local-data" target="_blank">Data Binding</a> section from the documentation.</p>
        </div>
    </div>);
};
export default LocalData;
