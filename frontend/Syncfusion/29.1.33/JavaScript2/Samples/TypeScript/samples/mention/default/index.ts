import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);


/**
 * Mention default sample
 */
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';
import { InputObject, TextBox } from  '@syncfusion/ej2-inputs';


    

    // Initialize Mention component.
    let messgaeData: Mention = new Mention({
        dataSource: (data as any).emailData,
        fields: { text: 'Name' }
    });
    messgaeData.appendTo('#commentsMention');
