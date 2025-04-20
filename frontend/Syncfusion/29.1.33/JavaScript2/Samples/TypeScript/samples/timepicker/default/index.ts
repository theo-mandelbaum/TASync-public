import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TimePicker } from '@syncfusion/ej2-calendars';

/**
 * Default sample
 */


    

    let timeObj: TimePicker = new TimePicker({
        placeholder: "Select a time",
    });
    timeObj.appendTo('#timepicker');
