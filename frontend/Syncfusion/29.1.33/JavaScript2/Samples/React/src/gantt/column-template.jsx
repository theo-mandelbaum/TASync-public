import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { templateData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
export class ColumnTemplate extends SampleBase {
    columnTemplate(props) {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        if ((props.ganttProperties.resourceNames)) {
            let gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
            if (gantt.enableRtl) {
                return (<div className='columnTemplate'>
            <img src={src} height='40px' width='40px' alt={props.ganttProperties.resourceNames}/>
            <div style={{ display: "inline-block", width: '100%', position: "relative", right: "30px" }}>{props.ganttProperties.resourceNames}</div>
          </div>);
            }
            else {
                return (<div className='columnTemplate'>
            <img src={src} height='40px' width='40px' alt={props.ganttProperties.resourceNames}/>
            <div style={{ display: "inline-block", width: '100%', position: "relative", left: "30px" }}>{props.ganttProperties.resourceNames}</div>
          </div>);
            }
        }
        else {
            return <div></div>;
        }
    }
    template = this.columnTemplate.bind(this);
    taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        resourceInfo: 'resources',
        child: 'subtasks'
    };
    resourceFields = {
        id: 'resourceId',
        name: 'resourceName'
    };
    labelSettings = {
        leftLabel: 'TaskName'
    };
    splitterSettings = {
        columnIndex: 3
    };
    projectStartDate = new Date('03/24/2024');
    projectEndDate = new Date('07/06/2024');
    render() {
        return (<div className='control-pane'>
       <div className='control-section'>
          <GanttComponent id='ColumnMenu' rowHeight={60} resourceFields={this.resourceFields} resources={editingResources} dataSource={templateData} highlightWeekends={true} treeColumnIndex={1} splitterSettings={this.splitterSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='Task ID' width='80' textAlign="Left"></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='resources' headerText='Resources' width='250' template={this.template}></ColumnDirective>
              <ColumnDirective field='StartDate' width='150'></ColumnDirective>
              <ColumnDirective field='Duration' width='150'></ColumnDirective>
              <ColumnDirective field='Progress' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection]}/>
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the usage of template columns in Gantt. 
        In this sample, we have shown custom images in the Resources column.</p>
        </div>

        <div id="description">
        <p>The Gantt provides a way to use a custom layout for each cell using the column template feature. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#template">columns -&gt; template</a> property accepts the template for the cell.</p>
        <p>In this demo, using column template, resource column has been presented with employee photo</p>
      </div>
      </div>);
    }
}
