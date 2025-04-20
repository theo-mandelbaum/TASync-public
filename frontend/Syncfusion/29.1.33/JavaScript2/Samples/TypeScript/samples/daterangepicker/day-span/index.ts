import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Min/Max Days Sample
 */

    
    let daterangepicker: DateRangePicker = new DateRangePicker({ placeholder: "Select a range", minDays: 5, maxDays: 10});
    daterangepicker.appendTo('#daterangepicker');
