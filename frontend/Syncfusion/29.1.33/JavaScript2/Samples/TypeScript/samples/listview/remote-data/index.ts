import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * ListView Remote Sample
 */
import {ListView} from '@syncfusion/ej2-lists';

//Import DataManager related classes
import {DataManager, Query } from '@syncfusion/ej2-data';


    

    //Initialize ListView component
    let remoteListObj: ListView = new ListView({

        //Initialize dataSource with the DataManager instance.
        dataSource: new DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/',
            crossDomain: true
        }),

        //Initialize query with the Query instance to get specified set of data
        query: new Query().from('ListView').select('EmployeeID,FirstName').take(10),

        //Map the appropriate columns to fields property
        fields: { id: 'EmployeeID', text: 'FirstName' },

        //Set header title
        headerTitle: 'Employees',

        //Set true to show header title
        showHeader: true

    });

    //Render initialized ListView component
    remoteListObj.appendTo('#listview');
