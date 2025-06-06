import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * AutoComplete Custom Filtering Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import * as booksData from './dataSource.json';

    
    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        //set the data to dataSource property
        dataSource: (booksData as any).booksData ,
        // set true for enable the resize property to AutoComplete
        allowResize: true,
        // maps the appropriate column to fields property
        fields: { value: 'BookName' },
        // set placeholder to AutoComplete input element
        placeholder: 'e.g. Node.js Succinctly',
    });
    atcObj.appendTo('#books');

