import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Rating } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';




let basic: Rating = new Rating({});
basic.appendTo('#rating1');

let reset: Rating = new Rating({
    allowReset: true,
    value: 3.0
});
reset.appendTo('#rating2');

let single: Rating = new Rating({
    enableSingleSelection: true,
    value: 3.0
});
single.appendTo('#rating3');

let read: Rating = new Rating({
    readOnly: true,
    value: 3.0
});
read.appendTo('#rating4');

let disable: Rating = new Rating({
    disabled: true,
    value: 3.0
});
disable.appendTo('#rating5');

let itemCount: Rating = new Rating({
    itemsCount: 8,
    value: 3.0
});
itemCount.appendTo('#rating6');

if (document.getElementById('right-pane')) {
    document.getElementById('right-pane')?.addEventListener('scroll', hideTooltipOnScroll);
}

function hideTooltipOnScroll(): void {
    const tooltipElement: HTMLElement | null = document.querySelector('.e-rating-tooltip');
    if (tooltipElement && Browser.isDevice) {
        tooltipElement.style.display = 'none';
    }
}

