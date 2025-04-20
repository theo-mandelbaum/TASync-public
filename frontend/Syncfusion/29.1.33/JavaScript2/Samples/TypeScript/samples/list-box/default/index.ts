import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * ListBox default sample
 */
import { ListBox } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';


    

    // Initialize ListBox component.
    let listObj: ListBox = new ListBox({
        // Set the data source property.
        dataSource: (data as any).info
    });
    listObj.appendTo('#listbox');
