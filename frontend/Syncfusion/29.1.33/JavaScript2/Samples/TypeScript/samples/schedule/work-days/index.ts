import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import {
    Schedule, Week, WorkWeek, Month, TimelineViews, TimelineMonth,
    EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop);

/**
 * Schedule Work days sample
 */


    
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).employeeEventData, null, true);
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        workDays: [1, 3, 5],
        currentView: 'WorkWeek',
        workHours: {
            start: '08:00'
        },
        views: ['Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineMonth'],
        selectedDate: new Date(2021, 1, 14),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    // custom code start
    // Initialize DropDownList component for work days
    let workDaysDropDown: DropDownList = new DropDownList({
        popupWidth: 180,
        placeholder: "Work days",
        floatLabelType: "Always",
        change: (args: ChangeEventArgs) => {
            scheduleObj.workDays = args.value.toString().split(',').map(Number);
            scheduleObj.dataBind();
        }
    });
    workDaysDropDown.appendTo('#scheduleworkdays');

    // Initialize DropDownList component for first day of week
    let dayOfWeekDropDown: DropDownList = new DropDownList({
        placeholder: "First day of week",
        floatLabelType: "Always",
        change: (args: ChangeEventArgs) => {
            scheduleObj.firstDayOfWeek = parseInt(<string>args.value, 10);
            scheduleObj.dataBind();
        }
    });
    dayOfWeekDropDown.appendTo('#scheduledayofweek');
    // custom code end

