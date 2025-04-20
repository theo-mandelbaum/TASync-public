import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * Dropdown Tree Checkbox Samples
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as dataSource from './dataSource.json';


    
    let checkList: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).checkboxData, value: 'id', parentValue: 'pid', text: 'name',
        hasChildren: 'hasChild', expanded: 'expanded' },
        placeholder: 'Select items',
        popupHeight: '200px',
        mode: 'Delimiter',
        showCheckBox: true,

    });
    checkList.appendTo('#checkbox');
    let checkObj: CheckBox = new CheckBox({
        label: 'Auto Check',
        change: (args: ChangeEventArgs) => {
            checkList.treeSettings.autoCheck = args.checked;
        }
    });
    checkObj.appendTo('#check');
