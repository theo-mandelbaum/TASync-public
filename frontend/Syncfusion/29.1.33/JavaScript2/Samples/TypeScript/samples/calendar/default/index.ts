import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Calendar, ChangedEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Default Calendar sample
 */


    
    let calendar: Calendar = new Calendar({
        change: valueChange
    });
    calendar.appendTo('#calendar');
    function valueChange(args: ChangedEventArgs): void {
        /*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }

