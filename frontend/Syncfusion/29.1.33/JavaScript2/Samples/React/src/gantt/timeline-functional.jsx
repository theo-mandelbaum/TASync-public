import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, Sort, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
const Timeline = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const taskFields = {
        id: 'taskID',
        name: 'taskName',
        startDate: 'startDate',
        endDate: 'endDate',
        duration: 'duration',
        progress: 'progress',
        dependency: 'predecessor',
        child: 'subtasks'
    };
    let ganttInstance = useRef(null);
    let topTierformat = useRef(null);
    let bottomTierformat = useRef(null);
    let topTierCheckbox = useRef(null);
    let bottomTierCheckbox = useRef(null);
    let topTierUnit = useRef(null);
    let bottomTierUnit = useRef(null);
    let topTierCount = useRef(null);
    let bottomTierCount = useRef(null);
    let timelineUnitSize = useRef(null);
    let multitaskbarcheckbox = useRef(null);
    const projectStartDate = new Date('02/03/2024');
    const projectEndDate = new Date('03/23/2024');
    const timelineSettings = {
        topTier: {
            format: 'MMM dd, yyyy',
            unit: 'Week',
        },
        bottomTier: {
            unit: 'Day',
        }
    };
    let labelSettings = {
        rightLabel: 'taskName'
    };
    let splitterSettings = {
        columnIndex: 1
    };
    const yearformat = [
        { id: 'MMM "yy', format: 'Jan "18' },
        { id: 'y', format: '2018' },
        { id: 'MMMM, y', format: 'January, 18' },
    ];
    const monthformat = [
        { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
        { id: 'MMMM', format: 'January' },
        { id: 'MMM', format: 'Jan' },
    ];
    const weekformat = [
        { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
        { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
        { id: 'EEE MMM dd', format: 'Mon Jan 01' },
    ];
    const dayformat = [
        { id: '', format: 'M' },
        { id: 'EEE', format: 'Mon' },
        { id: 'dd', format: '01' },
    ];
    const hourformat = [
        { id: 'hh', format: '00' },
        { id: 'hh : mm a', format: '00 : 00 AM' },
        { id: 'h : mm a', format: '0 : 00 AM' },
    ];
    const unit = [
        { id: 'Year', unit: 'Year' },
        { id: 'Month', unit: 'Month' },
        { id: 'Week', unit: 'Week' },
        { id: 'Day', unit: 'Day' },
        { id: 'Hour', unit: 'Hour' }
    ];
    const multitaskbarCheck = (props) => {
        if (multitaskbarcheckbox.current.checked) {
            ganttInstance.current.enableMultiTaskbar = true;
        }
        else {
            ganttInstance.current.enableMultiTaskbar = false;
        }
    };
    const topTierCick = (props) => {
        if (topTierCheckbox.current.checked) {
            ganttInstance.current.timelineSettings.topTier.unit = 'Week';
            topTierCount.current.enabled = true;
            topTierformat.current.enabled = true;
            topTierUnit.current.enabled = true;
        }
        else {
            ganttInstance.current.timelineSettings.topTier.unit = 'None';
            topTierCount.current.enabled = false;
            topTierformat.current.enabled = false;
            topTierUnit.current.enabled = false;
        }
    };
    const bottomTierCick = (props) => {
        if (bottomTierCheckbox.current.checked) {
            ganttInstance.current.timelineSettings.bottomTier.unit = 'Day';
            bottomTierCount.current.enabled = true;
            bottomTierformat.current.enabled = true;
            bottomTierUnit.current.enabled = true;
        }
        else {
            ganttInstance.current.timelineSettings.bottomTier.unit = 'None';
            bottomTierCount.current.enabled = false;
            bottomTierformat.current.enabled = false;
            bottomTierUnit.current.enabled = false;
        }
    };
    const topTierCountchange = (e) => {
        let count = e.value;
        ganttInstance.current.timelineSettings.topTier.count = count;
    };
    const bottomTierCountchange = (e) => {
        let count = e.value;
        ganttInstance.current.timelineSettings.bottomTier.count = count;
    };
    const topUnitChange = (e) => {
        let unit = e.value;
        ganttInstance.current.timelineSettings.topTier.unit = unit;
        if (unit === 'Year') {
            topTierformat.current.dataSource = yearformat;
        }
        else if (unit === 'Month') {
            topTierformat.current.dataSource = monthformat;
        }
        else if (unit === 'Week') {
            topTierformat.current.dataSource = weekformat;
        }
        else if (unit === 'Day') {
            topTierformat.current.dataSource = dayformat;
        }
        else {
            topTierformat.current.dataSource = hourformat;
        }
        topTierformat.current.refresh();
        updateUnitWidth(unit, 'top');
        ganttInstance.current.timelineSettings.topTier.unit = unit;
    };
    const bottomUnitChange = (e) => {
        let unit = e.value;
        ganttInstance.current.timelineSettings.bottomTier.unit = unit;
        if (unit === 'Year') {
            bottomTierformat.current.dataSource = yearformat;
        }
        else if (unit === 'Month') {
            bottomTierformat.current.dataSource = monthformat;
        }
        else if (unit === 'Week') {
            bottomTierformat.current.dataSource = weekformat;
        }
        else if (unit === 'Day') {
            bottomTierformat.current.dataSource = dayformat;
        }
        else {
            bottomTierformat.current.dataSource = hourformat;
        }
        bottomTierformat.current.refresh();
        updateUnitWidth(unit, 'bottom');
        ganttInstance.current.timelineSettings.bottomTier.unit = unit;
    };
    const bottomFormatChange = (e) => {
        let format = e.value;
        ganttInstance.current.timelineSettings.bottomTier.format = format.toString();
    };
    const topFormatChange = (e) => {
        let format = e.value;
        ganttInstance.current.timelineSettings.topTier.format = format.toString();
    };
    const unitWidth = (e) => {
        let width = e.value;
        ganttInstance.current.timelineSettings.timelineUnitSize = width;
    };
    let unitField = { text: 'unit', value: 'id' };
    let formatField = { text: 'format', value: 'id' };
    const updateUnitWidth = (unit, tier) => {
        let topUnit = tier === 'top' ? unit : ganttInstance.current.timelineSettings.topTier.unit;
        let bottomUnit = tier === 'bottom' ? unit : ganttInstance.current.timelineSettings.bottomTier.unit;
        let units = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
        let bootomCellUnit;
        let unitWidth;
        if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = 'Day';
        }
        else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
            bootomCellUnit = bottomUnit;
        }
        else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = topUnit;
        }
        else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
            bootomCellUnit = topUnit;
        }
        else {
            bootomCellUnit = bottomUnit;
        }
        if (bootomCellUnit === 'Year') {
            unitWidth = 2000;
        }
        else if (bootomCellUnit === 'Month') {
            unitWidth = 300;
        }
        else if (bootomCellUnit === 'Week') {
            unitWidth = 150;
        }
        else if (bootomCellUnit === 'Day') {
            unitWidth = 33;
        }
        else if (bootomCellUnit === 'Hour') {
            unitWidth = 25;
        }
        timelineUnitSize.current.value = unitWidth;
    };
    return (<div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-8'>
          <GanttComponent id='Timeline' ref={ganttInstance} dataSource={projectData} renderBaseline={true} allowSorting={true} treeColumnIndex={1} allowSelection={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} taskFields={taskFields} timelineSettings={timelineSettings} highlightWeekends={true} height='463px' labelSettings={labelSettings} splitterSettings={splitterSettings}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' visible={false}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
              <ColumnDirective field='endDate' headerText='End Date'></ColumnDirective>
              <ColumnDirective field='duration' headerText='Duration'></ColumnDirective>
              <ColumnDirective field='predecessor' headerText='Dependency'></ColumnDirective>
              <ColumnDirective field='progress' headerText='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Sort, DayMarkers]}/>
          </GanttComponent>
        </div>
        <div className='col-lg-4 property-section'>
        <PropertyPane title="Properties">
          <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
            <colgroup>
              <col style={{ width: '30%' }}/>
              <col style={{ width: '70%' }}/>
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <div>Unit width</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={timelineUnitSize} format="n" value={33} min={10} change={unitWidth.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div><b>Top tier</b></div>
                </td>
                <td>
                  <div>
                    <CheckBoxComponent ref={topTierCheckbox} id="topTierCheck" onClick={topTierCick.bind(this)} className="checkbox" checked/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Count</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={topTierCount} id="count" format="n" min={1} max={50} value={1} className="form-control" change={topTierCountchange.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Unit</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={topTierUnit} id="unit" tabIndex={1} dataSource={unit} fields={unitField} value="Week" change={topUnitChange.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Format</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={topTierformat} id="topformat" tabIndex={1} dataSource={weekformat} fields={formatField} value="MMM dd, yyyy" change={topFormatChange.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div><b>Bottom tier</b></div>
                </td>
                <td>
                  <div>
                    <CheckBoxComponent ref={bottomTierCheckbox} id="bottomTierCheck" onClick={bottomTierCick.bind(this)} className="checkbox" checked/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Count</div>
                </td>
                <td>
                  <div>
                    <NumericTextBoxComponent ref={bottomTierCount} id="count" format="n" min={1} max={50} value={1} className="form-control" change={bottomTierCountchange.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Unit</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={bottomTierUnit} id="unit" tabIndex={1} dataSource={unit} fields={unitField} value="Day" change={bottomUnitChange.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Format</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent ref={bottomTierformat} id="btFormat" tabIndex={1} dataSource={dayformat} fields={formatField} value="" change={bottomFormatChange.bind(this)}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Enable multitaskbar</div>
                </td>
                <td>
                  <div>
                    <CheckBoxComponent ref={multitaskbarcheckbox} id="multitaskbarCheck" onClick={multitaskbarCheck.bind(this)} className="checkbox" checked={false}/>
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
    </div>);
};
export default Timeline;
