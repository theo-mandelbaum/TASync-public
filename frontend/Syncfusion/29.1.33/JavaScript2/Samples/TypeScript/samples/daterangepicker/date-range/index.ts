import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Min/Max range Sample
 */

    
    let daterangepicker: DateRangePicker = new DateRangePicker({
        placeholder: "Select a range",
        min: new Date('1/15/2017'),
        max: new Date('12/20/2017')
    });
    daterangepicker.appendTo('#daterangepicker');
