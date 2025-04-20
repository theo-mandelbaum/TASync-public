import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Month Picker sample
 */

    
    let daterangepicker: DateRangePicker = new DateRangePicker({ placeholder: "Select a range", start: 'Year', depth: 'Year', format: 'MMM yyyy' });
    daterangepicker.appendTo('#daterangepicker');
