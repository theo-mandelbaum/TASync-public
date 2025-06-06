import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Schedule, Day, Week, WorkWeek, Month, View, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule views sample
 */


    
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).zooEventsData, null, true);
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        selectedDate: new Date(2021, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    // custom code start
    // Initialize DropDownList component for views
    let dropDownListObject: DropDownList = new DropDownList({
        placeholder: 'Current View',
        floatLabelType: "Always",
        change: (args: ChangeEventArgs) => {
            scheduleObj.currentView = <View>args.value;
            scheduleObj.dataBind();
        }
    });
    dropDownListObject.appendTo('#scheduleview');
    // custom code end

