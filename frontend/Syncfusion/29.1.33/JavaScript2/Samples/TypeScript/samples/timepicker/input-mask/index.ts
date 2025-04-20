import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { TimePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';

/**
 * Default sample
 */
 TimePicker.Inject(MaskedDateTime);

    

    let timeObj: TimePicker = new TimePicker({
        placeholder: "Select a time",
        format: "h:mm a",
        enableMask: true
    });
    timeObj.appendTo('#timepicker');
