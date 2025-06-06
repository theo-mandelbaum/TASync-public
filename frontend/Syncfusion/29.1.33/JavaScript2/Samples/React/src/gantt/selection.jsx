import * as React from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
export class GanttSelection extends SampleBase {
    ganttInstance;
    dropdownModeList;
    dropdownTypeList;
    dropdownToggleList;
    dropdownModeListData = [
        { id: 'Row', type: 'Row' },
        { id: 'Cell', type: 'Cell' }
    ];
    dropDownTypeListData = [
        { id: 'Single', type: 'Single' },
        { id: 'Multiple', type: 'Multiple' }
    ];
    dropdownToggleListData = [
        { id: true, type: 'Enable' },
        { id: false, type: 'Disable' }
    ];
    toggleValue = false;
    perform() {
        let mode = this.dropdownModeList.value;
        let type = this.dropdownTypeList.value;
        let toggle = this.dropdownToggleList.value;
        this.ganttInstance.selectionSettings.mode = mode;
        this.ganttInstance.selectionSettings.type = type;
        this.ganttInstance.selectionSettings.enableToggle = toggle;
    }
    taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    labelSettings = {
        leftLabel: 'TaskName'
    };
    splitterSettings = {
        columnIndex: 2
    };
    selectionSettings = {
        mode: 'Row',
        type: 'Single',
        enableToggle: false
    };
    projectStartDate = new Date('03/27/2024');
    projectEndDate = new Date('07/06/2024');
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='GanttSelection' ref={gantt => this.ganttInstance = gantt} dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1} allowSelection={true} splitterSettings={this.splitterSettings} selectionSettings={this.selectionSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <Inject services={[Selection]}/>
            </GanttComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ fontSize: '15px' }}>
                      Selection Mode
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%', paddingRight: '5px' }}>
                    <div style={{ width: '150px' }}>
                      <DropDownListComponent ref={DropDownList => this.dropdownModeList = DropDownList} id='SelectionModeList' tabIndex={1} dataSource={this.dropdownModeListData} fields={{ text: 'type', value: 'id' }} value='Row'></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ fontSize: '15px' }}>
                      Selection Type
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%', paddingRight: '5px' }}>
                    <div style={{ width: '150px' }}>
                      <DropDownListComponent ref={DropDownList => this.dropdownTypeList = DropDownList} id='SelectionTypeList' tabIndex={1} dataSource={this.dropDownTypeListData} fields={{ text: 'type', value: 'id' }} value='Single'></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div style={{ fontSize: '15px' }}>
                      Toggle Selection
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%', paddingRight: '5px' }}>
                    <div style={{ width: '150px' }}>
                      <DropDownListComponent ref={DropDownList => this.dropdownToggleList = DropDownList} id='SelectionTypeList' tabIndex={1} dataSource={this.dropdownToggleListData} fields={{ text: 'type', value: 'id' }} value={this.toggleValue}></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>
                      <ButtonComponent onClick={this.perform.bind(this)}> Update </ButtonComponent>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
        <p>
          The Gantt component supports two types of selection that can be set by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#type">selectionSettings.type</a> property.
          They are:
        </p>
        <ul>
          <li><code>Single</code> - Sets a single value by default and allows only selection of a single row or a cell.</li>
          <li><code>Multiple</code> - Allows you to select multiple rows or cells. To perform the multi-selection, press and hold the CTRL key and click the desired rows or cells.</li>
        </ul>
        <p>
          The Gantt component supports three types of selection modes that can be set by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#mode">selectionSettings.mode</a> property.
          They are:
        </p>
        <ul>
          <li><code>Row</code> - Allows you to select only rows, and the row value is set by default.</li>
          <li><code>Cell</code> - Allows you to select only cells.</li>
          <li><code>Both</code> - Allows you to select rows and cells at the same time..</li>
        </ul>
        <p>
          The Gantt component supports toggle selection that can be set by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#enabletoggle">selectionSettings.enableToggle</a> property.
        </p>
        </div>
      </div>);
    }
}
