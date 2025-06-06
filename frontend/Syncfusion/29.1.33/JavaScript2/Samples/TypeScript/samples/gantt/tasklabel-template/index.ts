import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Gantt, DayMarkers, Selection } from '@syncfusion/ej2-gantt';
import { labelData, editingResources } from './data-source';

/**
 * Tasklabel Template Gantt sample
 */
Gantt.Inject(DayMarkers, Selection);
(<{ getResourceElements?: Function }>window).getResourceElements = (value: any) => {
    let out: string = '';
    let img: HTMLImageElement = document.createElement('img');
    img.height = 40;
    let span: HTMLElement = document.createElement('span');
    span.style.marginLeft = '5px';
    span.style.marginRight = '5px';
    for (let index: number = 0; index < value.length; index++) {
        img.src = 'https://ej2.syncfusion.com/demos/src/gantt/images/' + value[index].resourceName + '.png';
        img.alt = value[index].resourceName;
        span.innerHTML = value[index].resourceName;
        out = out + img.outerHTML + span.outerHTML;
    }
    return out;
};

    
    let gantt: Gantt = new Gantt(
        {
            dataSource: labelData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
            rowHeight: 46,
            treeColumnIndex: 1,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                resourceInfo: 'resources',
                child: 'subtasks'
            },
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
                { field: 'resources' },
            ],
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
            resources: editingResources,
            labelSettings: {
                leftLabel: '#leftLabel',
                rightLabel: '#rightLabel',
                taskLabel: '${Progress}%'
            },
            splitterSettings: {
                position: "35%"
            },
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('05/04/2024')
        });
    gantt.appendTo('#TasklabelTemplate');

