import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GanttComponent, Inject, Filter, ColumnsDirective, ColumnDirective, Selection } from '@syncfusion/ej2-react-gantt';
import { filteredData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class Filtering extends SampleBase {
    ganttInstance;
    filterType = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Excel', value: 'Excel' }
    ];
    modes = [
        { text: 'Parent', value: 'Parent' },
        { text: 'Child', value: 'Child' },
        { text: 'Both', value: 'Both' },
        { text: 'None', value: 'None' },
    ];
    onChange(sel) {
        let type = sel.value.toString();
        this.ganttInstance.filterSettings.type = type;
        this.ganttInstance.clearFiltering();
    }
    onChange2(sel) {
        let mode = sel.value.toString();
        this.ganttInstance.filterSettings.hierarchyMode = mode;
        this.ganttInstance.clearFiltering();
    }
    taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    projectStartDate = new Date('07/16/2024 01:00:00 AM');
    projectEndDate = new Date('07/25/2024');
    timelineSettings = {
        timelineUnitSize: 60,
        topTier: {
            format: 'MMM dd, yyyy',
            unit: 'Day',
        },
        bottomTier: {
            unit: 'Hour',
            format: 'h.mm a'
        },
    };
    splitterSettings = {
        columnIndex: 3
    };
    dayWorkingTime = [{ from: 0, to: 24 }];
    labelSettings = {
        rightLabel: 'TaskName'
    };
    actionCompleteEvent(args) {
        if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")
            && this.ganttInstance.filterSettings.type === "Menu") {
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(2024, 5, 1);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(2024, 8, 30);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='col-md-9'>
            <GanttComponent id='Filtering' ref={gantt => this.ganttInstance = gantt} dataSource={filteredData} durationUnit='Hour' treeColumnIndex={0} allowFiltering={true} includeWeekend={true} allowSorting={true} dateFormat='MM/dd/yyyy hh:mm:ss' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} taskFields={this.taskFields} timelineSettings={this.timelineSettings} splitterSettings={this.splitterSettings} labelSettings={this.labelSettings} filterSettings={{ type: 'Menu', hierarchyMode: 'Parent' }} dayWorkingTime={this.dayWorkingTime} height='410px' actionComplete={this.actionCompleteEvent.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='TaskName' headerText='Task Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
                <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
                <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
                <ColumnDirective field='Predecessor' headerText='Predecessor'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Filter, Selection]}/>
            </GanttComponent>
            <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Apollo_11#Launch_and_flight_to_lunar_orbit" target='_blank'>https://en.wikipedia.org/</a>
          </div>
            </div>
          <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tr>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px' }}> Filter Type </div>
                    </td>
                    <td style={{ width: '70%' }}>
                      <div>
                         <DropDownListComponent width="100px" id="seltype" change={this.onChange.bind(this)} dataSource={this.filterType} value="Menu"/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px' }}> Hierarchy Mode </div>
                    </td>
                    <td style={{ width: '70%' }}>
                      <div>
                         <DropDownListComponent width="100px" id="selmode" change={this.onChange2.bind(this)} dataSource={this.modes} value="Parent"/>
                      </div>
                    </td>
                  </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample visualizes the manned lunar mission, which landed the first human on the Moon using the Apollo 11
            spacecraft in the year 1969.
            This sample demonstrates the Filtering feature available in Gantt chart. You can
            filter a particular column using filter menu available in the columns. This sample is also enabled with toolbar
            searching option, using which you can filter the Gantt content across all the columns.</p>
        </div>

        <div id="description">
          <p>
            The filtering feature enables the user to view reduced amount of records based on filter criteria. The column
            menu filtering can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowfiltering">allowFiltering</a> property as <code>true</code> and toolbar
            search box can be enabled by including the search item in the <code>toolbar</code> property.
            <p>Gantt supports the following filter types. They are </p>
            <ul>
                <li><code>Menu</code></li>
                <li><code>Excel</code></li>
            </ul>
            Gantt chart also provides support for a set of filtering modes with <code>hierarchyMode</code> property. The
            below are the
            type of filter mode available in Gantt chart.
            <li><code>Parent</code> - This is the default filter hierarchy mode in Gantt chart. The filtered records are
              displayed with its
              parent records, if the filtered records not have any parent record then the filtered record alone will be
              displayed.</li>
            <li><code>Child</code> - The filtered records are displayed with its child record, if the filtered records do
              not have any
              child record then only the filtered records are displayed.</li>
            <li><code>Both</code> - The filtered records are displayed with its both parent and child record. If the
              filtered records do
              not have any parent and child record then only the filtered records are displayed.</li>
            <li><code>None</code> - Only the filtered records are displayed.</li>
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use filtering feature, we need
            to inject <code>Filter</code> module, and use the toolbar support we need to inject <code>Toolbar</code> module.
            To use a selection, inject the <code>Selection</code> module.
          </p>
        </div>
      </div>);
    }
}
