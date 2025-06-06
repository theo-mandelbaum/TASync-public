import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Gantt, Edit, Toolbar, Selection } from '@syncfusion/ej2-gantt';
import { unscheduledData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

/**
 * Editing Gantt sample
 */
Gantt.Inject(Edit, Toolbar, Selection);

    
    let gantt: Gantt = new Gantt(
        {
            dataSource: unscheduledData,
            taskFields: {
                id: 'TaskId',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true
            },
            columns: [
                {field: 'TaskId', width: 90 },
                {field: 'TaskName', width: 80 },
                {field: 'StartDate', width: 120},
                {field: 'EndDate', width: 120 },
                {field: 'Duration', width: 90 }
            ],
            splitterSettings: {
                columnIndex: 4
            },
            toolbar: [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }],
            height: '450px',
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'TaskType'
            },
            allowUnscheduledTasks: true,
            allowSelection: true,
            projectStartDate: new Date('01/01/2024'),
            projectEndDate: new Date('01/20/2024'),
            toolbarClick: (args: ClickEventArgs) => {
                let data: object = {
                     Duration: null,
                       StartDate: null,
                       EndDate: null,
                       TaskType: ''
                };
                gantt.addRecord(data);
            }
        });
    gantt.appendTo('#Unscheduled');


