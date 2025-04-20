import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';


    

// initialize DropDownList component
let defaultObject: DropDownList = new DropDownList({
    //set the local data to dataSource property
    dataSource: (data as any).status,
    // set placeholder to DropDownList input element
    placeholder: "Select Status",
    // set true for enable the filtering support.
    allowFiltering: true,
    // map the appropriate columns to fields property
    fields: { value: 'ID', text: 'Text', disabled: 'State' },
});

// render initialized DropDownList
defaultObject.appendTo('#default');

// initialize DropDownList component
let groupingObject: DropDownList = new DropDownList({
    //set the local data to dataSource property
    dataSource: (data as any).groupingData,
    // set placeholder to DropDownList input element
    placeholder: "Select Vegetable",
    // map the appropriate columns to fields property
    fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id', disabled: 'State' },
});

// render initialized DropDownList
groupingObject.appendTo('#grouping');

