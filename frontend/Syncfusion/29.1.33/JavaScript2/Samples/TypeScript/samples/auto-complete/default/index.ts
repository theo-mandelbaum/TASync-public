import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * AutoComplete Default functionality Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';


    
    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: (data as any).sportsData,
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Basketball'
    });
    atcObj.appendTo('#games');
