import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Schedule, Day, Week, Month, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';

Schedule.Inject(Day, Week, Month, Resize, DragAndDrop);

/**
 * Schedule Recurrence events sample
 */


    
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).recurrenceData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 1, 20),
        views: ['Day', 'Week', 'Month'],
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
    let checkBoxObj: CheckBox = new CheckBox({
        label: 'Enable Following Events',
        checked: false,
        change: (args: ChangeEventArgs) => {
            scheduleObj.eventSettings.editFollowingEvents = args.checked;
        }
    });
    checkBoxObj.appendTo('#editFollowingEvents');

