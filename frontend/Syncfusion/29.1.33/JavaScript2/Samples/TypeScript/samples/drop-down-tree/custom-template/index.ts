import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Dropdown Tree custom value template Samples
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';


    
    let checkList: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).checkboxData, value: 'id', parentValue: 'pid', text: 'name',
        hasChildren: 'hasChild', expanded: 'expanded' },
        placeholder: 'Select items',
        popupHeight: '200px',
        mode: 'Custom',
        customTemplate: "${value.length} item(s) selected",
        showCheckBox: true,
        treeSettings: { autoCheck: true }
    });
    checkList.appendTo('#checkbox');
