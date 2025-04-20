import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Calendar, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { Internationalization } from '@syncfusion/ej2-base';
/**
 * Calendar Month Picker sample
 */


    
    let calendar: Calendar = new Calendar({ start: 'Year', depth: 'Year', change: valueChange });
    calendar.appendTo('#calendar');
    let intl: Internationalization = new Internationalization();
    function valueChange(args: ChangedEventArgs): void {
        let value: string = intl.formatDate(args.value, { type: 'dateTime', format: 'MMMM y' });
        /*Displays selected date in the label*/
        (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + value;
    }

