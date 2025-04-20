import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import * as dataSource from './dataSource.json';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
/**
 * DropDownTree local data sample
 */

    
    // Render the DropDownTree with hierarchical data source
    let ddTreeObj: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).hierarchicalData, value: 'code', text: 'name', child: 'countries' },
        placeholder: 'Select an item',
        popupHeight: '200px'
    });
    ddTreeObj.appendTo('#ddtlocal');
    // Render the DropDownTree with self-referential data source
    let ddListTreeObj: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).localData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' },
        placeholder: 'Select an item',
        popupHeight: '200px'
    });
    ddListTreeObj.appendTo('#ddtlist');
