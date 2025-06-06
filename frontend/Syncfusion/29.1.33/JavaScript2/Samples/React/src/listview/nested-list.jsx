/**
 * ListView Nested Sample
 */
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';
import { nestedListData } from './listData';
const FolderCss = `
.e-listview .e-list-icon,
.e-bigger .e-listview .e-list-icon {
    height: 24px;
    width: 30px;
}
#listview {
    max-width: 500px;
    margin: auto;
    border: 1px solid #dddddd;
    border-radius: 3px;
}
.folder {
    background-repeat: no-repeat;
    background-image: url('./src/listview/images/file_icons.png');
    background-position: -5px -466px;
    background-size: 302%;
}

.file {
    background-repeat: no-repeat;
    background-image: url('./src/listview/images/file_icons.png');
    background-position: -5px -151px;
    background-size: 302%;
}`;
export class Nested extends SampleBase {
    //Map appropriate columns to fields property
    fields = {
        iconCss: 'icon', tooltip: 'text'
    };
    animation = { duration: 0 };
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <style>
                {FolderCss}
            </style>

        {/* ListView element */}
        <ListViewComponent id='listview' dataSource={nestedListData} fields={this.fields} headerTitle='Folders' showIcon={true} showHeader={true} animation={this.animation}></ListViewComponent>
        </div>

        <div id="action-description">
            <p>This sample demonstrates the nested list functionalities, which allows you to navigate to the sub list items by clicking any item and navigating back to the list item using the back icon at the top left.
            </p>
        </div>

        <div id="description">
            <p>The ListView component supports nested list. To achieve list navigation, the <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view/fieldSettings/#child'>child</a></code> property should be defined for the nested list in the array of JSON.</p>
    
            <p>This sample have nested folder with the sub folders or files.</p>
        </div>
      </div>);
    }
}
