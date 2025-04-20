import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * ListBox dual list box sample.
 */
import { ListBox } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';


    

    // Initialize ListBox component.
    let listObj1: ListBox = new ListBox({
        // Set the groupa data to the data source.
        dataSource: (data as any).groupa,

        // Map the appropriate columns to fields property.
        fields: { text: 'Name'},

        height: '330px',

        // Set the scope of the ListBox.
        scope: '#listbox2',

        // Set the tool settings with set of items.
        toolbarSettings: { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']},
        // set the no record template
        noRecordsTemplate: '<div class= "e-list-nrt"><span>NO DATA AVAILABLE</span></div>'
    });

    listObj1.appendTo('#listbox1');

    // Initialize ListBox component.
    let listObj2: ListBox = new ListBox({
        // Set the groupa data to the data source.
        dataSource: (data as any).groupb,

        height: '330px',

        // Set field property with text as `Name`.
        fields: { text: 'Name'},
        // set the no record template
        noRecordsTemplate: '<div class= "e-list-nrt"><span>NO DATA AVAILABLE</span></div>'
    });

    listObj2.appendTo('#listbox2');
