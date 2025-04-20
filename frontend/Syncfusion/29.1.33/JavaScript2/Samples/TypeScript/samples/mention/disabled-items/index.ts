import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);


/**
 * Mention Disabled Item sample
 */
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';


    
    // Initialize Mention component.
    let mentionObj: Mention = new Mention({
        dataSource: (data as any).emailData2,
        fields: { text: 'Name', disabled: 'State' },
        itemTemplate: '<div class="listItems"><img class="mentionEmpImage" src="//npmci.syncfusion.com/development/demos/src/mention/Employees/${Eimg}.png" alt="employee"/><span class="person">${Name}</span><span class="email">${EmailId}</span></div>',
        noRecordsTemplate: 'No item related to the search',
        displayTemplate: '${Name}',
        popupWidth: '250px',
        popupHeight: '200px'
    });
    mentionObj.appendTo('#disabledMention');
