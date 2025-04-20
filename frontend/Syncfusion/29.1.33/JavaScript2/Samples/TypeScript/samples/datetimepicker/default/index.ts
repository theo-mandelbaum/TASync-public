import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DateTimePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DateTimePicker sample
 */


    
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
    });
    dateTimeInstance.appendTo('#datetimepicker');
