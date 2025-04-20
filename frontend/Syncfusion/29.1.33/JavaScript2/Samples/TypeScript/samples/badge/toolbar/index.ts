import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 *  Sample for CSS tab intergration
 */
import { Toolbar } from '@syncfusion/ej2-navigations';


    
    let toolbarObj: Toolbar = new Toolbar();
    //Render initialized Toolbar component
    toolbarObj.appendTo('#toolbar');
