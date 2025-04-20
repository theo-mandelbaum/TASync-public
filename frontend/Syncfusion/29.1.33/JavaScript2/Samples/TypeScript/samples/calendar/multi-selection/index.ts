import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Calendar } from '@syncfusion/ej2-calendars';
/**
 * Calendar MultiSelection sample
 */
let currentYear: number = new Date().getFullYear();
let currentMonth: number = new Date().getMonth();

    
    let calendar: Calendar = new Calendar({
        isMultiSelection: true,
        change: changeValue,
        values: [new Date(currentYear, currentMonth, 10), new Date(currentYear, currentMonth, 15), new Date(currentYear, currentMonth, 25)],
        created: changeValue
    });
    calendar.appendTo('#calendar');
    function changeValue(): void {
        let element: HTMLElement = document.getElementById('multiselect');
        element.innerHTML = '';
        for (let index: number = 0; index < this.values.length; index++) {
            element.insertBefore(document.createTextNode(this.values[index]), element.childNodes[0]);
            element.insertBefore(document.createElement('br'), element.childNodes[0]);
        }
    }

