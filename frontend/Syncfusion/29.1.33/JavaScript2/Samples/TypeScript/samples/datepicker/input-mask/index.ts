import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DatePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';
/**
 * Default DatePicker sample
 */
 DatePicker.Inject(MaskedDateTime);

    
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
        format: "M/d/yyyy",
        enableMask: true
    });
    datepicker.appendTo('#datepicker');
