import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * ListView Nested Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import { nestedListData } from './datasource';

    
    //Initialize ListView component
    let nestedListObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: nestedListData,

        //Map appropriate columns to fields property
        fields: { iconCss: 'icon', tooltip: 'text' },

        //Set true to show icons
        showIcon: true,

        //Set header title
        headerTitle: 'Folders',

        //Set true to show header title
        showHeader: true,

        animation: { duration:0 }
    });

    //Render initialized ListView component
    nestedListObj.appendTo('#listview');

