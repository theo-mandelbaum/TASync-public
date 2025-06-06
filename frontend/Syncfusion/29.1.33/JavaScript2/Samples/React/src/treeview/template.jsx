import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './template.css';
import * as dataSource from './dataSource/template-data.json';
export class Template extends SampleBase {
    data = dataSource;
    fields = { dataSource: this.data.templateData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    cssClass = "template-tree";
    nodeTemplate(data) {
        return (<div>
            <div className="treeviewdiv">
              <div className="textcontent">
                <span className="treeName">{data.name}</span>
              </div>
               {data.count &&
                <div className="countcontainer">
                  <span className="treeCount e-badge e-badge-primary">{data.count}</span> 
                </div>}
            </div>
          </div>);
    }
    ;
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
        <div className='tree-control-wrapper'>
          {/* Render the TreeView using template option */}
            <TreeViewComponent fields={this.fields} nodeTemplate={this.nodeTemplate} cssClass={this.cssClass}/>
        </div>
        </div>
        <div id="action-description">
            <p>This <a href="https://www.syncfusion.com/react-ui-components/react-treeview" target="_blank">React TreeView example</a> demonstrates the template functionalities of the TreeView. Select the root node by clicking on it, or expand the root node and select the customized child node.</p>
        </div>
        <div id="description">
            <p>The <code>TreeView</code> component has an option to customize the node structure through the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treeview#nodetemplate">nodeTemplate</a> property, so that the tree node can be formed with any custom structure.</p>
            <p>In this demo, the node is formed as like webmail with folder name and number of unread messages.</p>
            <p>For more information, you can refer to the <a href="https://ej2.syncfusion.com/react/documentation/treeview/template/" target="_blank">Templates</a> section from the documentation.</p>
        </div>
      </div>);
    }
}
