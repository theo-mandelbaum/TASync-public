import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * ListView Default Sample
 */
import {ListView} from '@syncfusion/ej2-lists';
import{flatData, groupData} from './datasource';

    
    //Initialize ListView component
    let listObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: flatData

    });

    //Render initialized ListView component
    listObj.appendTo('#listview-def');

    //Initialize ListView component
    let grpListObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: groupData,

        //Map the appropriate columns to fields property
        fields: { groupBy: 'category' }
    });

    //Render initialized ListView component
    grpListObj.appendTo('#listview-grp');
