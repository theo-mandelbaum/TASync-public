import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TimePicker } from '@syncfusion/ej2-calendars';

/**
 * Format sample
 */


    

    let timeObj: TimePicker = new TimePicker({
        placeholder: "Select a time",
        value: new Date(),
        step: 60,
        format: 'HH:mm'
    });
    timeObj.appendTo('#timepicker');
