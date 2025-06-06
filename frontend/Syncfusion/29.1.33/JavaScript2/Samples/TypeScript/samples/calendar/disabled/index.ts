import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Calendar, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled Calendar sample
 */


    
    let calendar: Calendar = new Calendar({
        renderDayCell: disableDate, change: valueChange
    });
    calendar.appendTo('#calendar');
    function disableDate(args: RenderDayCellEventArgs): void {
        /*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
    function valueChange(args: ChangedEventArgs): void {
        /*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }

