import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Gantt, Selection } from '@syncfusion/ej2-gantt';
import { templateData } from './data-source';

/**
 *  Header template Gantt sample
 */
Gantt.Inject(Selection);

    
    let projectResources: Object[] = [
        { resourceId: 1, resourceName: 'Martin Tamer' },
        { resourceId: 2, resourceName: 'Rose Fuller' },
        { resourceId: 3, resourceName: 'Margaret Buchanan' },
        { resourceId: 4, resourceName: 'Fuller King' },
        { resourceId: 5, resourceName: 'Davolio Fuller' },
        { resourceId: 6, resourceName: 'Van Jack' },
        { resourceId: 7, resourceName: 'Fuller Buchanan' },
    ];
    let gantt: Gantt = new Gantt(
        {
            dataSource: templateData,
            height: '450px',
            highlightWeekends: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                resourceInfo: 'resources',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            columns: [
                { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
                { field: 'StartDate', headerTemplate: '#dateTemplate' },
                { field: 'resources', headerTemplate: '#resource', width: 150 },
                { field: 'Duration', headerTemplate: '#durationTemplate' },
                { field: 'Progress', headerTemplate: '#progressTemplate' }
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 4
            },
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
            resources: projectResources,
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#HeaderTemplate');

