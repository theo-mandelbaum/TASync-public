import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, TimelineViewMode, Inject, Selection, Sort, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, CheckBox } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent, NumericTextBox } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';

export class Timeline extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    child: 'subtasks'
  };
  private ganttInstance: GanttComponent;
  private topTierformat: DropDownListComponent;
  private bottomTierformat: DropDownListComponent;
  private topTierCheckbox: CheckBoxComponent;
  private bottomTierCheckbox: CheckBoxComponent;
  private topTierUnit: DropDownListComponent;
  private bottomTierUnit: DropDownListComponent;
  private topTierCount: NumericTextBoxComponent;
  private bottomTierCount: NumericTextBoxComponent;
  private timelineUnitSize: NumericTextBoxComponent;
  private multitaskbarcheckbox: CheckBoxComponent;
  public projectStartDate = new Date('02/03/2024');
  public projectEndDate = new Date('03/23/2024');
  public timelineSettings: any = {
    topTier: {
      format: 'MMM dd, yyyy',
      unit: 'Week',
    },
    bottomTier: {
      unit: 'Day',
    }
  };
  private labelSettings: any = {
    rightLabel: 'taskName'
  };
  private splitterSettings: any = {
    columnIndex: 1
  };
  public yearformat: { [key: string]: Object }[] = [
    { id: 'MMM "yy', format: 'Jan "18' },
    { id: 'y', format: '2018' },
    { id: 'MMMM, y', format: 'January, 18' },
  ];
  public monthformat: { [key: string]: Object }[] = [
    { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
    { id: 'MMMM', format: 'January' },
    { id: 'MMM', format: 'Jan' },
  ];
  public weekformat: { [key: string]: Object }[] = [
    { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
    { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
    { id: 'EEE MMM dd', format: 'Mon Jan 01' },
  ];
  public dayformat: { [key: string]: Object }[] = [
    { id: '', format: 'M' },
    { id: 'EEE', format: 'Mon' },
    { id: 'dd', format: '01' },
  ];
  public hourformat: { [key: string]: Object }[] = [
    { id: 'hh', format: '00' },
    { id: 'hh : mm a', format: '00 : 00 AM' },
    { id: 'h : mm a', format: '0 : 00 AM' },
  ];
  public unit: { [key: string]: Object }[] = [
    { id: 'Year', unit: 'Year' },
    { id: 'Month', unit: 'Month' },
    { id: 'Week', unit: 'Week' },
    { id: 'Day', unit: 'Day' },
    { id: 'Hour', unit: 'Hour' }
  ];
  public topTierCick(props): any {
    if (this.topTierCheckbox.checked) {
      this.ganttInstance.timelineSettings.topTier.unit = 'Week';
      this.topTierCount.enabled = true;
      this.topTierformat.enabled = true;
      this.topTierUnit.enabled = true;
    } else {
      this.ganttInstance.timelineSettings.topTier.unit = 'None';
      this.topTierCount.enabled = false;
      this.topTierformat.enabled = false;
      this.topTierUnit.enabled = false;
    }
  }
  public bottomTierCick(props): any {
    if (this.bottomTierCheckbox.checked) {
      this.ganttInstance.timelineSettings.bottomTier.unit = 'Day';
      this.bottomTierCount.enabled = true;
      this.bottomTierformat.enabled = true;
      this.bottomTierUnit.enabled = true;
    } else {
      this.ganttInstance.timelineSettings.bottomTier.unit = 'None';
      this.bottomTierCount.enabled = false;
      this.bottomTierformat.enabled = false;
      this.bottomTierUnit.enabled = false;
    }
  }
  public topTierCountchange(e): any {
    let count: number = e.value;
    this.ganttInstance.timelineSettings.topTier.count = count;
  }
  public bottomTierCountchange(e): any {
    let count: number = e.value;
    this.ganttInstance.timelineSettings.bottomTier.count = count;
  }
  public topUnitChange(e): any {
    let unit: string = e.value;
    this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      this.topTierformat.dataSource = this.yearformat;
    } else if (unit === 'Month') {
      this.topTierformat.dataSource = this.monthformat;
    } else if (unit === 'Week') {
      this.topTierformat.dataSource = this.weekformat;
    } else if (unit === 'Day') {
      this.topTierformat.dataSource = this.dayformat;
    } else {
      this.topTierformat.dataSource = this.hourformat;
    }
    this.topTierformat.refresh();
    this.updateUnitWidth(unit, 'top');
    this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
  }
  public bottomUnitChange(e): any {
    let unit: string = e.value;
    this.ganttInstance.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
    if (unit === 'Year') {
      this.bottomTierformat.dataSource = this.yearformat;
    } else if (unit === 'Month') {
      this.bottomTierformat.dataSource = this.monthformat;
    } else if (unit === 'Week') {
      this.bottomTierformat.dataSource = this.weekformat;
    } else if (unit === 'Day') {
      this.bottomTierformat.dataSource = this.dayformat;
    } else {
      this.bottomTierformat.dataSource = this.hourformat;
    }
    this.bottomTierformat.refresh();
    this.updateUnitWidth(unit, 'bottom');
    this.ganttInstance.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
  }
  public bottomFormatChange(e): any {
    let format: string = e.value;
    this.ganttInstance.timelineSettings.bottomTier.format = format.toString();
  }
  public topFormatChange(e): any {
    let format: string = e.value;
    this.ganttInstance.timelineSettings.topTier.format = format.toString();
  }
  public unitWidth(e): any {
    let width: number = e.value;
    this.ganttInstance.timelineSettings.timelineUnitSize = width;
  }
  public multitaskbarCheck(props): any {
    if (this.multitaskbarcheckbox.checked) {
      this.ganttInstance.enableMultiTaskbar = true;
    } else {
      this.ganttInstance.enableMultiTaskbar = false;
    }
  }
  private unitField: any = { text: 'unit', value: 'id' }
  private formatField: any = { text: 'format', value: 'id' };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-8'>
            <GanttComponent id='Timeline' ref={gantt => this.ganttInstance = gantt} dataSource={projectData} renderBaseline={true} allowSorting={true}
              treeColumnIndex={1} allowSelection={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
              taskFields={this.taskFields} timelineSettings={this.timelineSettings} highlightWeekends={true}
              height='463px' labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}>
              <ColumnsDirective>
                <ColumnDirective field='taskID' visible={false} ></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Name' width='250'></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
                <ColumnDirective field='endDate' headerText='End Date'></ColumnDirective>
                <ColumnDirective field='duration' headerText='Duration'></ColumnDirective>
                <ColumnDirective field='predecessor' headerText='Dependency'></ColumnDirective>
                <ColumnDirective field='progress' headerText='Progress'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection, Sort, DayMarkers]} />
            </GanttComponent>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                       <div>Unit width</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.timelineUnitSize = NumericTextBox} format='n' value={33} min={10} change={this.unitWidth.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div><b>Top tier</b></div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <CheckBoxComponent ref={CheckBox => this.topTierCheckbox = CheckBox} id="topTierCheck" onClick={this.topTierCick.bind(this)} className="checkbox" checked={true} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Count</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.topTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={this.topTierCountchange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Unit</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.topTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={this.unit} fields={this.unitField}
                          value='Week' change={this.topUnitChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Format</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.topTierformat = DropDownList} id='topformat' tabIndex={1} dataSource={this.weekformat}
                          fields={this.formatField} value='MMM dd, yyyy' change={this.topFormatChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div><b>Bottom tier</b></div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <CheckBoxComponent ref={CheckBox => this.bottomTierCheckbox = CheckBox} id="bottomTierCheck" onClick={this.bottomTierCick.bind(this)} className="checkbox" checked={true} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Count</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <NumericTextBoxComponent ref={NumericTextBox => this.bottomTierCount = NumericTextBox} id="count" format='n' min={1} max={50} value={1} className="form-control" change={this.bottomTierCountchange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Unit</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.bottomTierUnit = DropDownList} id='unit' tabIndex={1} dataSource={this.unit} fields={this.unitField}
                          value='Day' change={this.bottomUnitChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Format</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <DropDownListComponent ref={DropDownList => this.bottomTierformat = DropDownList} id='btFormat' tabIndex={1} dataSource={this.dayformat}
                          fields={this.formatField} value='' change={this.bottomFormatChange.bind(this)} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '30%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>Enable multitaskbar</div>
                    </td>
                    <td style={{ width: '70%', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <div>
                        <CheckBoxComponent ref={CheckBox => this.multitaskbarcheckbox = CheckBox} id="multitaskbarCheck" onClick={this.multitaskbarCheck.bind(this)} className="checkbox" checked={false} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>

        </div>
        <div id="action-description">
          <p>This sample illustrates the different phases from planning to delivery, involved in a software development
              lifecycle.
              This sample demonstrates the different timeline modes available in Gantt chart. Options are available to change
              the unit,
        format and count of the header texts for both top and bottom timeline headers.</p>
        </div>

        <div id="description">
          <p>
            In this example, you can see how to change the timeline settings in Gantt chart. The top and bottom timeline
            header texts can be customized by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#toptier">timelineSettings.topTier</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/timelineSettingsModel/#bottomtier">timelineSettings.bottomTier</a> properties                                                          Using these properties, you can change the format, count, and units of the timeline header texts.
          </p>
          <p>
            Gantt chart has built-in support for many timeline modes such as minutes, hour, day, week, month and year.
          </p>
          <p> 
            The default timeline headers can also be replaced with custom header texts by using the <code>formatter</code> method.
          </p>
          <p>
            Tooltip is enabled by default for the timeline headers, to see the tooltip in action, hover a point or tap on a
            point in touch enabled devices.
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the
            <code>Selection</code> module. To use markers in Gantt, inject the <code>DayMarkers</code> module.
          </p>
          <p>
            If the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enablemultitaskbar">enableMultiTaskbar</a> property is enabled, it displays child taskbars in the parent row when in collapsed state.
          </p>
        </div>
      </div>
    )
  }
  
  private updateUnitWidth(unit: string, tier: string): void {
   let topUnit: string = tier === 'top' ? unit : this.ganttInstance.timelineSettings.topTier.unit;
   let bottomUnit: string = tier === 'bottom' ? unit : this.ganttInstance.timelineSettings.bottomTier.unit;
   let units: string[] = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
   let bootomCellUnit: string;
   let unitWidth: number;
   if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
       bootomCellUnit = 'Day';
   } else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
       bootomCellUnit = bottomUnit;
   } else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
       bootomCellUnit = topUnit;
   } else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
       bootomCellUnit = topUnit;
   } else {
       bootomCellUnit = bottomUnit;
   }
   if (bootomCellUnit === 'Year') {
       unitWidth = 2000;
   } else if (bootomCellUnit === 'Month') {
       unitWidth = 300;
   } else if (bootomCellUnit === 'Week') {
       unitWidth = 150;
   } else if (bootomCellUnit === 'Day') {
       unitWidth = 33;
   } else if (bootomCellUnit === 'Hour') {
       unitWidth = 25;
   }
   this.timelineUnitSize.value = unitWidth;
   }  
}
