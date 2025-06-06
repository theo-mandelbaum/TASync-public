import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

/**
 * Remote data Gantt sample
 */
Gantt.Inject(Selection, DayMarkers);

    
    let dataSource: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/GanttData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });

    let gantt: Gantt = new Gantt(
        {
            dataSource: dataSource,
            height: '450px',
            taskFields: {
                id: 'TaskId',
                name: 'TaskName',
                startDate: 'StartDate',
                progress: 'Progress',
                duration: 'Duration',
                dependency: 'Predecessor',
                child: 'SubTasks'
            },
            columns: [
                { field: 'TaskId', visible: false },
                { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate' },
                { field: 'Duration' },
            ],
            treeColumnIndex: 1,
            allowSelection: true,
            gridLines: 'Both',
            highlightWeekends: true,
            timelineSettings: {
                timelineUnitSize: 50,
                topTier: {
                    unit: 'Month',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                    formatter: (date: Date) => {
                        let month: number = date.getMonth();
                        if (month === 1) {
                            return '';
                        } else {
                            let presentDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                            let start: Date = new Date(presentDate.getFullYear(), 0, 0);
                            let diff: number = Number(presentDate) - Number(start);
                            let oneDay: number = 1000 * 60 * 60 * 24;
                            let day: number = Math.floor(diff / oneDay);
                            return 'day ' + (day - 59);
                        }
                    },
                },
            },
            labelSettings: {
                leftLabel: 'TaskName',
            },
            includeWeekend: true,
            projectStartDate: new Date('02/24/2021'),
            projectEndDate: new Date('06/10/2021')
        });
    gantt.appendTo('#RemoteData');

