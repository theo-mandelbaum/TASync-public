import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Schedule, MonthAgenda } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(MonthAgenda);

/**
 * Schedule month agenda sample
 */


    
    let data: Record<string, any>[] = <Record<string, any>[]>extend([], (dataSource as Record<string, any>).fifaEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '510px',
        views: ['MonthAgenda'],
        selectedDate: new Date(2021, 5, 20),
        eventSettings: { dataSource: data }
    });
    scheduleObj.appendTo('#Schedule');

