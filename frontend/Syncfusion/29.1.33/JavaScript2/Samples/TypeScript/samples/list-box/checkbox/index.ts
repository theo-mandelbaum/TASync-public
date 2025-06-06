import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * ListBox Checkbox sample
 */
import { ListBox, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';

ListBox.Inject(CheckBoxSelection);


    

    // Initialize the ListBox component.
    let listObj: ListBox = new ListBox({
        // Set the info to the dataSource property.
        dataSource: (data as any).info,

        // Set the selection settings with showCheckbox as enabled.
        selectionSettings: { showCheckbox: true }
    });
    listObj.appendTo('#multi-select-listbox');

