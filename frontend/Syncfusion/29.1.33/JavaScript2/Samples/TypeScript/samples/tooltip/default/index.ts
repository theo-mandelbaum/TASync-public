import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Tooltip default sample
 */

import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';


    

    //Initialize Button component
    let button: Button = new Button();
    var isMobile = window.matchMedia('(max-width:550px)').matches;
    //Render initialized Button component
    button.appendTo('#Tooltip');

    //Initialize Tooltip component
    let tooltip: Tooltip = new Tooltip({

        //Set tooltip content
        content: "Let's go green to save the planet!!",
        width: isMobile ? 110 : 'auto'

    });

    //Render initialized Tooltip component
    tooltip.appendTo('#Tooltip');

    //Handle tooltip position based on drop-down value change
    document.querySelector('#positions').addEventListener('change', function (): void {
        tooltip.position = this.value;
    });

