import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DateTimePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';
/**
 * Default DateTimePicker sample
 */
 DateTimePicker.Inject(MaskedDateTime);

    
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        format: "M/d/yyyy hh:mm a",
        enableMask: true
    });
    dateTimeInstance.appendTo('#datetimepicker');
