import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Gantt, Selection, DayMarkers  } from '@syncfusion/ej2-gantt';
import { selfData } from './data-source';

/**
 * Self reference Gantt sample
 */

Gantt.Inject(Selection, DayMarkers );

    
    let gantt: Gantt = new Gantt(
        {
            dataSource: selfData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
            treeColumnIndex: 1,
            taskFields: {
                id: 'taskID',
                name: 'taskName',
                startDate: 'startDate',
                endDate: 'endDate',
                duration: 'duration',
                progress: 'progress',
                dependency: 'predecessor',
                parentID: 'parentID'
            },
            columns: [
                { field: 'taskID', width: 80 },
                { field: 'taskName', width: 250 },
                { field: 'startDate' },
                { field: 'endDate' },
                { field: 'duration' },
                { field: 'predecessor' },
                { field: 'progress' },
            ],
            labelSettings: {
                leftLabel: 'taskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('01/28/2024'),
            projectEndDate: new Date('03/10/2024')
        });
    gantt.appendTo('#SelfData');

