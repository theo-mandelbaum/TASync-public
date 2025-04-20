import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, ExcelExport, PdfExport, ColumnsDirective, ColumnDirective, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
export class Exporting extends SampleBase {
    ganttInstance;
    isFitToWidth;
    taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks',
        resourceInfo: 'resources'
    };
    resourceFields = {
        id: 'resourceId',
        name: 'resourceName'
    };
    splitterSettings = {
        position: "35%"
    };
    projectStartDate = new Date('03/25/2024');
    projectEndDate = new Date('07/28/2024');
    gridLines = 'Both';
    toolbar = ['ExcelExport', 'CsvExport', 'PdfExport'];
    timelineSettings = {
        topTier: {
            unit: 'Week',
            format: 'MMM dd, y',
        },
        bottomTier: {
            unit: 'Day',
        },
    };
    eventMarkers = [
        {
            day: new Date('04/02/2024'),
        }, {
            day: new Date("04/09/2024"),
            label: 'Research phase'
        }, {
            day: new Date("04/30/2024"),
            label: 'Design phase'
        }, {
            day: new Date("05/23/2024"),
            label: 'Production phase'
        }, {
            day: new Date("06/20/2024"),
            label: 'Sales and marketing phase'
        }
    ];
    holidays = [
        {
            from: new Date('04/04/2024'),
            to: new Date('04/04/2024'),
            label: 'Local Holiday'
        }, {
            from: new Date('04/19/2024'),
            to: new Date('04/19/2024'),
            label: 'Good Friday'
        }, {
            from: new Date('04/30/2024'),
            to: new Date('04/30/2024'),
            label: 'Release Holiday'
        },
    ];
    labelSettings = {
        leftLabel: 'TaskName'
    };
    toolbarClick(args) {
        if (args.item.id === "GanttExport_excelexport") {
            this.ganttInstance.excelExport();
        }
        else if (args.item.id === "GanttExport_csvexport") {
            this.ganttInstance.csvExport();
        }
        else if (args.item.id === "GanttExport_pdfexport") {
            var exportProperties = {
                fitToWidthSettings: {
                    isFitToWidth: this.isFitToWidth,
                }
            };
            this.ganttInstance.pdfExport(exportProperties);
        }
    }
    componentDidMount() {
        this.checkHighContrastMode();
    }
    checkHighContrastMode() {
        // Check if body has fluent2-highcontrast, fluent2-dark, or fluent2 class
        const themes = ['fluent2-highcontrast', 'fluent2-dark', 'fluent2'];
        const isHighContrast = themes.some(theme => document.body.classList.contains(theme));
        if (isHighContrast) {
            const labelElement = document.getElementById('exported');
            if (labelElement) {
                labelElement.style.padding = '5px';
            }
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='GanttExport' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} dateFormat={'MMM dd, y'} treeColumnIndex={1} allowExcelExport={true} allowPdfExport={true} allowSelection={true} showColumnMenu={false} highlightWeekends={true} allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} splitterSettings={this.splitterSettings} taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} toolbarClick={this.toolbarClick.bind(this)} height='410px' gridLines={this.gridLines} holidays={this.holidays} eventMarkers={this.eventMarkers} toolbar={this.toolbar} resourceFields={this.resourceFields} resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Toolbar, ExcelExport, PdfExport, DayMarkers]}/>
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates client-side exporting of the Gantt, which allows you to export Gantt data to Excel, PDF and CSV formats. Using the Gantt toolbar buttons, you can export Gantt data to the desired format. </p>
        </div>
        <div id="description">
        <p>Gantt supports client-side exporting, which allows you to export its data to the Excel, PDF and CSV formats. </p>
          <p>In this demo, we have defined actions in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#toolbarclick">toolbarClick</a> event to export the Gantt data using the
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">excelExport</a>,
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">pdfExport</a>
            and
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#csvexport">csvExport</a> methods.</p>
        
          <p>Injecting Module:</p>
          <p>To use Excel and CSV export features, we need to inject
              <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#excelexport">
              excelExport
              </a></code> module into the <code>services</code>. </p>
          <p>To use PDF export feature, we need to inject
              <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#pdfexport">
              pdfExport
              </a></code> module into the <code>services</code>. </p>
        </div>
      </div>);
    }
}
