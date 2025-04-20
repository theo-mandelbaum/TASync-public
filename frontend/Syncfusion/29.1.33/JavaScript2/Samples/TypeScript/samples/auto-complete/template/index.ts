import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * AutoComplete Template Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';


    
    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        // set the local data to dataSource property
        dataSource: (data as any).empList,
        // map the appropriate columns to fields property
        fields: { value: 'Name' },
        // set the template content for popup header element
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span class="info">Employee Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div><img class="empImage" src="//npmci.syncfusion.com/development/demos/src/auto-complete/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>',
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Andrew Fuller',
        // set the height of the popup element
        popupHeight: '450px'
    });
    atcObj.appendTo('#employees');
