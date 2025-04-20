import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DatePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled DatePicker sample
 */


    
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
        renderDayCell: disableDate
    });
    datepicker.appendTo('#datepicker');
    function disableDate(args: RenderDayCellEventArgs): void {
        /*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }

