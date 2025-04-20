import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DateTimePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled DateTimePicker sample
 */


    
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        renderDayCell: disableDate
    });
    dateTimeInstance.appendTo('#datetimepicker');
    function disableDate(args: RenderDayCellEventArgs): void {
        /*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }

