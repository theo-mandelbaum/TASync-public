import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * DropDownList Filtering Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';


    
    // initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // set the placeholder to DropDownList input element
        placeholder: 'Select a country',
        // set true for enable the resize property to drop down list
        allowResize: true,
        //set the local data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the height of the popup element
        popupHeight: '250px',
    });
    dropDownListObj.appendTo('#country');

