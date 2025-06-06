import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Default Gantt sample
 */

Gantt.Inject(Selection, DayMarkers);

    
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            treeColumnIndex: 1,
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName',headerText: 'Name', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            eventMarkers: [
                {
                    day: new Date('04/02/2024'),
                }, {
                    day: new Date('04/09/2024'),
                    label: 'Research phase'
                }, {
                    day: new Date('04/30/2024'),
                    label: 'Design phase'
                }, {
                    day: new Date('05/23/2024'),
                    label: 'Production phase'
                }, {
                    day: new Date('06/20/2024'),
                    label: 'Sales and marketing phase'
                }
            ],
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#EventMarkers');

