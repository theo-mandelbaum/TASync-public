import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DatePicker sample
 */


    
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
    });
    datepicker.appendTo('#datepicker');
