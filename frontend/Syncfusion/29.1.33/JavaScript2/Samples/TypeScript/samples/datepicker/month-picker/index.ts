import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * DatePicker Month Picker sample
 */

    
    let datepicker: DatePicker = new DatePicker({ placeholder: "Choose a date", start: 'Year', depth: 'Year', format: 'MMMM y' });
    datepicker.appendTo('#datepicker');
