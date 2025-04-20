import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Dropdown Tree MultiSelection Samples
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';


    
    let dropDownTreeObj: DropDownTree = new DropDownTree({
      fields: {dataSource: (dataSource as any).multiSelectData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild', },
      allowMultiSelection: true,
      placeholder: 'Select items',
      popupHeight: '200px',
    });
    dropDownTreeObj.appendTo('#multiselection');
